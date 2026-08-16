/**
 * The remote-control settings card: pairing security and device limits.
 * Registers into the `settings.plugin.item` slot the plugin-configuration
 * section renders, bound to the `remote-web-ui` settings namespace.
 */
import type { InjectFace, PropsLocale, PropsRuntime } from '@nuaagent/client-ui-slots';
import type { SettingsScope, SnapshotStore } from '@nuaagent/client-runtime/client';
import { type CardActions, type CardShell, type FieldState as CardFieldState } from './settings-form.ts';
/** The remote-control fields this card edits (the namespace's full schema). */
export interface RemoteSettings {
    /** Master switch for the plugin. */
    enabled?: boolean;
    /** Token lifetime in ms; the QR link dies after this. */
    tokenTtlMs?: number;
    /** A device is "online" while its lastSeenAt is newer than this (ms). */
    offlineAfterMs?: number;
    /** Hard cap on paired device sessions (oldest evicted when full). */
    maxDevices?: number;
    /** Cookie name carrying the paired device id. */
    cookieName?: string;
    /** Fence flag: whether non-loopback /api requests must carry a live paired-device cookie. */
    requirePairingForLan?: boolean;
    /** Public (tunneled) base URL the QR link is built from when set. */
    publicBaseUrl?: string;
    /** When on, the plugin runs its own Cloudflare quick tunnel automatically. */
    autoTunnel?: boolean;
    /** Mobile composer: plain Enter sends; off means Enter inserts a newline. */
    mobileEnterToSend?: boolean;
}
/** What the remote-control card renders. */
export interface RemoteSettingsCardState extends CardShell {
    /** Master switch. */
    enabled: CardFieldState;
    /** Token lifetime. */
    tokenTtlMs: CardFieldState;
    /** Device offline threshold. */
    offlineAfterMs: CardFieldState;
    /** Paired-device cap. */
    maxDevices: CardFieldState;
    /** Device cookie name. */
    cookieName: CardFieldState;
    /** LAN fence flag. */
    requirePairingForLan: CardFieldState;
    /** Public (tunneled) base URL. */
    publicBaseUrl: CardFieldState;
    /** Auto public tunnel switch. */
    autoTunnel: CardFieldState;
    /** Mobile composer Enter-to-send switch. */
    mobileEnterToSend: CardFieldState;
}
/** The registration-side face the card's slot entry injects. */
export interface RemoteSettingsCardFace extends CardActions {
    hooks: {
        /** Card snapshot bound by the renderer as useRemoteSettingsCard. */
        remoteSettingsCard: SnapshotStore<RemoteSettingsCardState>;
    };
}
/** Bridges the `remote-web-ui` scope onto the card's staged form. */
export declare class RemoteSettingsCardController {
    private readonly form;
    private readonly store;
    /** @param scope - the bound settings scope for the `remote-web-ui` namespace. */
    constructor(scope: SettingsScope<RemoteSettings>);
    private projection;
    /**
     * Build the face the card's slot registration injects.
     * @returns the card's snapshot and its form actions.
     */
    inject(): RemoteSettingsCardFace;
}
/** Props the renderer binds for the remote-control card. */
export type RemoteSettingsCardProps = PropsRuntime<'web-ui.plugin.item'> & PropsLocale<'remote'> & InjectFace<RemoteSettingsCardFace>;
/**
 * Render the remote-control card.
 * @param props - locale copy, the card snapshot, and its form actions.
 * @returns the card.
 */
export declare function RemoteSettingsCard(props: RemoteSettingsCardProps): import("react").JSX.Element;
//# sourceMappingURL=RemoteSettingsCard.d.ts.map