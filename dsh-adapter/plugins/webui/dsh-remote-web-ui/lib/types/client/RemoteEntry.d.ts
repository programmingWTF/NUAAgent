import type { PropsLocale, PropsRuntime } from '@nuaagent/client-ui-slots';
/** Entry props: the sidebar column state + the standard locale seat. */
export type RemoteEntryProps = PropsRuntime<'sidebar.remote'> & PropsLocale<'remote'>;
/**
 * Render the remote-control trigger and panel.
 * @param props - composed slot props (contract in this package).
 * @returns the entry element tree.
 */
export declare function RemoteEntry({ wide, useWorkspaces, t }: RemoteEntryProps): import("react").JSX.Element;
//# sourceMappingURL=RemoteEntry.d.ts.map