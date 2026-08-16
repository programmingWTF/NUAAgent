import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * The sidebar update seat: the download trigger beside the remote-control
 * trigger plus the update panel modal. Owns the flow — probe the registry
 * on open, auto-run the update when a newer release exists, report the
 * outcome (restart hint on success, translated failure on error).
 * Component-local state per the client stack rules.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconDownloadOutline16 } from '@nuaagent/client-ui-primitives';
import { fetchUpdateStatus, runUpdate, UpdateStatusError } from "./update-api.js";
import { UpdatePanel } from "./UpdatePanel.js";
import css from "./remote.module.css";
/**
 * Render the update trigger and panel.
 * @param props - column state and locale seat.
 * @returns the entry element tree.
 */
export function UpdateEntry({ wide, t }) {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState({ kind: "checking" });
    const runToken = useRef(0);
    const check = useCallback(async () => {
        setView({ kind: "checking" });
        let status;
        try {
            status = await fetchUpdateStatus();
        }
        catch (error) {
            // HTTP 404: the update route is not mounted — the host process runs an
            // older plugin build (client refreshed, host did not). Restarting dsh
            // web loads the new plugin; a plain network failure gets the generic
            // offline copy instead of a misleading "cannot reach update source".
            if (error instanceof UpdateStatusError && error.status === 404) {
                setView({ kind: "error", message: t("update.unmounted"), detail: t("update.unmountedDetail") });
                return;
            }
            setView({ kind: "error", message: t("update.offline"), detail: t("update.offlineDetail") });
            return;
        }
        if (status.error === "registry-unreachable") {
            setView({ kind: "result", status });
            return;
        }
        setView({ kind: "result", status });
        // Auto-update: an npm install with a newer release proceeds without a
        // second confirmation — clicking the update trigger is the intent.
        if (status.mode !== "npm" || !status.outdated)
            return;
        setView({ kind: "updating", status });
        const token = ++runToken.current;
        try {
            const result = await runUpdate();
            if (token !== runToken.current)
                return;
            setView({ kind: "done", result });
        }
        catch {
            if (token !== runToken.current)
                return;
            setView({ kind: "error", message: t("update.error"), detail: t("update.offlineDetail") });
        }
    }, [t]);
    const openPanel = useCallback(() => {
        setOpen(true);
        void check();
    }, [check]);
    const closePanel = useCallback(() => {
        runToken.current++;
        setOpen(false);
    }, []);
    // Unmount safety: an in-flight update must not land on a dead component.
    useEffect(() => () => { runToken.current++; }, []);
    return (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: css.trigger, "data-wide": wide ? undefined : "rail", "aria-label": t("update.label"), title: t("update.label"), onClick: openPanel, children: _jsx(IconDownloadOutline16, { size: wide ? 16 : 18 }) }), open && createPortal((_jsxs("div", { className: css.overlay, role: "presentation", children: [_jsx("div", { className: css.mask, "aria-hidden": "true", onClick: closePanel }), _jsx(UpdatePanel, { t: t, view: view, onClose: closePanel, onRecheck: () => { void check(); } })] })), document.body)] }));
}
