/**
 * Mobile surface root: the view state machine (workspaces → sessions →
 * chat) and the top-level data flows. Deliberately plain React state — no
 * router, no state library: the surface is three fixed levels with a back
 * affordance, and every piece of data is fetched on demand.
 */
import { listSessions, listWorkspaces, prompt } from '../api.ts';
/** The session-list row model (list + chat share it). */
export interface SessionView {
    sessionId: string;
    title: string;
    cwd?: string;
    updatedAt: number;
    running: boolean;
    blank: boolean;
}
/** One rendered chat message (produced by the fold). */
export interface RenderMessage {
    id: string;
    kind: 'user' | 'assistant';
    text: string;
    seq: number;
    time: number;
    pending?: boolean;
    failed?: boolean;
    toolSummary?: string;
}
/** Read the optional workspace target carried from the pairing QR flow. */
export declare function mobileWorkspaceTarget(search: string): string | undefined;
/** Map a list row to the surface model; the title comes from projections when present. */
export declare function toSessionView(item: {
    sessionId: string;
    updatedAt: number;
    running: boolean;
    blank: boolean;
    cwd?: string;
    projections?: {
        values?: Record<string, unknown>;
    };
}): SessionView;
/** Human clock, e.g. "14:05" or "昨天 20:31". */
export declare function formatTime(epochMs: number): string;
/**
 * The surface root.
 * @returns the app tree.
 */
export declare function App(): import("react").JSX.Element;
/** Shared error text for the surface's small failure affordances. */
export declare function errorText(error: unknown): string;
/**
 * Actionable hint for transport-level 403s on host-gated channels (model
 * picker, session creation): the phone's UI bundle is served fresh from disk
 * per request, while the host-side allowlist lives in the long-running
 * process — a rebuild without a restart shows the new surface against the
 * old allowlist (HTTP 403 forbidden).
 */
export declare function staleHostHint(message: string): string | undefined;
/** Fetch one history page (tail by default) — thin wrapper so views share the call shape. */
export declare function loadHistory(sessionId: string, beforeSeq?: number, signal?: AbortSignal): Promise<import("../api.ts").HistoryPage>;
export { listSessions, listWorkspaces, prompt };
//# sourceMappingURL=App.d.ts.map