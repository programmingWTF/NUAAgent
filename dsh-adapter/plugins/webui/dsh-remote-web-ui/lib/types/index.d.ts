/**
 * Mobile remote control for the dsh web GUI — host half. Mounts the pairing
 * service (one-time tokens, device sessions, revocation), the /api/pair
 * route family (issue/accept/stop/heartbeat/status/events), the api/gate
 * listener that enforces pairing on every other /api request from
 * non-loopback hosts, and the presence sweep. The browser half (the
 * `./client` entry) renders the sidebar entry, the pairing panel, and the
 * phone-side pair/accept + deep-link flow.
 */
import type { IncomingMessage } from 'node:http';
import type { Context } from '@nuaagent/cordis';
import z from 'schemastery';
declare module '@nuaagent/cordis' {
    interface Events {
        /**
         * Waterfall seam on the /api transport fence: the connection plugin
         * fires this per /api request before bridging to the API proxy on
         * deployments that carry the pairing/revocation seam; call `next()` to
         * delegate, return false (without calling it) to veto with 403.
         */
        'api/gate'(this: Context, request: IncomingMessage, method: string | undefined, next: () => boolean | Promise<boolean>): boolean | Promise<boolean>;
    }
}
/** Stable cordis plugin name. */
export declare const name = "remote-web-ui";
/** Services required before the pairing surfaces can mount. */
export declare const inject: string[];
/**
 * Settings namespace of the remote-control capability — the section the web
 * settings surface edits. Spelled here rather than imported: the browser
 * half spells the same value and must not depend on a Host package.
 */
export declare const REMOTE_WEB_UI_SETTINGS_NAMESPACE: import("@nuaagent/settings").SettingsNamespace;
/** Plugin config, validated by the same-named schemastery schema. */
export interface Config {
    /** Token lifetime in ms; the QR link dies after this. */
    tokenTtlMs?: number;
    /** A device is "online" while its lastSeenAt is newer than this (ms). */
    offlineAfterMs?: number;
    /** Hard cap on paired device sessions (oldest evicted when full). */
    maxDevices?: number;
    /** Cookie name carrying the paired device id. */
    cookieName?: string;
    /**
     * When true (default), every non-loopback /api request must carry a live
     * paired-device cookie — the QR is the only way into a LAN-exposed dsh
     * web, and stop() genuinely cuts paired devices off. Set false to keep
     * the fence's open-LAN behavior and use pairing only for tokens/status.
     */
    requirePairingForLan?: boolean;
    /**
     * Public base URL of a tunnel in front of this server (e.g. a Cloudflare
     * Tunnel quick URL `https://xxx.trycloudflare.com` or a named-tunnel
     * subdomain). When set, the QR link is built from it — a phone anywhere
     * can pair — and its host is trusted by the phone-facing pairing fence.
     * Leave unset for LAN-only usage. Malformed values are ignored with a
     * warning (LAN-only behavior preserved). Ignored while `autoTunnel` is on.
     */
    publicBaseUrl?: string;
    /**
     * When true, the plugin runs its own Cloudflare quick tunnel (the
     * cloudflared binary ships with the package — no user-side install) and
     * feeds the minted public URL into both the QR base and the /api trust
     * fence dynamically, so phones anywhere can pair without any manual
     * tunnel setup. The manual `publicBaseUrl` is ignored while this is on.
     */
    autoTunnel?: boolean;
    /**
     * Mobile composer behavior: when true (default), a plain Enter in the
     * phone chat textarea sends the prompt and Shift+Enter inserts a newline.
     * When false, plain Enter inserts a newline and only the send button
     * sends (Shift+Enter keeps inserting a newline).
     */
    mobileEnterToSend?: boolean;
    /** Master switch for the plugin (browser half + host pairing surfaces). */
    enabled?: boolean;
}
export declare const Config: z<Config>;
/**
 * Mount the pairing service, routes, gate listener, and presence sweep.
 * @param ctx - host plugin context carrying webServer.
 * @param config - resolved plugin config (schema defaults applied by the loader).
 */
export declare function apply(ctx: Context, config?: Config): void;
//# sourceMappingURL=index.d.ts.map