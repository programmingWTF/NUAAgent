import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * The sidebar remote-control seat: the update trigger plus the phone-icon
 * trigger beside the settings button, and the pairing panel modal. Owns the
 * panel behavior — token minting on open, the status SSE subscription,
 * stop/refresh/copy — and renders the pure {@link RemotePanel} body. The
 * update seat (the dsh-web-ui self-update flow) rides the same footer row,
 * rendered by {@link UpdateEntry}. Component-local state per the client
 * stack rules: nothing here survives remounts or crosses entries.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RemotePanel } from "./RemotePanel.js";
import { copyText, issuePair, stopPair } from "./pair-api.js";
import { PhoneIcon } from "./PhoneIcon.js";
import { UpdateEntry } from "./UpdateEntry.js";
import css from './remote.module.css';
/** Apply one status frame onto the current ready state. */
function mergeFrame(state, frame) {
    if (state.kind !== 'ready')
        return state;
    return {
        ...state,
        phase: frame.phase,
        deviceCount: frame.deviceCount,
        onlineCount: frame.onlineCount,
        ...(frame.tunnel !== undefined ? { tunnel: frame.tunnel } : {}),
    };
}
/**
 * Render the remote-control trigger and panel.
 * @param props - composed slot props (contract in this package).
 * @returns the entry element tree.
 */
export function RemoteEntry({ wide, useWorkspaces, t }) {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({ kind: 'lan-required' });
    const [copied, setCopied] = useState(false);
    const eventSource = useRef(undefined);
    // The current workspace (the recent-workspace projection the shell's New
    // Session flow targets) — the deep-link target for the phone.
    const workspaceId = useWorkspaces(s => s.recentWorkspaceId);
    const closeEventSource = useCallback(() => {
        eventSource.current?.close();
        eventSource.current = undefined;
    }, []);
    const mint = useCallback(async (address) => {
        let result;
        try {
            result = await issuePair(workspaceId, address);
        }
        catch {
            // Fetch/network failure: show an explicit state instead of silently
            // leaving the panel on its initial banner.
            return { kind: 'unreachable' };
        }
        if (!result.ok) {
            // 403 is the loopback-only fence refusing a LAN origin (the panel is a
            // desktop control endpoint); 409 means the server never bound 0.0.0.0;
            // 400 means the requested LAN literal is no longer constructible.
            if (result.code === 'forbidden')
                return { kind: 'loopback-required' };
            if (result.code === 'unknown-address')
                return { kind: 'unreachable' };
            return { kind: 'lan-required' };
        }
        const publicBaseUrl = result.publicBaseUrl;
        return {
            kind: 'ready',
            url: result.url,
            expiresAt: result.expiresAt,
            expired: Date.now() > result.expiresAt,
            phase: 'waiting',
            deviceCount: 0,
            onlineCount: 0,
            // Whether this QR is built on the configured public (tunneled) base.
            public: publicBaseUrl !== undefined && result.url.startsWith(publicBaseUrl),
            ...(publicBaseUrl !== undefined ? { publicBaseUrl } : {}),
            // The issued URL names the requested (or default first) literal; the
            // public link has no LAN literal, so no radio row is selected then.
            address: address ?? result.lanAddresses[0] ?? '',
            lanAddresses: result.lanAddresses,
        };
    }, [workspaceId]);
    const openPanel = useCallback(async () => {
        setOpen(true);
        const next = await mint();
        setState(next);
        // Live status: the desktop panel mirrors the pairing service state. The
        // stream only makes sense in the ready state — on a failure banner the
        // events endpoint is unreachable too (loopback fence), so opening it
        // would just start a doomed reconnect loop.
        if (next.kind !== 'ready')
            return;
        const source = new EventSource('/api/pair/events');
        eventSource.current = source;
        source.onmessage = (event) => {
            try {
                const frame = JSON.parse(event.data);
                if (frame.type !== 'state')
                    return;
                setState(previous => mergeFrame(previous, frame));
            }
            catch {
                // Malformed frames are dropped; the snapshot on open is authoritative.
            }
        };
    }, [mint]);
    const closePanel = useCallback(() => {
        closeEventSource();
        setOpen(false);
    }, [closeEventSource]);
    // Expiry flip: one timeout per token lifetime (reset by refresh).
    useEffect(() => {
        if (state.kind !== 'ready')
            return;
        if (state.expired)
            return;
        const delay = state.expiresAt - Date.now();
        if (delay <= 0) {
            setState(previous => previous.kind === 'ready' ? { ...previous, expired: true } : previous);
            return;
        }
        const timer = window.setTimeout(() => {
            setState(previous => previous.kind === 'ready' ? { ...previous, expired: true } : previous);
        }, delay);
        return () => { window.clearTimeout(timer); };
    }, [state]);
    // Unmount safety: never leave the stream open.
    useEffect(() => closeEventSource, [closeEventSource]);
    const handleStop = useCallback(() => {
        // A failed stop request is harmless: the optimistic phase flip below
        // keeps the UI honest, and the status stream confirms the stopped phase.
        void stopPair().catch(() => { });
        // Optimistic fallback; the status stream confirms with the stopped phase.
        setState(previous => previous.kind === 'ready' ? { ...previous, phase: 'stopped' } : previous);
    }, []);
    const handleRefresh = useCallback(() => {
        void mint().then(setState);
    }, [mint]);
    /** Re-mint against another LAN literal (multi-homed machines). */
    const handlePickAddress = useCallback((address) => {
        void mint(address).then(setState);
    }, [mint]);
    /** Re-mint against the configured public (tunneled) base. */
    const handlePickPublic = useCallback(() => {
        void mint().then(setState);
    }, [mint]);
    const handleCopy = useCallback(() => {
        if (state.kind !== 'ready')
            return;
        void copyText(state.url).then((ok) => {
            if (!ok)
                return;
            setCopied(true);
            window.setTimeout(() => { setCopied(false); }, 1500);
        });
    }, [state]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.entryRow, "data-rail": wide ? undefined : 'rail', children: [_jsx(UpdateEntry, { wide: wide, t: t }), _jsx(TooltipAnchor, { wide: wide, label: t('entry.label'), onClick: openPanel })] }), open && createPortal((_jsxs("div", { className: css.overlay, role: "presentation", children: [_jsx("div", { className: css.mask, "aria-hidden": "true", onClick: closePanel }), _jsx(RemotePanel, { t: t, state: state, copied: copied, onClose: closePanel, onStop: handleStop, onRefresh: handleRefresh, onCopy: handleCopy, onPickAddress: handlePickAddress, onPickPublic: handlePickPublic })] })), document.body)] }));
}
/** The trigger: an icon button matching the settings rail/row geometry. */
function TooltipAnchor({ wide, label, onClick }) {
    return (_jsx("button", { type: "button", className: css.trigger, "data-wide": wide ? undefined : 'rail', "aria-label": label, title: label, onClick: onClick, children: _jsx(PhoneIcon, { size: wide ? 16 : 18 }) }));
}
