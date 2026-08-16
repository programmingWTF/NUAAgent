/**
 * Sessions level: one workspace's sessions, loaded incrementally — the
 * first page fetches session.list with a cursor, scrolling appends further
 * pages (never the whole list at once). Rows are filtered to the opened
 * workspace by its owned session ids; extra pages are pulled on demand so
 * a workspace with many sessions converges without a full transfer.
 *
 * Creating a session is this level's other action: the workspace's id is
 * sent to session.create (the host attaches the new session to it), the
 * fresh row is prepended optimistically, and the user lands straight in
 * the new chat — the same "new session opens" flow as the desktop UI.
 */
import type { WorkspaceView as WorkspaceRow } from '@nuaagent/host-apiproxy/api/workspace';
import { type SessionView } from './App.tsx';
/** Props for the session list. */
export interface SessionListViewProps {
    workspace: WorkspaceRow;
    onBack(): void;
    onPick(session: SessionView): void;
}
/**
 * Render one workspace's paged session list.
 * @param props - the workspace, back action, and pick action.
 * @returns the session list.
 */
export declare function SessionListView({ workspace, onBack, onPick }: SessionListViewProps): import("react").JSX.Element;
//# sourceMappingURL=SessionListView.d.ts.map