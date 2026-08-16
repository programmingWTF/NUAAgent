/**
 * Mobile-surface live-event client: the plugin's `/m/api/events.mux` SSE
 * channel (Server-Sent Events — the host bridges the mux stream onto it, so
 * no WebSocket handshake or framing is needed on this side). The host
 * pushes mux frames (subscribed baselines, session events, approvals,
 * questions, queue snapshots, tasks, projections) as soon as the stream
 * opens — no subscription handshake is needed. Frames arrive as
 * server-request envelopes whose payload is the mux frame; unknown frame
 * types are dropped so a newer host never breaks this client.
 *
 * EventSource reconnects automatically — but only over a tunnel that
 * actually forwards frames. Public quick tunnels (Cloudflare quick tunnel /
 * Tailscale Serve) do not transparently pass Server-Sent Events: ordinary
 * HTTP works, yet the SSE connection stays open or reconnects with zero
 * bytes, so no live frame ever arrives. That is a transport-layer limit of
 * the tunnel, not something the host can fix. This client therefore
 * degrades gracefully: once the SSE channel has silently stalled (no frame
 * for {@link MuxClientOptions.stallThresholdMs}, or the EventSource reports
 * an error), it starts polling the open session's history over plain HTTP
 * (the `/m/api/session.history` RPC — unaffected by the SSE limitation),
 * and re-emits freshly appended events as `session/event` frames through
 * the same subscriber contract, so listeners (and the message fold) behave
 * exactly as if the frames had arrived over SSE. When the SSE channel
 * delivers again, fallback polling stops and the live stream takes over.
 */
import { muxFrameSchema } from '@nuaagent/host-apiproxy/api/events.schema';
import { serverRequestSchema } from '@nuaagent/host-apiproxy/api/rpc.schema';
import { history as fetchHistory } from "./api.js";
/** Browser default source factory. */
function browserSource(url) {
    // The DOM EventSource is structurally compatible; the `this`-typed handler
    // signatures differ, so the narrow face takes it through an adapter cast.
    return new EventSource(url);
}
const DEFAULT_POLL_INTERVAL_MS = 3000;
const DEFAULT_STALL_THRESHOLD_MS = 12000;
/**
 * Stall-check granularity: the single scheduler tick runs at least this
 * often so fallback arms within a second of the stall threshold passing,
 * while the poll cadence itself stays {@link MuxClientOptions.pollIntervalMs}.
 */
const STALL_CHECK_MS = 1000;
/** Poll window: enough recent events to cover a few seconds of agent output. */
const DEFAULT_POLL_PAGE_SIZE = 50;
/**
 * Keep one SSE subscription open, fanning validated frames out to
 * subscribers. EventSource owns reconnection (with its own backoff); this
 * class only manages the subscription lifecycle, plus a polling fallback
 * that keeps the open session live when the SSE channel cannot deliver.
 */
export class MuxClient {
    sourceFactory;
    pollLatest;
    pollIntervalMs;
    stallThresholdMs;
    now;
    listeners = new Set();
    source;
    stopped = false;
    url;
    /** The session to keep live via fallback polling (undefined = none). */
    observeSessionId;
    /** Last epoch ms the SSE channel produced a frame (or the stream opened). */
    lastDataAt = 0;
    /**
     * Whether the SSE channel has ever delivered a frame in this stream (a
     * delivered frame proves the tunnel forwards SSE; silence alone then means
     * the agent idle, not a dead channel — only an onerror re-arms fallback).
     */
    sseAlive = false;
    /** Per-session highest event seq already emitted, for poll dedup. */
    pollWatermark = new Map();
    /** Single scheduler tick: both the stall check and the poll cadence ride this one interval. */
    tickTimer;
    polling = false;
    /** Epoch ms of the next due poll while polling (kept on the same tick timer). */
    nextPollAt = 0;
    /**
     * @param url - the mobile events endpoint (browser-relative).
     * @param options - seams.
     */
    constructor(url = '/m/api/events.mux', options = {}) {
        this.url = url;
        this.sourceFactory = options.sourceFactory ?? browserSource;
        this.pollLatest = options.pollLatest ?? ((sessionId) => fetchHistory(sessionId, undefined, DEFAULT_POLL_PAGE_SIZE));
        this.pollIntervalMs = options.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
        this.stallThresholdMs = options.stallThresholdMs ?? DEFAULT_STALL_THRESHOLD_MS;
        this.now = options.now ?? (() => Date.now());
    }
    /** Open the stream (idempotent; EventSource reconnects until {@link stop}). */
    start() {
        this.stopped = false;
        this.lastDataAt = this.now();
        if (this.source === undefined)
            this.connect();
        this.startTick();
    }
    /** Close for good. */
    stop() {
        this.stopped = true;
        this.stopTick();
        this.stopPolling();
        this.closeSource();
        this.observeSessionId = undefined;
        this.nextPollAt = 0;
    }
    /** Subscribe to validated frames; returns an unsubscribe function. */
    onFrame(listener) {
        this.listeners.add(listener);
        return () => { this.listeners.delete(listener); };
    }
    /**
     * Point the fallback at one open session (or `undefined` to stop it).
     * While the SSE channel is stalled this client polls that session's
     * history and re-emits new events as `session/event` frames.
     */
    observe(sessionId) {
        this.observeSessionId = sessionId;
        if (sessionId === undefined) {
            this.stopPolling();
            return;
        }
        // If SSE is already stalled for this session, start patching right away.
        if (!this.polling && !this.stopped && !this.sseAlive && (this.now() - this.lastDataAt) > this.stallThresholdMs) {
            this.startPolling();
        }
    }
    connect() {
        // A fresh stream starts unknown; only a delivered frame proves it works.
        this.sseAlive = false;
        const source = this.sourceFactory(this.url);
        this.source = source;
        source.onmessage = (event) => {
            this.handleMessage(event.data);
        };
        source.onerror = () => {
            // EventSource reconnects by itself; when we are closing, detach first
            // so the native reconnect cannot outlive stop(). Otherwise an error is
            // a strong signal the transport is not delivering — degrade to polling.
            if (this.stopped && this.source === source) {
                this.closeSource();
                return;
            }
            this.sseAlive = false;
            if (this.observeSessionId !== undefined)
                this.startPolling();
        };
    }
    /**
     * The single scheduler tick is the only interval this client owns. One
     * timer (at the finer of the stall-check and poll cadences) both arms the
     * polling fallback once the stall threshold passes and drives each poll at
     * {@link MuxClientOptions.pollIntervalMs} — one timer instead of two.
     */
    startTick() {
        if (this.tickTimer !== undefined)
            return;
        const cadence = Math.min(this.pollIntervalMs, STALL_CHECK_MS);
        this.tickTimer = setInterval(() => { this.tick(); }, cadence);
    }
    stopTick() {
        if (this.tickTimer !== undefined) {
            clearInterval(this.tickTimer);
            this.tickTimer = undefined;
        }
    }
    tick() {
        if (this.stopped)
            return;
        if (this.observeSessionId === undefined)
            return;
        if (this.polling) {
            // The stall phase has ended; the same tick now paces the polls.
            if (this.now() >= this.nextPollAt) {
                this.nextPollAt = this.now() + this.pollIntervalMs;
                void this.pollTick();
            }
            return;
        }
        // A live SSE channel only goes silent while the agent idles; never poll
        // against it. Fallback arms again only via onerror or a stream that has
        // never delivered.
        if (this.sseAlive)
            return;
        if ((this.now() - this.lastDataAt) > this.stallThresholdMs)
            this.startPolling();
    }
    startPolling() {
        if (this.polling || this.stopped)
            return;
        this.polling = true;
        this.nextPollAt = this.now() + this.pollIntervalMs;
        void this.pollTick();
    }
    stopPolling() {
        this.polling = false;
    }
    /**
     * Fetch the latest history page for the observed session and re-emit any
     * event above the per-session watermark as a `session/event` frame.
     * Idempotent by seq: listeners (and the fold) never see a duplicate.
     */
    async pollTick() {
        const sessionId = this.observeSessionId;
        if (sessionId === undefined) {
            this.stopPolling();
            return;
        }
        try {
            const page = await this.pollLatest(sessionId);
            let maxSeq = this.pollWatermark.get(sessionId) ?? -1;
            for (const entry of page.events) {
                const event = entry.event;
                const seq = typeof event?.seq === 'number' ? event.seq : -1;
                if (seq <= maxSeq)
                    continue;
                maxSeq = seq;
                this.emit({ type: 'session/event', sessionId: sessionId, event });
            }
            this.pollWatermark.set(sessionId, maxSeq);
        }
        catch {
            // Transient (network, pairing, history paging); the next tick retries.
        }
    }
    handleMessage(data) {
        if (typeof data !== 'string' || data === '')
            return;
        let parsed;
        try {
            parsed = JSON.parse(data);
        }
        catch {
            return;
        }
        // The SSE channel carries server-request envelopes whose payload is the
        // mux frame (same wire shape as the desktop mux channel).
        const envelope = serverRequestSchema.safeParse(parsed);
        if (!envelope.success)
            return;
        const frame = muxFrameSchema.safeParse(envelope.data.payload);
        if (!frame.success)
            return;
        // A delivered frame proves the SSE channel is live (the tunnel forwards
        // it) and delivers again — drop any fallback polling so the live stream
        // takes over without double delivery.
        this.sseAlive = true;
        this.lastDataAt = this.now();
        if (this.polling)
            this.stopPolling();
        this.emit(frame.data);
    }
    emit(frame) {
        for (const listener of this.listeners) {
            try {
                listener(frame);
            }
            catch {
                // A throwing subscriber must not break the emit loop.
            }
        }
    }
    closeSource() {
        const source = this.source;
        this.source = undefined;
        if (source !== undefined) {
            source.onmessage = null;
            source.onerror = null;
            try {
                source.close();
            }
            catch {
                // Already closed.
            }
        }
    }
}
