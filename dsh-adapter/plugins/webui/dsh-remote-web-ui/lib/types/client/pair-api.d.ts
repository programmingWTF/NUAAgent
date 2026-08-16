/**
 * Browser-side wire helpers for the /api/pair surface. Plain fetch over
 * same-origin /api (like the connection client); JSON bodies, string
 * responses for the error codes.
 */
/** issue() response. */
export interface IssueResult {
    ok: true;
    url: string;
    token: string;
    expiresAt: number;
    /** Every constructible LAN base address (interface order). */
    lanAddresses: string[];
    /** The configured public (tunneled) base URL, when present. */
    publicBaseUrl?: string;
}
/** issue() refusal: the server is not LAN-reachable. */
export interface IssueLanRequired {
    ok: false;
    code: 'lan-required';
}
/** issue() refusal: the requested LAN address is not constructible. */
export interface IssueUnknownAddress {
    ok: false;
    code: 'unknown-address';
}
/** issue() refusal: the loopback-only fence rejected this origin. */
export interface IssueLoopbackRequired {
    ok: false;
    code: 'forbidden';
}
export type IssueResponse = IssueResult | IssueLanRequired | IssueUnknownAddress | IssueLoopbackRequired;
/** accept() refusal codes. */
export type AcceptFailure = {
    ok: false;
    code: 'invalid' | 'used' | 'forbidden';
};
/** One auto-tunnel status frame (absent while the feature is off). */
export interface TunnelStatusFrame {
    state: 'starting' | 'running' | 'failed';
    url?: string;
    error?: string;
}
/** One /api/pair/events frame. */
export interface PairStateFrame {
    type: 'state';
    phase: 'lan-required' | 'stopped' | 'waiting' | 'connected' | 'disconnected';
    lanAvailable: boolean;
    tokenId?: string;
    tokenExpiresAt?: number;
    deviceCount: number;
    onlineCount: number;
    /** Auto-tunnel status, while the auto-tunnel feature is active. */
    tunnel?: TunnelStatusFrame;
}
/**
 * Mint a fresh pairing token (one active token at a time — this invalidates
 * any previous link).
 * @param workspaceId - optional current workspace to deep-link the phone into.
 * @param address - optional LAN IP literal the QR must be built from (the
 * default is the first interface); unknown literals refuse with
 * 'unknown-address'.
 * @returns the issued link, the lan-required refusal (server never bound
 * 0.0.0.0), or the forbidden refusal (the loopback-only fence rejected this
 * origin — the panel is a desktop control endpoint).
 */
export declare function issuePair(workspaceId?: string, address?: string): Promise<IssueResponse>;
/**
 * Accept a pairing token (the phone's first open of the QR link). Success
 * sets the device cookie; the page then reloads to boot with it.
 * @param token - the token from the URL.
 * @returns the wire result.
 */
export declare function acceptPair(token: string): Promise<{
    ok: true;
} | AcceptFailure>;
/** Revoke mobile access (paired devices + the current token). */
export declare function stopPair(): Promise<void>;
/** Presence heartbeat from a paired phone (unpaired heartbeats 401 harmlessly). */
export declare function sendHeartbeat(): Promise<void>;
/** Whether the current page URL carries a pairing token / workspace target. */
export declare function readPairParams(search: string): {
    pair?: string;
    workspace?: string;
};
/**
 * Strip one query parameter from the current URL without reloading.
 * @param name - the parameter to remove.
 * @returns the new search string ('' when empty).
 */
export declare function stripParam(name: string): string; /** Human-readable expiry clock, e.g. "10:35". */
export declare function formatClock(epochMs: number): string;
/**
 * Copy text to the clipboard with a fallback for insecure contexts
 * (plain-HTTP LAN origins lack navigator.clipboard).
 * @param text - the text to copy.
 * @returns whether the copy succeeded.
 */
export declare function copyText(text: string): Promise<boolean>;
//# sourceMappingURL=pair-api.d.ts.map