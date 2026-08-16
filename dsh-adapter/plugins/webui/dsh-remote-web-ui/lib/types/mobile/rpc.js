/**
 * Mobile-surface unary RPC over the shared /api transport: the four-quadrant
 * envelope (client-request → server-response), minted rpcIds, and typed
 * error mapping. This is a thin, self-contained slice of the harness
 * apiproxy fetch carrier — the mobile page is an independent bundle and must
 * not depend on the main UI's module loader, so the wire contract is
 * reimplemented here over plain fetch.
 */
/** Transport-level failure (network, HTTP status, malformed envelope). */
export class RpcTransportError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RpcTransportError';
    }
}
/** A business error the host answered with (200 + err result). */
export class RpcCallError extends Error {
    /** The wire error (code + message + details). */
    error;
    constructor(error) {
        super(error.message);
        this.name = 'RpcCallError';
        this.error = error;
    }
}
let rpcCounter = 0;
/** Mint one process-unique rpcId (stable under crypto.randomUUID absence). */
export function mintRpcId() {
    const random = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    rpcCounter += 1;
    return `${random}-${rpcCounter.toString(36)}`;
}
/**
 * One unary call: POST /m/api/<method> (the plugin's own mobile channel —
 * NOT the connection plugin's /api prefix, so the tunneled Host never needs
 * to enter the transport trust fence) with the client-request envelope,
 * resolve the server-response value, reject with the mapped error classes.
 * @param method - the dotted RPC method, e.g. `session.list`.
 * @param payload - the business payload.
 * @param signal - optional abort.
 * @returns the response value.
 */
export async function callUnary(method, payload, signal) {
    const rpcId = mintRpcId();
    let response;
    try {
        response = await fetch(`/m/api/${method}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ type: 'client-request', rpcId, method, payload }),
            ...(signal !== undefined ? { signal } : {}),
        });
    }
    catch (error) {
        const reason = error instanceof DOMException && error.name === 'AbortError'
            ? 'aborted'
            : error instanceof Error ? error.message : String(error);
        throw new RpcTransportError(`transport failed: ${reason}`);
    }
    if (!response.ok) {
        throw new RpcTransportError(`HTTP ${String(response.status)}`);
    }
    let envelope;
    try {
        envelope = await response.json();
    }
    catch {
        throw new RpcTransportError('malformed response body');
    }
    const parsed = envelope;
    if (parsed?.type !== 'server-response' || parsed.rpcId !== rpcId) {
        throw new RpcTransportError('response envelope mismatch');
    }
    const result = parsed.result;
    if (result?.ok === true)
        return result.value;
    if (result?.ok === false && result.error !== undefined) {
        throw new RpcCallError(result.error);
    }
    throw new RpcTransportError('malformed result envelope');
}
