/**
 * Mobile-surface unary RPC over the shared /api transport: the four-quadrant
 * envelope (client-request → server-response), minted rpcIds, and typed
 * error mapping. This is a thin, self-contained slice of the harness
 * apiproxy fetch carrier — the mobile page is an independent bundle and must
 * not depend on the main UI's module loader, so the wire contract is
 * reimplemented here over plain fetch.
 */
/** Transport-level failure (network, HTTP status, malformed envelope). */
export declare class RpcTransportError extends Error {
    constructor(message: string);
}
/** A business error the host answered with (200 + err result). */
export declare class RpcCallError extends Error {
    /** The wire error (code + message + details). */
    readonly error: {
        code: string;
        message: string;
    };
    constructor(error: {
        code: string;
        message: string;
    });
}
/** Mint one process-unique rpcId (stable under crypto.randomUUID absence). */
export declare function mintRpcId(): string;
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
export declare function callUnary<T>(method: string, payload: unknown, signal?: AbortSignal): Promise<T>;
//# sourceMappingURL=rpc.d.ts.map