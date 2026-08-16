/**
 * The `api/gate` listener: application-level access control layered on top
 * of the transport fence (the fence is Host/Origin based and explicitly not
 * an authentication layer — packages/client/connection documents this
 * event as the sanctioned seam for pairing/revocation).
 *
 * Policy: loopback requests (the desktop) pass without a device identity;
 * every non-loopback /api request must carry a live, non-revoked device
 * cookie. This makes the QR the only way into a LAN-exposed dsh web and
 * gives "停止" real teeth: revoked devices 403 on their next request,
 * including the mux/SSE stream (which then dies on reconnect).
 */
import type { IncomingMessage } from 'node:http';
import type { PairingService } from './pairing.ts';
/**
 * Whether a normalized URL hostname names the local loopback authority.
 * Semantics mirror the connection package's internal predicate (localhost,
 * IPv6 loopback, any IPv4 address in 127/8); it is reimplemented here because
 * the connection package no longer exports it — the fence now lives inside
 * the connection plugin, and external host plugins only need the
 * classification, not the whole trust decision.
 * @param hostname - WHATWG URL hostname (IPv6 literals retain brackets).
 * @returns true for localhost, IPv6 loopback, or any IPv4 address in 127/8.
 */
export declare function isLoopbackHostname(hostname: string): boolean;
/** Whether a socket remote address names the loopback range (127/8, ::1, IPv4-mapped). */
export declare function isLoopbackAddress(address: string | undefined): boolean;
/**
 * Read one cookie value from a Cookie header.
 * @param header - the raw Cookie header value (or undefined).
 * @param name - the cookie name.
 * @returns the value, or undefined when absent.
 */
export declare function readCookie(header: string | undefined, name: string): string | undefined;
/**
 * The effective Host hostname of a request.
 * @param request - node HTTP request.
 * @returns the normalized hostname, or undefined when unparsable.
 */
export declare function hostnameOf(request: IncomingMessage): string | undefined;
/** Whether a request comes from the desktop loopback client (loopback socket AND loopback Host). */
export declare function isLoopbackClient(request: IncomingMessage): boolean;
/**
 * Build the api/gate listener for one pairing service.
 * @param service - the pairing service.
 * @param requirePairingForLan - when false, non-loopback requests pass
 * without a device cookie (the feature then only manages tokens/status;
 * revocation of paired devices still holds). A function is re-read per
 * request, so a settings edit takes effect without a restart. Defaults to true.
 * @param enabled - when false, every non-loopback request is vetoed while
 * loopback stays available. A function is re-read per request so the fence
 * stays mounted for the plugin lifetime and disabling the plugin cannot open
 * a LAN-exposed /api. Defaults to true.
 * @returns the cordis waterfall listener: call `next()` to delegate,
 * return false (without calling it) to veto with 403.
 */
export declare function makeGateListener(service: PairingService, requirePairingForLan?: boolean | (() => boolean), enabled?: boolean | (() => boolean)): (request: IncomingMessage, method: string | undefined, next: () => boolean | Promise<boolean>) => boolean | Promise<boolean>;
//# sourceMappingURL=gate.d.ts.map