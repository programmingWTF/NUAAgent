/**
 * The /api/pair route family + the desktop status stream. Exact routes
 * under /api: the webserver matches exact paths before the connection
 * plugin's /api prefix, so these handlers own the full response lifecycle
 * and apply their own trust fence (loopback-only for control endpoints;
 * loopback-or-LAN for the phone-facing accept/heartbeat/status). The
 * cookie set on accept is the device identity the api/gate listener checks
 * on every other /api request.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { WebRoute } from '@nuaagent/host-webserver';
import { z } from 'zod';
import { type PairingService, type PairingSnapshot } from './pairing.ts';
/**
 * Browser-trust fence for the /api/pair routes, mirroring the connection
 * package's internal fence semantics (Host/Origin based, DNS-rebinding and
 * cross-site defense). The connection package no longer exports its trust
 * predicate — the fence for the /api prefix lives inside the connection
 * plugin — so the pairing routes, which must stay reachable from LAN phones
 * ahead of the connection prefix route (exact routes match first), carry
 * their own copy scoped to the literals the QR links advertise.
 * @param request - the node HTTP request.
 * @param trustedHosts - non-loopback authorities this surface serves: exact
 * `host:port`, or port-less `host` matching any port.
 * @returns true when the Host is ours (loopback or trusted) and any attached
 * browser markers are same-origin.
 */
export declare function isTrustedApiRequest(request: IncomingMessage, trustedHosts: readonly string[]): boolean;
/**
 * The host authority of a configured public base URL, e.g. `foo.trycloudflare.com`
 * from `https://foo.trycloudflare.com`. Undefined when the URL does not parse —
 * a malformed config then simply contributes no fence entry (and the panel
 * falls back to LAN-only URLs).
 * @param url - the configured public base URL (or undefined).
 * @returns the `host[:port]` authority the fence should trust.
 */
export declare function publicHostOf(url: string | undefined): string | undefined;
/** Route paths (exact matches under /api). */
export declare const PAIR_PATHS: {
    readonly issue: "/api/pair/issue";
    readonly accept: "/api/pair/accept";
    readonly stop: "/api/pair/stop";
    readonly heartbeat: "/api/pair/heartbeat";
    readonly status: "/api/pair/status";
    readonly events: "/api/pair/events";
};
/**
 * /api/pair request payload contracts. Each POST endpoint validates its body
 * against one of these instead of reaching into a hand-parsed object: the
 * control-plane endpoints that carry no meaningful payload use the permissive
 * pairActionPayloadSchema so their smoke calls keep working unchanged, while
 * issue/accept enforce their optional/required fields. Unknown (extra) keys
 * are tolerated exactly as the previous manual reads ignored them.
 */
export declare const issuePayloadSchema: z.ZodObject<{
    workspaceId: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const acceptPayloadSchema: z.ZodObject<{
    token: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const pairActionPayloadSchema: z.ZodObject<{}, z.core.$loose>;
/** The SSE fan-out for desktop panel status. */
export declare class PairingEventsStream {
    private readonly streams;
    /**
     * @param service - the pairing service whose snapshots are fanned out.
     */
    constructor(service: PairingService);
    /** Open one stream; the response is owned to completion. */
    open(req: IncomingMessage, res: ServerResponse): void;
    /** Push one frame to every open stream (contained per stream). */
    push(snapshot: PairingSnapshot): void;
    /** Stream count (tests/diagnostics). */
    get size(): number;
}
/** Route-family dependencies (test seam). */
export interface PairRoutesDeps {
    /** The pairing service. */
    service: PairingService;
    /** The LAN IP literals the fence accepts (derived from the bind host). */
    lanAddresses: readonly string[];
}
/**
 * Build the /api/pair route family.
 * @param deps - service + fence inputs.
 * @returns the exact routes to register on webServer.
 */
export declare function makeRoutes(deps: PairRoutesDeps): WebRoute[];
//# sourceMappingURL=routes.d.ts.map