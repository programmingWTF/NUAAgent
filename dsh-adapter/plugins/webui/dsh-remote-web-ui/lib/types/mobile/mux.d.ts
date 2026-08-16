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
import type { MuxFrame } from '@nuaagent/host-apiproxy/api/events';
import { type HistoryPage } from './api.ts';
/** Injectable seams for tests. */
export interface MuxClientOptions {
    /** EventSource factory (defaults to the browser EventSource). */
    sourceFactory?: (url: string) => EventSourceLike;
    /**
     * Fetch one history page (tail) for a session — the polling fallback's
     * data source. Defaults to the mobile `session.history` RPC, which rides
     * the ordinary HTTP channel (unaffected by SSE-impairing tunnels).
     */
    pollLatest?: (sessionId: string) => Promise<HistoryPage>;
    /** Poll cadence while SSE is stalled (default 3000 ms). */
    pollIntervalMs?: number;
    /** How long SSE must go without a frame before fallback kicks in (default 12000 ms). */
    stallThresholdMs?: number;
    /** Clock seam for tests (defaults to Date.now). */
    now?: () => number;
}
/** The EventSource subset this client uses (browser EventSource fits). */
export interface EventSourceLike {
    onmessage: ((event: {
        data: string;
    }) => void) | null;
    onerror: ((event: unknown) => void) | null;
    close(): void;
}
/**
 * Keep one SSE subscription open, fanning validated frames out to
 * subscribers. EventSource owns reconnection (with its own backoff); this
 * class only manages the subscription lifecycle, plus a polling fallback
 * that keeps the open session live when the SSE channel cannot deliver.
 */
export declare class MuxClient {
    private readonly sourceFactory;
    private readonly pollLatest;
    private readonly pollIntervalMs;
    private readonly stallThresholdMs;
    private readonly now;
    private readonly listeners;
    private source;
    private stopped;
    private readonly url;
    /** The session to keep live via fallback polling (undefined = none). */
    private observeSessionId;
    /** Last epoch ms the SSE channel produced a frame (or the stream opened). */
    private lastDataAt;
    /**
     * Whether the SSE channel has ever delivered a frame in this stream (a
     * delivered frame proves the tunnel forwards SSE; silence alone then means
     * the agent idle, not a dead channel — only an onerror re-arms fallback).
     */
    private sseAlive;
    /** Per-session highest event seq already emitted, for poll dedup. */
    private readonly pollWatermark;
    /** Single scheduler tick: both the stall check and the poll cadence ride this one interval. */
    private tickTimer;
    private polling;
    /** Epoch ms of the next due poll while polling (kept on the same tick timer). */
    private nextPollAt;
    /**
     * @param url - the mobile events endpoint (browser-relative).
     * @param options - seams.
     */
    constructor(url?: string, options?: MuxClientOptions);
    /** Open the stream (idempotent; EventSource reconnects until {@link stop}). */
    start(): void;
    /** Close for good. */
    stop(): void;
    /** Subscribe to validated frames; returns an unsubscribe function. */
    onFrame(listener: (frame: MuxFrame) => void): () => void;
    /**
     * Point the fallback at one open session (or `undefined` to stop it).
     * While the SSE channel is stalled this client polls that session's
     * history and re-emits new events as `session/event` frames.
     */
    observe(sessionId: string | undefined): void;
    private connect;
    /**
     * The single scheduler tick is the only interval this client owns. One
     * timer (at the finer of the stall-check and poll cadences) both arms the
     * polling fallback once the stall threshold passes and drives each poll at
     * {@link MuxClientOptions.pollIntervalMs} — one timer instead of two.
     */
    private startTick;
    private stopTick;
    private tick;
    private startPolling;
    private stopPolling;
    /**
     * Fetch the latest history page for the observed session and re-emit any
     * event above the per-session watermark as a `session/event` frame.
     * Idempotent by seq: listeners (and the fold) never see a duplicate.
     */
    private pollTick;
    private handleMessage;
    private emit;
    private closeSource;
}
//# sourceMappingURL=mux.d.ts.map