/**
 * Pet HTTP routes — the browser half talks to the host through plain
 * same-origin JSON endpoints ('/api/pet/*') and loads pet assets from
 * '/pet/<id>/*'. The '/plugins/' endpoint only serves client bundles and RPC
 * domains are platform-registered, so the pet serves its own API and media —
 * the same pattern as dsh-remote-web-ui's '/api/pair' family. The asset route
 * is one prefix registration serving every registry entry (manifest, atlas,
 * optional previews), so adding a pet never touches route wiring.
 * @module @linxin666/dsh-pet/routes
 */
import type { WebRoute } from '@nuaagent/host-webserver';
import type { PetService } from './service.ts';
/** Browser-facing base path of the pet API. */
export declare const PET_API_PREFIX = "/api/pet";
/** Browser-facing base path of the pet asset routes ('/pet/<id>/...'). */
export declare const PET_ASSET_PREFIX = "/pet";
/** Build the full route family (API + assets) for one service. */
export declare function makePetRoutes(deps: {
    service: PetService;
}): WebRoute[];
export { petPackageRoot } from './registry.ts';
//# sourceMappingURL=routes.d.ts.map