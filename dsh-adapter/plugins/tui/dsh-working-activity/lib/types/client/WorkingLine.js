import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from './WorkingLine.module.css';
/** Tool-count badge copy (no locale seat: the line text itself is host-composed). */
const TOOLS_LABEL = 'tools this turn';
/**
 * Working-line dock entry: reads the latest activity snapshot off the
 * conversation snapshot and renders the row, or nothing when idle/absent.
 */
export function WorkingLine({ useSession }) {
    const activity = useSession(s => s.activity);
    if (activity === null || activity.phase === 'idle' || activity.line === '')
        return null;
    return (_jsxs("div", { className: css.line, "data-activity-phase": activity.phase, children: [_jsx("span", { className: css.marker, "aria-hidden": "true" }), _jsx("span", { className: css.text, children: activity.line }), activity.toolCount > 0 && (_jsx("span", { className: css.tools, title: `${activity.toolCount} ${TOOLS_LABEL}`, children: activity.toolCount }))] }));
}
