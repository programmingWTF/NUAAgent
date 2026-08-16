import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * The mobile remote-control panel body: status card (state text + badge),
 * the QR code, the open-on-phone hint with the link text, and the three
 * actions (stop / refresh / copy). Pure presentation — all state and
 * actions arrive through props from the entry's behavior component.
 */
import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { IconCloseOutline16, IconCopyOutline16, IconLinkOutline16, IconRefreshOutline16, IconStopFill16, } from '@nuaagent/client-ui-primitives';
import { formatClock } from "./pair-api.js";
import css from './remote.module.css';
/** Badge text + tone per phase (ready states only). */
function statusOf(t, state) {
    switch (state.phase) {
        case 'connected': return { text: t('status.connected', { n: state.onlineCount }), tone: 'connected' };
        case 'disconnected': return { text: t('status.disconnected'), tone: 'disconnected' };
        case 'stopped': return { text: t('status.stopped'), tone: 'stopped' };
        case 'lan-required': return { text: t('status.lanRequired'), tone: 'stopped' };
        case 'waiting': return { text: t('status.waiting'), tone: 'waiting' };
    }
}
/**
 * Render the pairing panel.
 * @param props - copy, state, and actions.
 * @returns the panel element tree.
 */
export function RemotePanel({ t, state, copied, onClose, onStop, onRefresh, onCopy, onPickAddress, onPickPublic }) {
    return (_jsxs("div", { className: css.panel, role: "dialog", "aria-modal": "true", "aria-label": t('title'), children: [_jsxs("div", { className: css.header, children: [_jsxs("div", { className: css.heading, children: [_jsx("h2", { className: css.title, children: t('title') }), _jsx("p", { className: css.subtitle, children: t('subtitle') })] }), _jsx("button", { type: "button", className: css.close, "aria-label": t('close.label'), onClick: onClose, children: _jsx(IconCloseOutline16, { size: 14 }) })] }), state.kind === 'lan-required' ? (_jsxs("div", { className: css.banner, role: "alert", children: [_jsx("p", { className: css.bannerTitle, children: t('status.lanRequired') }), _jsx("p", { className: css.bannerHint, children: t('status.lanRequiredHint') })] })) : state.kind === 'loopback-required' ? (_jsxs("div", { className: css.banner, role: "alert", children: [_jsx("p", { className: css.bannerTitle, children: t('status.loopbackRequired') }), _jsx("p", { className: css.bannerHint, children: t('status.loopbackRequiredHint') })] })) : state.kind === 'unreachable' ? (_jsxs("div", { className: css.banner, role: "alert", children: [_jsx("p", { className: css.bannerTitle, children: t('status.unreachable') }), _jsx("p", { className: css.bannerHint, children: t('status.unreachableHint') })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.card, children: [_jsxs("div", { className: css.cardHeader, children: [_jsx("span", { className: css.cardTitle, children: t('card.title') }), _jsxs("span", { className: css.badges, children: [state.public && _jsx("span", { className: clsx(css.badge, css.badgePublic), children: t('public.badge') }), _jsx("span", { className: clsx(css.badge, css[`badge-${statusOf(t, state).tone}`]), children: statusOf(t, state).text })] })] }), _jsx("div", { className: css.qrWrap, "data-testid": "remote-qr", children: _jsx(QRCodeSVG, { value: state.url, size: 184, level: "M", marginSize: 1, className: css.qr }) }), state.expired
                                ? _jsx("p", { className: css.expired, children: t('pair.expired') })
                                : _jsx("p", { className: css.expiry, children: t('pair.expires', { time: formatClock(state.expiresAt) }) })] }), _jsx("p", { className: css.hint, children: state.public ? t('pair.publicHint') : t('pair.hint') }), _jsx("p", { className: css.link, title: state.url, children: state.url }), state.phase === 'stopped' && _jsx("p", { className: css.stoppedHint, children: t('stopped.hint') }), state.tunnel !== undefined && state.tunnel.state !== 'running' && (_jsx("p", { className: state.tunnel.state === 'failed' ? css.tunnelFailed : css.tunnelNote, role: "status", children: state.tunnel.state === 'failed'
                            ? t('tunnel.failed', { error: state.tunnel.error ?? t('tunnel.unknownError') })
                            : t('tunnel.starting') })), (state.publicBaseUrl !== undefined || state.lanAddresses.length > 1) && (_jsxs("fieldset", { className: css.addresses, children: [_jsx("legend", { children: t('address.label') }), state.publicBaseUrl !== undefined && (_jsxs("label", { className: css.address, children: [_jsx("input", { type: "radio", name: "lan-address", "aria-label": t('address.public'), checked: state.public, onChange: onPickPublic }), _jsx("span", { children: t('address.public') }), _jsx("code", { className: css.addressValue, children: state.publicBaseUrl })] }, "public")), state.lanAddresses.map(address => (_jsxs("label", { className: css.address, children: [_jsx("input", { type: "radio", name: "lan-address", "aria-label": address, checked: !state.public && address === state.address, onChange: () => onPickAddress(address) }), _jsx("span", { children: t('address.lan') }), _jsx("code", { className: css.addressValue, children: address })] }, address))), _jsx("p", { className: css.addressHint, children: t('address.hint') })] })), _jsxs("div", { className: css.actions, children: [_jsxs("button", { type: "button", className: css.action, onClick: onStop, children: [_jsx(IconStopFill16, { size: 14 }), t('action.stop')] }), _jsxs("button", { type: "button", className: css.action, onClick: onRefresh, children: [_jsx(IconRefreshOutline16, { size: 14 }), t('action.refresh')] }), _jsxs("button", { type: "button", className: css.action, onClick: onCopy, children: [copied ? _jsx(IconCopyOutline16, { size: 14 }) : _jsx(IconLinkOutline16, { size: 14 }), copied ? t('action.copied') : t('action.copy')] })] })] }))] }));
}
