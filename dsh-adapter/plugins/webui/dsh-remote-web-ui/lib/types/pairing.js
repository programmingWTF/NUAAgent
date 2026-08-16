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
import { randomBytes } from 'node:crypto';
/** Thrown by issue() for an address outside the sampled LAN literals. */
export class UnknownLanAddressError extends Error {
    /**
     * @param address - the offending literal.
     */
    constructor(address) {
        super(`remote-web-ui: unknown LAN address ${JSON.stringify(address)}`);
        this.name = 'UnknownLanAddressError';
    }
}
/** Real clock/entropy: 32 random hex chars per token. */
export const defaultClock = {
    now: () => Date.now(),
    randomToken: () => randomBytes(16).toString('hex'),
};
/**
 * The pairing state machine. All mutations notify state listeners after the
 * commit point that makes them true, and notification dedupes against the
 * last emitted snapshot — time-driven transitions (a device aging offline)
 * surface on the next sweep without any mutation.
 */
export class PairingService {
    config;
    clock;
    tokens = new Map();
    devices = new Map();
    listeners = new Set();
    lastEmitted;
    stopped = false;
    tokenSerial = 0;
    /** LAN base URLs keyed by the advertised IP literal (interface order). */
    lanBases = new Map();
    /** Public (tunneled) base URL, e.g. a Cloudflare Tunnel quick URL. */
    publicBase;
    /** Auto-tunnel status, while the auto-tunnel feature is active. */
    tunnelStatus;
    /**
     * @param config - tunables. The settings surface replaces the object (a
     * fresh literal) when a committed section changes; every operation reads
     * the current one.
     * @param clock - clock/entropy source (injectable for tests).
     */
    constructor(config, clock = defaultClock) {
        this.config = config;
        this.clock = clock;
    }
    /** The default LAN base URL (the first interface; undefined when not LAN-reachable). */
    get lanBaseUrl() {
        return this.lanBases.values().next().value;
    }
    /** The LAN base URL for one specific literal (undefined when not constructible). */
    lanBaseUrlFor(address) {
        return this.lanBases.get(address);
    }
    /** The LAN IP literals QR links can be built from (interface order). */
    get lanAddresses() {
        return [...this.lanBases.keys()];
    }
    /** Set the LAN base URLs once the server bind is known (interface order). */
    setLanBases(entries) {
        this.lanBases = new Map(entries.map(entry => [entry.address, entry.base]));
        this.notify();
    }
    /** The configured public (tunneled) base URL, when present. */
    get publicBaseUrl() {
        return this.publicBase;
    }
    /** Set or clear the public base URL (a tunnel in front of this server). */
    setPublicBaseUrl(url) {
        this.publicBase = url;
        this.notify();
    }
    /** Set or clear the auto-tunnel status frame (undefined when the feature is off). */
    setTunnelStatus(status) {
        this.tunnelStatus = status;
        this.notify();
    }
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
    issue(workspaceId, address) {
        if (this.lanBases.size === 0 && this.publicBase === undefined) {
            throw new Error('remote-web-ui: pairing requires a reachable bind (--host 0.0.0.0 or publicBaseUrl)');
        }
        if (address !== undefined && !this.lanBases.has(address)) {
            throw new UnknownLanAddressError(address);
        }
        const now = this.clock.now();
        const token = this.clock.randomToken();
        this.tokens.clear();
        this.stopped = false;
        this.tokenSerial += 1;
        this.tokens.set(token, {
            id: `t${this.tokenSerial}`,
            issuedAt: now,
            expiresAt: now + this.config.tokenTtlMs,
            consumed: false,
            ...(workspaceId !== undefined ? { workspaceId } : {}),
            ...(address !== undefined ? { address } : {}),
        });
        this.notify();
        return { token, expiresAt: now + this.config.tokenTtlMs };
    }
    /**
     * Consume a token and bind a device session. One-time: the second
     * successful call for the same token is impossible because the first
     * consumes it.
     * @param token - the token secret from the QR link.
     * @returns the new device id, or a refusal code.
     */
    accept(token) {
        const record = this.tokens.get(token);
        if (record === undefined || record.consumed || this.stopped || this.clock.now() > record.expiresAt) {
            return { ok: false, code: record?.consumed === true ? 'used' : 'invalid' };
        }
        record.consumed = true;
        const deviceId = this.clock.randomToken();
        const now = this.clock.now();
        if (this.devices.size >= this.config.maxDevices) {
            // Evict the oldest session (FIFO) before binding a new device.
            let oldest;
            for (const [id, session] of this.devices) {
                if (oldest === undefined || session.createdAt < oldest.createdAt)
                    oldest = { id, createdAt: session.createdAt };
            }
            if (oldest !== undefined)
                this.devices.delete(oldest.id);
        }
        this.devices.set(deviceId, { createdAt: now, lastSeenAt: now });
        this.notify();
        return { ok: true, deviceId };
    }
    /**
     * Stop remote control: revoke every device session and clear the token.
     * The phone's next gated /api request 403s; the panel falls back to
     * stopped until a fresh QR is issued.
     */
    stop() {
        this.tokens.clear();
        this.devices.clear();
        this.stopped = true;
        this.notify();
    }
    /**
     * The api/gate path: record activity for a device id and report whether
     * the request may proceed. Unknown or revoked ids (including any device
     * after stop()) are refused.
     * @param deviceId - the cookie value of the requesting device.
     * @returns true when the device session is live and was refreshed.
     */
    touchDevice(deviceId) {
        const session = this.devices.get(deviceId);
        if (session === undefined || this.stopped)
            return false;
        session.lastSeenAt = this.clock.now();
        this.notify();
        return true;
    }
    /** Explicit presence heartbeat (the phone's client sends these). */
    heartbeat(deviceId) {
        return this.touchDevice(deviceId);
    }
    /**
     * Periodic sweep: re-evaluate the derived snapshot (a device aging past
     * the offline window flips the phase to disconnected). Emits only when
     * the snapshot actually changed.
     */
    sweep() {
        this.notify();
    }
    /** The current snapshot (fresh object per call — stable between emits). */
    snapshot() {
        const now = this.clock.now();
        const onlineCount = [...this.devices.values()].filter(session => this.isOnlineAt(session, now)).length;
        const token = this.activeToken();
        return {
            phase: this.derivePhase(onlineCount, token !== undefined),
            lanAvailable: this.lanBases.size > 0,
            lanAddresses: [...this.lanBases.keys()],
            ...(this.publicBase !== undefined ? { publicUrl: this.publicBase } : {}),
            ...(this.tunnelStatus !== undefined ? { tunnel: this.tunnelStatus } : {}),
            ...(token !== undefined ? { tokenId: token.record.id, tokenExpiresAt: token.record.expiresAt } : {}),
            deviceCount: this.devices.size,
            onlineCount,
        };
    }
    /** Whether a cookie value names a currently live device session. */
    hasDevice(deviceId) {
        const session = this.devices.get(deviceId);
        return session !== undefined && !this.stopped;
    }
    /** Subscribe to snapshot changes (each emit passes a fresh snapshot). */
    onState(listener) {
        this.listeners.add(listener);
        return () => { this.listeners.delete(listener); };
    }
    activeToken() {
        for (const [token, record] of this.tokens) {
            if (this.stopped)
                return undefined;
            if (this.clock.now() > record.expiresAt)
                continue;
            return { token, record };
        }
        return undefined;
    }
    derivePhase(onlineCount, hasToken) {
        if (this.lanBases.size === 0 && this.publicBase === undefined)
            return 'lan-required';
        if (this.stopped)
            return 'stopped';
        if (onlineCount > 0)
            return 'connected';
        if (this.devices.size > 0)
            return 'disconnected';
        if (hasToken)
            return 'waiting';
        return 'stopped';
    }
    isOnlineAt(session, now) {
        return now - session.lastSeenAt <= this.config.offlineAfterMs;
    }
    notify() {
        const snapshot = this.snapshot();
        if (this.lastEmitted !== undefined && snapshotsEqual(this.lastEmitted, snapshot))
            return;
        this.lastEmitted = snapshot;
        for (const listener of this.listeners) {
            try {
                listener(snapshot);
            }
            catch (error) {
                // A throwing subscriber must not break the emit loop or the caller.
                console.error('remote-web-ui: pairing state listener failed', error);
            }
        }
    }
}
/** Structural equality over the snapshot's wire fields. */
function snapshotsEqual(a, b) {
    return a.phase === b.phase
        && a.lanAvailable === b.lanAvailable
        && sameStrings(a.lanAddresses, b.lanAddresses)
        && a.publicUrl === b.publicUrl
        && tunnelEqual(a.tunnel, b.tunnel)
        && a.tokenId === b.tokenId
        && a.tokenExpiresAt === b.tokenExpiresAt
        && a.deviceCount === b.deviceCount
        && a.onlineCount === b.onlineCount;
}
/** Tunnel frame equality (undefined equals undefined; fields compared shallowly). */
function tunnelEqual(a, b) {
    return a === b || (a !== undefined && b !== undefined
        && a.state === b.state && a.url === b.url && a.error === b.error);
}
/** Element-wise string list equality (interface order is meaningful). */
function sameStrings(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}
