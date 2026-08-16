import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import { useCallback, useEffect, useRef, useState } from 'react';
import { createSession, listSessions, listWorkspaces } from "../api.js";
import { errorText, formatTime, staleHostHint, toSessionView } from "./App.js";
import { ThemeToggle } from "../theme-toggle.js";
/** Rows that belong to the opened workspace (its owned session id set). */
function ownedItems(page, workspace) {
    const owned = new Set(workspace.sessionIds);
    return page
        .filter(item => owned.has(item.sessionId))
        .map(item => toSessionView(item));
}
/**
 * Render one workspace's paged session list.
 * @param props - the workspace, back action, and pick action.
 * @returns the session list.
 */
export function SessionListView({ workspace, onBack, onPick }) {
    const [rows, setRows] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(undefined);
    const cursorRef = useRef(undefined);
    const busyRef = useRef(false);
    // First page on mount. The workspace roster is re-read alongside so the
    // owned-id set is fresh: a session created (or attached) since this
    // workspace row was captured must not vanish from the filter.
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(undefined);
        void Promise.all([listSessions(), listWorkspaces()]).then(([page, workspaces]) => {
            if (cancelled)
                return;
            const fresh = workspaces.find(candidate => candidate.workspaceId === workspace.workspaceId);
            const current = fresh ?? workspace;
            setRows(ownedItems(page.items, current));
            cursorRef.current = page.nextCursor;
            setHasMore(page.hasMore);
            setLoading(false);
        }, (reason) => {
            if (cancelled)
                return;
            setError(errorText(reason));
            setLoading(false);
        });
        return () => { cancelled = true; };
    }, [workspace]);
    /** Pull the next page and append the rows that belong to this workspace. */
    const loadMore = useCallback(() => {
        if (busyRef.current)
            return;
        const cursor = cursorRef.current;
        if (cursor === undefined)
            return;
        busyRef.current = true;
        setLoading(true);
        void listSessions(cursor).then((page) => {
            busyRef.current = false;
            setLoading(false);
            cursorRef.current = page.nextCursor;
            setHasMore(page.hasMore);
            setRows(previous => [...previous, ...ownedItems(page.items, workspace)]);
        }, (reason) => {
            busyRef.current = false;
            setLoading(false);
            setError(errorText(reason));
        });
    }, [workspace]);
    /** Create a blank session in this workspace and open it immediately. */
    const handleCreate = useCallback(() => {
        if (creating)
            return;
        setCreating(true);
        setCreateError(undefined);
        void createSession({ workspaceId: workspace.workspaceId }).then((created) => {
            setCreating(false);
            const view = {
                sessionId: created.sessionId,
                title: '新会话',
                updatedAt: Date.now(),
                running: false,
                blank: true,
            };
            setRows(previous => [view, ...previous]);
            onPick(view);
        }, (reason) => {
            setCreating(false);
            setCreateError(errorText(reason));
        });
    }, [creating, workspace, onPick]);
    const createHint = createError !== undefined ? staleHostHint(createError) : undefined;
    return (_jsxs("div", { className: "mobile", children: [_jsxs("header", { className: "mobile-header", children: [_jsx("button", { type: "button", className: "mobile-back", "aria-label": "\u8FD4\u56DE", onClick: onBack, children: "\u2039" }), _jsx("h1", { className: "mobile-title mobile-titleInline", children: workspace.title }), _jsx(ThemeToggle, {})] }), error !== undefined && _jsx("p", { className: "mobile-error mobile-pad", children: error }), _jsx("div", { className: "mobile-pad", children: _jsx("button", { type: "button", className: "mobile-new", disabled: creating, onClick: () => { void handleCreate(); }, children: creating ? '创建中…' : '+ 新建会话' }) }), createError !== undefined && (_jsxs("p", { className: "mobile-error mobile-pad", children: [createError, createHint !== undefined && _jsx("span", { className: "mobile-hint", children: createHint })] })), _jsx("ul", { className: "mobile-list", children: rows.map(row => (_jsx("li", { children: _jsxs("button", { type: "button", className: "mobile-row", onClick: () => { onPick(row); }, children: [_jsxs("span", { className: "mobile-rowMain", children: [_jsxs("span", { className: "mobile-rowTitle", children: [row.blank ? '新会话' : row.title, row.running ? _jsx("span", { className: "mobile-live", children: "\u25CF" }) : null] }), _jsx("span", { className: "mobile-rowMeta", children: formatTime(row.updatedAt) })] }), _jsx("span", { className: "mobile-chevron", children: "\u203A" })] }) }, row.sessionId))) }), hasMore && (_jsx("div", { className: "mobile-pad", children: _jsx("button", { type: "button", className: "mobile-button mobile-block", disabled: loading, onClick: () => { void loadMore(); }, children: loading ? '加载中…' : '加载更多会话' }) })), !hasMore && rows.length === 0 && !loading && (_jsx("div", { className: "mobile-empty", children: _jsx("p", { className: "mobile-muted", children: "\u8BE5\u5DE5\u4F5C\u533A\u8FD8\u6CA1\u6709\u4F1A\u8BDD\uFF0C\u70B9\u4E0A\u65B9\u6309\u94AE\u65B0\u5EFA\u4E00\u4E2A" }) }))] }));
}
