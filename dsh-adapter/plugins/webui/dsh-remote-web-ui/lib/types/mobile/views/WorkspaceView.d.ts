/**
 * Landing level: the workspace roster. The mobile surface opens straight
 * here — no new-session homepage — and every workspace row is a thin
 * fetch from workspace.list (the roster is small; sessions are not loaded
 * until a workspace is opened).
 */
import type { WorkspaceView as WorkspaceRow } from '@nuaagent/host-apiproxy/api/workspace';
/** Props for the workspace roster. */
export interface WorkspaceViewProps {
    /** Workspace carried by the pairing link; opened after the roster loads. */
    initialWorkspaceId?: string;
    /** Open one workspace's session list. */
    onPick(workspace: WorkspaceRow): void;
}
/**
 * Render the workspace roster.
 * @param props - the pick action.
 * @returns the roster.
 */
export declare function WorkspaceView({ initialWorkspaceId, onPick }: WorkspaceViewProps): import("react").JSX.Element;
//# sourceMappingURL=WorkspaceView.d.ts.map