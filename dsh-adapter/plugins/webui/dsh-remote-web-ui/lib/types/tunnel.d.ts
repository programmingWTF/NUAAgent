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
/** The observable tunnel lifecycle the settings/panel surfaces render. */
export type TunnelPhase = 'stopped' | 'starting' | 'running' | 'failed';
/** One tunnel status frame. */
export interface TunnelInfo {
    phase: TunnelPhase;
    /** The minted public URL, once the tunnel reports it. */
    url?: string;
    /** Human-readable failure detail (binary install, URL timeout, spawn error). */
    error?: string;
}
/** The tunnel handle subset this manager uses (the package's Tunnel fits). */
export interface TunnelHandle {
    on(event: string, listener: (...args: any[]) => void): unknown;
    off(event: string, listener: (...args: any[]) => void): unknown;
    stop(): boolean;
}
/** Injectable seams (defaults are the real cloudflared package + node timers). */
export interface TunnelManagerOptions {
    /** Spawn one quick tunnel toward the local target URL. */
    factory?: (targetUrl: string) => TunnelHandle;
    /** Make sure the cloudflared binary exists, downloading it when absent. */
    ensureBinary?: () => Promise<void>;
    /** Wait up to this long for the tunnel URL before failing the attempt. */
    urlTimeoutMs?: number;
    /** First restart delay after an unexpected failure (exponential base). */
    restartBaseMs?: number;
    /** Cap on the exponential restart delay. */
    restartMaxMs?: number;
    /** Timer source (injected in tests). */
    timer?: {
        setTimeout(fn: () => void, ms: number): unknown;
        clearTimeout(t: unknown): void;
    };
}
/**
 * Own the lifecycle of one auto-tunnel: start/stop, URL surfacing, and
 * crash-restart backoff.
 */
export declare class TunnelManager {
    private readonly factory;
    private readonly ensureBinary;
    private readonly urlTimeoutMs;
    private readonly restartBaseMs;
    private readonly restartMaxMs;
    private readonly timer;
    private phase;
    private url;
    private error;
    private targetUrl;
    private handle;
    private urlTimer;
    private restartTimer;
    private attempts;
    private stopping;
    private readonly urlListeners;
    private readonly phaseListeners;
    /**
     * @param options - seams; defaults spawn the real quick tunnel.
     */
    constructor(options?: TunnelManagerOptions);
    /** The current status frame. */
    get info(): TunnelInfo;
    /**
     * Start (or keep) a quick tunnel toward `targetUrl`. Restarting with a
     * different target tears the old tunnel down first; restarting with the
     * same target while running is a no-op.
     * @param targetUrl - the local URL to expose, e.g. `http://127.0.0.1:3080`.
     */
    start(targetUrl: string): void;
    /** Stop the tunnel for good: no restarts, no state. */
    stop(): void;
    /** Alias of {@link stop} for plugin-effect disposal. */
    dispose(): void;
    /** Subscribe to minted tunnel URLs (fire-and-forget duplicates dropped). */
    onUrl(listener: (url: string) => void): () => void;
    /** Subscribe to every phase change. */
    onPhase(listener: (info: TunnelInfo) => void): () => void;
    private attempt;
    private handleUrl;
    private handleExit;
    private fail;
    /** Stop the current process and cancel every pending timer (no phase change). */
    private teardown;
    private setPhase;
}
//# sourceMappingURL=tunnel.d.ts.map