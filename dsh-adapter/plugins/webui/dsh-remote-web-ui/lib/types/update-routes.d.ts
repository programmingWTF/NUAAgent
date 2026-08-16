/**
 * The /api/update route family: the status probe and the update run. Both
 * are loopback-only control surfaces — the run endpoint triggers a real
 * pnpm install inside the owning profile, so it must never be reachable
 * from a LAN/phone origin.
 */
import type { IncomingMessage } from 'node:http';
import type { WebRoute } from '@nuaagent/host-webserver';
import type { UpdateRunResult, UpdateStatus } from './update.ts';
/** Route paths (exact matches under /api). */
export declare const UPDATE_PATHS: {
    readonly status: "/api/update/status";
    readonly run: "/api/update/run";
};
/** Route-family dependencies (test seam). */
export interface UpdateRoutesDeps {
    /** Loopback-only fence: the control endpoints are host-surface only. */
    fence(request: IncomingMessage): boolean;
    /** Probe registry versions and report the comparison. */
    check(): Promise<UpdateStatus>;
    /** Run the pnpm update (resolves when pnpm exits). */
    run(): Promise<UpdateRunResult>;
}
/**
 * Build the /api/update route family.
 * @param deps - fence + check/run seams.
 * @returns the exact routes to register on webServer.
 */
export declare function makeUpdateRoutes(deps: UpdateRoutesDeps): WebRoute[];
//# sourceMappingURL=update-routes.d.ts.map