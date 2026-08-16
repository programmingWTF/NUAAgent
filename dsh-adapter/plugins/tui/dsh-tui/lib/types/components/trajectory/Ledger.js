import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text, useTheme } from '../../ui.js';
import { burstDurationMs, burstErrors, previewText } from '../../dsh-adapter/trajectory/index.js';
import { costGlyph, formatDuration, formatClock, heatColor, KIND_BADGE, KIND_BADGE_BG, KIND_FG, KIND_GLYPH, ledgerLayout, } from '../../trajectory/format.js';
import { arrive, mix } from '../../trajectory/motion.js';
import { stringWidth } from '../../ink/stringWidth.js';
import { getTheme } from '../../theme.js';
/**
 * The ledger — one line per event, columns aligned across every row.
 *
 * Four decisions carry most of the readability:
 *
 * **Flat rows, spined turns.** Indenting by turn would break the column
 * alignment that makes forty rows scannable at a glance, so rows stay flush
 * and a two-cell spine on the left (`╭ │ ╰`, the git-graph idiom) carries the
 * grouping instead. The spine is itself information: it turns red for a turn
 * that failed and green for the turn still running.
 *
 * **Turn boundaries are rules, not rows.** A turn is a chapter heading, and a
 * heading that looks like a body row makes the ledger read as one undifferentiated
 * list. Rendering it as a full-width rule chunks a five-hundred-row session
 * into things the eye can count.
 *
 * **Cost before number.** Every row carries a one-cell bar on an absolute
 * scale, so "which of these was slow" is answered by silhouette rather than by
 * reading a column of durations.
 *
 * **Call and result on one line.** `name {args} → result` — the same shape the
 * official web ledger uses, and the reason a screenful answers "what did it do
 * and what came back" without a single expansion.
 *
 * Rows are windowed by the caller; this component paints only what it is
 * given, and calls {@link previewText} exactly once per visible cell.
 */
/** Idle shorter than this is noise, not a pause worth naming. */
const IDLE_FLOOR_MS = 20_000;
/** Spine glyphs by position within a turn. */
const SPINE = { open: '╭', mid: '│', close: '╰', none: ' ' };
/** Which spine glyph a row gets, given its neighbours' turns. */
function spineGlyph(rows, index) {
    const node = rows[index];
    if (node.kind === 'turn')
        return SPINE.open;
    const next = rows[index + 1];
    if (next === undefined || next.turn !== node.turn || next.kind === 'turn')
        return SPINE.close;
    return SPINE.mid;
}
export function Ledger({ rows, start, height, cursor, width, tick, arrivalTick, arrivalFrom, }) {
    const [themeName] = useTheme();
    const theme = getTheme(themeName);
    const layout = ledgerLayout(width);
    const visible = rows.slice(start, start + height);
    const arriving = arrive(tick, arrivalTick);
    // The ledger is the scene's only elastic region: the chrome above and the
    // inspector below have fixed heights, so `flexGrow` here absorbs whatever
    // the viewport actually offers.
    if (visible.length === 0) {
        return (_jsx(Box, { flexDirection: "column", flexGrow: 1, flexShrink: 1, overflow: "hidden", children: _jsx(Text, { color: "subtle", children: "\u2014" }) }));
    }
    return (_jsx(Box, { flexDirection: "column", flexGrow: 1, flexShrink: 1, overflow: "hidden", children: visible.map((node, offset) => {
            const index = start + offset;
            const focused = index === cursor;
            const failed = node.status === 'error' || (node.burst !== undefined && burstErrors(node.burst) > 0);
            const running = node.status === 'running';
            const isNew = index >= arrivalFrom && arriving > 0;
            const duration = node.burst === undefined ? node.durationMs : burstDurationMs(node.burst);
            // ── structural rows are RULES, not rows ────────────────────────────
            //
            // A ledger with five hundred entries needs chapters. Turn and step
            // are the session's own headings, and a heading that looks like a body
            // row makes the whole list read as one undifferentiated stream. Two
            // rule weights give the hierarchy the eye needs: heavy for a turn,
            // hairline for a step, everything else a normal row. It also removes a
            // redundancy — a `STEP` badge next to the label `step 2` said the same
            // thing twice.
            if (node.kind === 'turn' || node.kind === 'step') {
                const isTurn = node.kind === 'turn';
                const right = `${duration === undefined ? '' : formatDuration(duration)}${failed ? ' ✗' : ''}`;
                // A step is a quiet row, not a rule. Steps are frequent — three or
                // four per screen — and a full-width dashed line each drew more
                // attention than the work between them. Only the turn, which is the
                // session's actual chapter break, gets a rule.
                if (!isTurn) {
                    return (_jsxs(Box, { flexDirection: "row", width: "100%", height: 1, flexShrink: 0, gap: 1, children: [_jsx(Box, { flexShrink: 0, children: _jsx(Text, { color: "subtle", children: `${focused ? '▸' : ' '}╵` }) }), _jsx(Box, { flexGrow: 1, flexShrink: 1, overflow: "hidden", children: _jsx(Text, { color: focused ? 'suggestion' : 'subtle', wrap: "truncate", children: node.label }) }), _jsx(Box, { flexShrink: 0, children: _jsx(Text, { color: heatColor(duration), children: costGlyph(duration) }) }), _jsx(Box, { flexShrink: 0, justifyContent: "flex-end", width: 7, children: _jsx(Text, { color: heatColor(duration), children: right }) })] }, `${node.seq}:step`));
                }
                const tone = failed ? 'error' : running ? 'success' : 'inactiveShimmer';
                // Idle before a turn is wall-clock the session spent waiting on the
                // human, and it is invisible everywhere else — every duration only
                // ever accounts for work. Surfacing it here is what makes the clock
                // column add up.
                const previous = rows[index - 1];
                const idle = previous === undefined ? 0 : node.time - (previous.time + (previous.durationMs ?? 0));
                const idleText = idle >= IDLE_FLOOR_MS ? `  ⋯ ${formatDuration(idle)}` : '';
                const head = `${focused ? '▸' : ' '}━━ ${node.label}${idleText} `;
                const fill = Math.max(2, width - stringWidth(head) - stringWidth(right) - 2);
                return (_jsx(Box, { width: "100%", height: 1, flexShrink: 0, children: _jsxs(Text, { color: tone, bold: true, children: [`${focused ? '▸' : ' '}━━ ${node.label}`, _jsx(Text, { color: "subtle", children: idleText }), _jsx(Text, { color: "inactive", children: ` ${'━'.repeat(fill)} ` }), _jsx(Text, { color: failed ? 'error' : heatColor(duration), children: right })] }) }, `${node.seq}:turn`));
            }
            const spineColor = failed ? 'error' : running ? 'success' : node.seed === true ? 'subtle' : 'inactive';
            const badgeBg = KIND_BADGE_BG[node.kind];
            const badge = layout.badge === 6 ? KIND_BADGE[node.kind] : KIND_GLYPH[node.kind];
            // Label and detail share one budget so a long tool name never pushes
            // the duration column off the row.
            const label = node.burst !== undefined ? `${node.label} ×${node.burst.members.length}` : node.label;
            const detailBudget = Math.max(0, layout.detail - label.length - 1);
            const detail = node.detail === undefined ? '' : previewText(node.detail, detailBudget);
            const outcome = layout.outcome && node.outcome !== undefined && node.outcome !== ''
                ? previewText(node.outcome, Math.max(8, Math.floor(layout.detail * 0.3)))
                : '';
            return (_jsxs(Box, { flexDirection: "row", width: "100%", height: 1, flexShrink: 0, gap: 1, children: [_jsx(Box, { flexShrink: 0, children: _jsxs(Text, { color: spineColor, children: [focused ? '▸' : ' ', spineGlyph(rows, index)] }) }), layout.index && (_jsx(Box, { flexShrink: 0, width: 8, children: _jsx(Text, { color: "subtle", children: formatClock(node.time) }) })), _jsx(Box, { flexShrink: 0, children: _jsx(Text, { color: isNew ? mix(theme[KIND_FG[node.kind]], theme.text, arriving) : KIND_FG[node.kind], backgroundColor: badgeBg, bold: true, children: badge }) }), _jsx(Box, { flexGrow: 1, flexShrink: 1, overflow: "hidden", children: _jsxs(Text, { wrap: "truncate", color: focused ? 'suggestion' : node.seed === true ? 'subtle' : undefined, children: [label, detail === '' ? '' : ' ', _jsx(Text, { color: focused ? 'suggestion' : 'inactive', children: detail }), outcome === '' ? '' : _jsx(Text, { color: "subtle", children: `  → ${outcome}` })] }) }), _jsx(Box, { flexShrink: 0, children: _jsx(Text, { color: running ? 'success' : heatColor(duration), children: costGlyph(duration) }) }), _jsx(Box, { flexShrink: 0, justifyContent: "flex-end", width: 7, children: _jsx(Text, { color: running ? 'success' : heatColor(duration), children: running ? '…' : duration === undefined ? '' : formatDuration(duration) }) })] }, `${node.seq}:${node.kind}`));
        }) }));
}
