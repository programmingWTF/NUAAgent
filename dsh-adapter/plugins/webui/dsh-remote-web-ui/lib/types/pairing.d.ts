/**
 * Pairing state machine: one active one-time token, a device-session table,
 * and presence tracking. Pure TypeScript with injected clock/randomness so
 * the whole security semantics are unit-testable without cordis. The
 * cordis-facing surfaces (routes, the api/gate listener) live next door.
 *
 * Security invariants:
 * - One active token at a time; `issue()` replaces it, so a refreshed QR
 *   immediately invalidates the previous link.
 * - A token is consumed by the first successful `accept()` — reuse is
 *   refused with `'used'`.
 * - Tokens expire; `accept()` on an expired token is refused like an
 *   unknown one (no oracle for validity).
 * - `stop()` revokes every device session and clears the token, so paired
 *   devices are cut off on their next gated request.
 */
/** The observable pairing phases the panel renders. */
export type PairingPhase = 
/** The server is not bound all-interfaces: no usable QR exists. */
'lan-required'
/** Remote control was stopped; a fresh QR (issue) re-enables it. */
 | 'stopped'
/** A token is live and no device has paired with it yet. */
 | 'waiting'
/** At least one paired device was active recently. */
 | 'connected'
/** Devices are paired but none has been active within the offline window. */
 | 'disconnected';
/** One issued pairing token (keyed by its secret). */
export interface TokenRecord {
    /** Monotonic issue time (ms epoch), drives refresh ordering. */
    issuedAt: number;
    /** Absolute expiry (ms epoch); accept() past this is refused. */
    expiresAt: number;
    /** Consumed by the first successful accept(). */
    consumed: boolean;
    /** Opaque, non-secret identifier surfaced in snapshots (never the pairing secret). */
    id: string;
    /** Workspace the QR link should land the phone in (optional). */
    workspaceId?: string;
    /** LAN IP literal the QR link was built from (optional; default first). */
    address?: string;
}
/** One paired device session, keyed by the device id stored in its cookie. */
export interface DeviceSession {
    /** Pairing time (ms epoch). */
    createdAt: number;
    /** Last time the device passed a gated request or heartbeat. */
    lastSeenAt: number;
}
/** One tunnel status frame (auto-tunnel only; undefined when disabled). */
export interface TunnelStatus {
    /** starting: binary/process warming up; running: URL minted; failed: no URL. */
    state: 'starting' | 'running' | 'failed';
    /** The minted public URL, once the tunnel reports it. */
    url?: string;
    /** Human-readable failure detail. */
    error?: string;
}
/** One snapshot frame pushed to desktop status streams. */
export interface PairingSnapshot {
    phase: PairingPhase;
    /** Whether the server bind is all-interfaces (a QR is constructible). */
    lanAvailable: boolean;
    /** The LAN IP literals a QR can be built from (interface order). */
    lanAddresses: string[];
    /** Configured public (tunneled) base URL, when present. */
    publicUrl?: string;
    /** Auto-tunnel status, while the auto-tunnel feature is active. */
    tunnel?: TunnelStatus;
    /** Opaque (non-secret) id of the active token (undefined when stopped/lan-required). */
    tokenId?: string;
    /** Absolute expiry of the active token. */
    tokenExpiresAt?: number;
    /** Count of ever-paired devices. */
    deviceCount: number;
    /** Count of devices active within the offline window. */
    onlineCount: number;
}
/** Service tunables (config-validated upstream; plain numbers here). */
export interface PairingConfig {
    /** Token lifetime; the QR stops working after this. */
    tokenTtlMs: number;
    /** A device is "online" while its lastSeenAt is newer than this. */
    offlineAfterMs: number;
    /** Hard cap on paired device sessions (oldest-evicted when full). */
    maxDevices: number;
    /** Cookie name carrying the device id. */
    cookieName: string;
}
/** Result of one accept() attempt. */
export type AcceptResult = {
    ok: true;
    deviceId: string;
} | {
    ok: false;
    code: 'invalid' | 'used';
};
/** Thrown by issue() for an address outside the sampled LAN literals. */
export declare class UnknownLanAddressError extends Error {
    /**
     * @param address - the offending literal.
     */
    constructor(address: string);
}
/** Clock and entropy injection for tests. */
export interface PairingClock {
    now(): number;
    randomToken(): string;
}
/** Real clock/entropy: 32 random hex chars per token. */
export declare const defaultClock: PairingClock;
/**
 * The pairing state machine. All mutations notify state listeners after the
 * commit point that makes them true, and notification dedupes against the
 * last emitted snapshot — time-driven transitions (a device aging offline)
 * surface on the next sweep without any mutation.
 */
export declare class PairingService {
    config: PairingConfig;
    private readonly clock;
    private readonly tokens;
    private readonly devices;
    private readonly listeners;
    private lastEmitted;
    private stopped;
    private tokenSerial;
    /** LAN base URLs keyed by the advertised IP literal (interface order). */
    private lanBases;
    /** Public (tunneled) base URL, e.g. a Cloudflare Tunnel quick URL. */
    private publicBase;
    /** Auto-tunnel status, while the auto-tunnel feature is active. */
    private tunnelStatus;
    /**
     * @param config - tunables. The settings surface replaces the object (a
     * fresh literal) when a committed section changes; every operation reads
     * the current one.
     * @param clock - clock/entropy source (injectable for tests).
     */
    constructor(config: PairingConfig, clock?: PairingClock);
    /** The default LAN base URL (the first interface; undefined when not LAN-reachable). */
    get lanBaseUrl(): string | undefined;
    /** The LAN base URL for one specific literal (undefined when not constructible). */
    lanBaseUrlFor(address: string): string | undefined;
    /** The LAN IP literals QR links can be built from (interface order). */
    get lanAddresses(): string[];
    /** Set the LAN base URLs once the server bind is known (interface order). */
    setLanBases(entries: readonly {
        address: string;
        base: string;
    }[]): void;
    /** The configured public (tunneled) base URL, when present. */
    get publicBaseUrl(): string | undefined;
    /** Set or clear the public base URL (a tunnel in front of this server). */
    setPublicBaseUrl(url: string | undefined): void;
    /** Set or clear the auto-tunnel status frame (undefined when the feature is off). */
    setTunnelStatus(status: TunnelStatus | undefined): void;
    /**
     * Issue a fresh token, replacing (invalidating) any previous one. A
     * stopped service re-arms through this call (the panel's refresh button).
     * @param workspaceId - optional workspace the QR link should land in.
     * @param address - optional LAN IP literal the QR must be built from; the
     * default is the public base (when configured) or the first interface.
     * Unknown addresses are refused.
     * @returns the token secret and its expiry.
     * @throws {Error} when no reachable base exists (no all-interfaces bind and
     * no public base) — callers surface this as the lan-required state instead
     * of minting an unusable QR.
     */
    issue(workspaceId?: string, address?: string): {
        token: string;
        expiresAt: number;
    };
    /**
     * Consume a token and bind a device session. One-time: the second
     * successful call for the same token is impossible because the first
     * consumes it.
     * @param token - the token secret from the QR link.
     * @returns the new device id, or a refusal code.
     */
    accept(token: string): AcceptResult;
    /**
     * Stop remote control: revoke every device session and clear the token.
     * The phone's next gated /api request 403s; the panel falls back to
     * stopped until a fresh QR is issued.
     */
    stop(): void;
    /**
     * The api/gate path: record activity for a device id and report whether
     * the request may proceed. Unknown or revoked ids (including any device
     * after stop()) are refused.
     * @param deviceId - the cookie value of the requesting device.
     * @returns true when the device session is live and was refreshed.
     */
    touchDevice(deviceId: string): boolean;
    /** Explicit presence heartbeat (the phone's client sends these). */
    heartbeat(deviceId: string): boolean;
    /**
     * Periodic sweep: re-evaluate the derived snapshot (a device aging past
     * the offline window flips the phase to disconnected). Emits only when
     * the snapshot actually changed.
     */
    sweep(): void;
    /** The current snapshot (fresh object per call — stable between emits). */
    snapshot(): PairingSnapshot;
    /** Whether a cookie value names a currently live device session. */
    hasDevice(deviceId: string): boolean;
    /** Subscribe to snapshot changes (each emit passes a fresh snapshot). */
    onState(listener: (snapshot: PairingSnapshot) => void): () => void;
    private activeToken;
    private derivePhase;
    private isOnlineAt;
    private notify;
}
//# sourceMappingURL=pairing.d.ts.map