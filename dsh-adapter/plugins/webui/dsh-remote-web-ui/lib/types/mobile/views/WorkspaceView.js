import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Landing level: the workspace roster. The mobile surface opens straight
 * here — no new-session homepage — and every workspace row is a thin
 * fetch from workspace.list (the roster is small; sessions are not loaded
 * until a workspace is opened).
 */
import { useEffect, useState } from 'react';
import { listWorkspaces } from "../api.js";
import { errorText } from "./App.js";
import { ThemeToggle } from "../theme-toggle.js";
/**
 * Render the workspace roster.
 * @param props - the pick action.
 * @returns the roster.
 */
export function WorkspaceView({ initialWorkspaceId, onPick }) {
    const [items, setItems] = useState(undefined);
    const [error, setError] = useState(undefined);
    useEffect(() => {
        let cancelled = false;
        void listWorkspaces().then((rows) => {
            if (cancelled)
                return;
            const target = initialWorkspaceId === undefined
                ? undefined
                : rows.find(workspace => workspace.workspaceId === initialWorkspaceId);
            if (target !== undefined) {
                onPick(target);
                return;
            }
            setItems(rows);
        }, (reason) => {
            if (cancelled)
                return;
            setError(errorText(reason));
        });
        return () => { cancelled = true; };
    }, [initialWorkspaceId, onPick]);
    if (error !== undefined) {
        return (_jsxs("div", { className: "mobile", children: [_jsxs("header", { className: "mobile-header", children: [_jsx("h1", { className: "mobile-title", children: "\u5DE5\u4F5C\u533A" }), _jsx(ThemeToggle, {})] }), _jsxs("div", { className: "mobile-empty", children: [_jsxs("p", { className: "mobile-error", children: ["\u52A0\u8F7D\u5931\u8D25\uFF1A", error] }), _jsx("button", { type: "button", className: "mobile-button", onClick: () => { setError(undefined); setItems(undefined); }, children: "\u91CD\u8BD5" })] })] }));
    }
    if (items === undefined) {
        return (_jsxs("div", { className: "mobile", children: [_jsxs("header", { className: "mobile-header", children: [_jsx("h1", { className: "mobile-title", children: "\u5DE5\u4F5C\u533A" }), _jsx(ThemeToggle, {})] }), _jsx("div", { className: "mobile-empty", children: _jsx("p", { className: "mobile-muted", children: "\u52A0\u8F7D\u4E2D\u2026" }) })] }));
    }
    if (items.length === 0) {
        return (_jsxs("div", { className: "mobile", children: [_jsxs("header", { className: "mobile-header", children: [_jsx("h1", { className: "mobile-title", children: "\u5DE5\u4F5C\u533A" }), _jsx(ThemeToggle, {})] }), _jsx("div", { className: "mobile-empty", children: _jsx("p", { className: "mobile-muted", children: "\u6682\u65E0\u5DE5\u4F5C\u533A" }) })] }));
    }
    return (_jsxs("div", { className: "mobile", children: [_jsxs("header", { className: "mobile-header", children: [_jsx("h1", { className: "mobile-title", children: "\u5DE5\u4F5C\u533A" }), _jsx(ThemeToggle, {})] }), _jsx("ul", { className: "mobile-list", children: items.map(workspace => (_jsx("li", { children: _jsxs("button", { type: "button", className: "mobile-row", onClick: () => { onPick(workspace); }, children: [_jsx("span", { className: "mobile-rowTitle", children: workspace.title }), _jsx("span", { className: "mobile-rowMeta", children: workspace.path }), _jsx("span", { className: "mobile-chevron", children: "\u203A" })] }) }, workspace.workspaceId))) })] }));
}
