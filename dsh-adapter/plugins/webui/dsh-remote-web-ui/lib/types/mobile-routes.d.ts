/**
 * The mobile surface's page routes: `/m` serves the standalone phone UI
 * (an independent bundle, built to lib/mobile.js by the mobile tsdown
 * entry), `/m/mobile.js` serves the bundle itself. The page talks to the
 * host exclusively through the shared /api transport (paired-device cookie
 * already crosses the api/gate fence), so no host-side data plumbing is
 * needed here — only static serving, loopback+paired-fence via the normal
 * webserver route registration.
 */
import type { WebRoute } from '@nuaagent/host-webserver';
/**
 * Build the mobile page routes.
 * @returns the two exact routes to register on webServer.
 */
export declare function makeMobileRoutes(): WebRoute[];
//# sourceMappingURL=mobile-routes.d.ts.map