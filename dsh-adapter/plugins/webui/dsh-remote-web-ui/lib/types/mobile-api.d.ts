/**
 * The mobile surface's data channel: `/m/api` proxies the host ApiProxy
 * service for the standalone phone page. The phone's RPC calls ride THIS
 * prefix instead of the connection plugin's `/api` — so the tunneled Host
 * never needs to enter the connection trust fence (a distributable plugin
 * cannot change that fence), and this plugin's own pairing gate is the
 * access control instead.
 *
 * Security model:
 * - Every request must carry a live paired-device cookie (the same gate
 *   semantic as the LAN fence), enforced before any host call.
 * - Only an explicit allowlist of methods is proxied; privileged domains
 *   (settings, credentials, host actions, goals, subagents, …) are never
 *   reachable from the phone.
 * - `session.list` is paged here (the host API returns everything; this
 *   layer slices stable pages) so the phone never transfers the whole list.
 * - The live mux stream is bridged over Server-Sent Events on the same
 *   prefix (one-directional push; answers to questions/approvals ride the
 *   unary channel), gated identically.
 */
import type { WebRoute } from '@nuaagent/host-webserver';
import type { ApiProxy } from '@nuaagent/host-apiproxy';
import type { PairingService } from './pairing.ts';
/** Route-family dependencies. */
export interface MobileApiDeps {
    /** The pairing service (device gate + cookie name). */
    service: PairingService;
    /** The host ApiProxy service (injected by the plugin). */
    apiProxy: ApiProxy;
    /** The resolved mobile composer preference (live per request). */
    mobileEnterToSend: () => boolean;
    /** SSE keep-alive ping cadence for the mux stream (default 15000 ms; test seam). */
    eventsHeartbeatMs?: number;
}
/** Mobile API route paths. */
export declare const MOBILE_API_PATHS: {
    readonly events: "/m/api/events.mux";
};
/**
 * Build the mobile data-channel routes.
 * @param deps - pairing service + apiProxy.
 * @returns the routes to register on webServer.
 */
export declare function makeMobileApiRoutes(deps: MobileApiDeps): WebRoute[];
//# sourceMappingURL=mobile-api.d.ts.map