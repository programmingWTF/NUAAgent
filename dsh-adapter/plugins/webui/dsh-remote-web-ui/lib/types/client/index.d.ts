import type { ClientContext, SettingsScope, SettingsScopeSpec } from '@nuaagent/client-runtime/client';
import { type RemoteKey } from './locales.ts';
export type { RemoteEntryProps } from './RemoteEntry.tsx';
export type { PanelState, RemotePanelProps } from './RemotePanel.tsx';
export type { PairFailedNoticeProps } from './PairFailedNotice.tsx';
export type { RemoteKey } from './locales.ts';
export type { RemoteSettingsCardFace, RemoteSettingsCardState } from './RemoteSettingsCard.tsx';
export type { UpdateEntryProps } from './UpdateEntry.tsx';
export type { UpdatePanelProps, UpdateView } from './UpdatePanel.tsx';
declare module '@nuaagent/client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Mobile remote-control surface copy. */
        remote: RemoteKey;
    }
    interface SlotMap {
        /**
         * The sidebar foot seat beside the settings trigger, declared by the
         * sidebar shell on deployments that carry the feature seat; the shell
         * passes only its column display state.
         */
        'sidebar.remote': {
            kind: 'single';
            scope: 'root';
            owner: SidebarRemoteOwnerProps;
        };
        /**
         * The child slot the Web UI plugin group declares; this card registers
         * into the group instead of the top-level `settings.plugin.item` list.
         * Spelled here with the same shape so this package can register without
         * depending on the sibling UI package.
         */
        'web-ui.plugin.item': {
            kind: 'list';
            scope: 'root';
            owner: SettingsPluginItemOwnerProps;
        };
    }
}
/** Owner share of the sidebar remote-control seat: the column display state the trigger renders against. */
export interface SidebarRemoteOwnerProps {
    /** Whether the sidebar renders wide content (false = 56px rail). */
    wide: boolean;
}
/** Owner share of a plugin card (the section supplies nothing). */
export interface SettingsPluginItemOwnerProps {
    /** Marker field: card owner props are intentionally empty. */
    children?: never;
}
declare module '@nuaagent/cordis' {
    interface Context {
        /**
         * Optional rc.6 compatibility binder provided by dsh-web-ui-settings;
         * absent when that group plugin is not installed, so callers fall back to
         * the official settings scope.
         */
        webUiSettings?: {
            bind<S>(spec: SettingsScopeSpec<S>): SettingsScope<S>;
        };
    }
}
/** Services required by this plugin. */
export declare const inject: string[];
/**
 * Register the remote-control surface.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map