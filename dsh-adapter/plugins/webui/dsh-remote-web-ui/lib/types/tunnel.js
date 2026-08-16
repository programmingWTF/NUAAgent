/**
 * Auto-tunnel manager: spawns a Cloudflare quick tunnel (`cloudflared
 * tunnel --url <local>`) through the `cloudflared` npm package — its
 * postinstall downloads the platform binary, so no user-side tooling is
 * involved — surfaces the minted `https://xxx.trycloudflare.com` URL, and
 * restarts the process after unexpected exits with exponential backoff.
 *
 * The cloudflared package's Tunnel is a thin spawn wrapper; this manager
 * owns the lifecycle policy (binary readiness, URL timeout, restart
 * backoff) around it. All seams — the tunnel factory, binary readiness,
 * timers — are injectable so the whole lifecycle is unit-testable without
 * a real binary or network.
 */
import { existsSync } from 'node:fs';
import { bin, install, Tunnel } from 'cloudflared';
/** Default binary readiness: download the platform binary on first use. */
async function defaultEnsureBinary() {
    if (existsSync(bin))
        return;
    await install(bin);
}
/** Default factory: the cloudflared package's quick tunnel (no account). */
function defaultFactory(targetUrl) {
    // `--no-autoupdate`: the binary must never upgrade itself out from under
    // the manager (a self-updated binary would break the pinned lifecycle).
    return Tunnel.quick(targetUrl, { '--no-autoupdate': true });
}
/** Node timers. */
const nodeTimer = { setTimeout, clearTimeout };
/**
 * Own the lifecycle of one auto-tunnel: start/stop, URL surfacing, and
 * crash-restart backoff.
 */
export class TunnelManager {
    factory;
    ensureBinary;
    urlTimeoutMs;
    restartBaseMs;
    restartMaxMs;
    timer;
    phase = 'stopped';
    url;
    error;
    targetUrl;
    handle;
    urlTimer;
    restartTimer;
    attempts = 0;
    stopping = false;
    urlListeners = new Set();
    phaseListeners = new Set();
    /**
     * @param options - seams; defaults spawn the real quick tunnel.
     */
    constructor(options = {}) {
        this.factory = options.factory ?? defaultFactory;
        this.ensureBinary = options.ensureBinary ?? defaultEnsureBinary;
        this.urlTimeoutMs = options.urlTimeoutMs ?? 30_000;
        this.restartBaseMs = options.restartBaseMs ?? 5_000;
        this.restartMaxMs = options.restartMaxMs ?? 60_000;
        this.timer = options.timer ?? nodeTimer;
    }
    /** The current status frame. */
    get info() {
        return {
            phase: this.phase,
            ...(this.url !== undefined ? { url: this.url } : {}),
            ...(this.error !== undefined ? { error: this.error } : {}),
        };
    }
    /**
     * Start (or keep) a quick tunnel toward `targetUrl`. Restarting with a
     * different target tears the old tunnel down first; restarting with the
     * same target while running is a no-op.
     * @param targetUrl - the local URL to expose, e.g. `http://127.0.0.1:3080`.
     */
    start(targetUrl) {
        if (this.targetUrl === targetUrl && (this.phase === 'starting' || this.phase === 'running'))
            return;
        this.teardown();
        this.stopping = false;
        this.targetUrl = targetUrl;
        this.attempts = 0;
        this.attempt();
    }
    /** Stop the tunnel for good: no restarts, no state. */
    stop() {
        this.teardown();
        this.stopping = false;
        this.targetUrl = undefined;
        this.setPhase('stopped');
    }
    /** Alias of {@link stop} for plugin-effect disposal. */
    dispose() {
        this.stop();
    }
    /** Subscribe to minted tunnel URLs (fire-and-forget duplicates dropped). */
    onUrl(listener) {
        this.urlListeners.add(listener);
        return () => { this.urlListeners.delete(listener); };
    }
    /** Subscribe to every phase change. */
    onPhase(listener) {
        this.phaseListeners.add(listener);
        return () => { this.phaseListeners.delete(listener); };
    }
    attempt() {
        if (this.stopping || this.targetUrl === undefined)
            return;
        this.setPhase('starting');
        this.handle = undefined;
        this.url = undefined;
        this.error = undefined;
        void this.ensureBinary().then(() => {
            if (this.stopping || this.targetUrl === undefined)
                return;
            const handle = this.factory(this.targetUrl);
            this.handle = handle;
            this.urlTimer = this.timer.setTimeout(() => {
                // The tunnel never reported a URL: kill it and retry with backoff.
                this.fail('timed out waiting for the tunnel URL');
            }, this.urlTimeoutMs);
            handle.on('url', (value) => {
                if (this.handle !== handle)
                    return;
                this.handleUrl(value);
            });
            handle.on('exit', () => {
                if (this.handle !== handle)
                    return;
                this.handleExit();
            });
            handle.on('error', (value) => {
                // Spawn/connection errors usually precede an exit; the exit path owns
                // restart, this only records diagnostics while the process still lives.
                if (this.handle !== handle || this.phase !== 'starting')
                    return;
                this.error = value instanceof Error ? value.message : String(value);
            });
        }).catch((value) => {
            // Binary install failed (no network, no platform build): report it.
            if (this.stopping || this.targetUrl === undefined)
                return;
            const message = value instanceof Error ? value.message : String(value);
            this.fail(`could not obtain the cloudflared binary: ${message}`);
        });
    }
    handleUrl(value) {
        if (this.urlTimer !== undefined) {
            this.timer.clearTimeout(this.urlTimer);
            this.urlTimer = undefined;
        }
        this.url = value;
        this.error = undefined;
        this.attempts = 0;
        this.setPhase('running');
        for (const listener of this.urlListeners) {
            try {
                listener(value);
            }
            catch {
                // A throwing subscriber must not break the emit loop.
            }
        }
    }
    handleExit() {
        // The exit handler is detached during teardown, so reaching this point
        // means an unexpected death: fail the current phase and schedule a retry.
        if (this.stopping)
            return;
        this.fail('the tunnel process exited unexpectedly');
    }
    fail(message) {
        if (this.stopping)
            return;
        this.url = undefined;
        this.error = message;
        if (this.handle !== undefined) {
            this.handle.stop();
            this.handle = undefined;
        }
        if (this.urlTimer !== undefined) {
            this.timer.clearTimeout(this.urlTimer);
            this.urlTimer = undefined;
        }
        this.setPhase('failed');
        this.attempts += 1;
        const delay = Math.min(this.restartBaseMs * 2 ** (this.attempts - 1), this.restartMaxMs);
        this.restartTimer = this.timer.setTimeout(() => {
            this.restartTimer = undefined;
            this.attempt();
        }, delay);
    }
    /** Stop the current process and cancel every pending timer (no phase change). */
    teardown() {
        this.stopping = true;
        if (this.urlTimer !== undefined) {
            this.timer.clearTimeout(this.urlTimer);
            this.urlTimer = undefined;
        }
        if (this.restartTimer !== undefined) {
            this.timer.clearTimeout(this.restartTimer);
            this.restartTimer = undefined;
        }
        if (this.handle !== undefined) {
            this.handle.stop();
            this.handle = undefined;
        }
    }
    setPhase(phase) {
        this.phase = phase;
        const info = this.info;
        for (const listener of this.phaseListeners) {
            try {
                listener(info);
            }
            catch {
                // A throwing subscriber must not break the emit loop.
            }
        }
    }
}
