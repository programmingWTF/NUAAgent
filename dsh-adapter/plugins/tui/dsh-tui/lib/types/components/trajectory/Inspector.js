import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from '../../ui.js';
import { formatDuration } from '../../trajectory/format.js';
/**
 * The inspector — full detail for the focused row, in a fixed-height slot.
 *
 * Two properties matter more than what it shows:
 *
 * **It follows the cursor with no keystroke.** Moving down updates it; there
 * is no "open" step. That is one decision removed from the most common action
 * in the view, and it is the reason a run of rows can be triaged by holding
 * ↓ rather than by opening and closing each one.
 *
 * **Its height never changes.** A pane that grew with its content would resize
 * the frame on every cursor move — the exact motion that takes inline
 * rendering down the shrink-frame path. Fixed geometry means moving the cursor
 * emits style bytes and nothing else. `Enter` opens the same content as a
 * full-height page, which is a deliberate, once-per-inspection resize.
 */
export function Inspector({ node, detail, height, width, expanded, scroll, }) {
    const bodyHeight = Math.max(1, height - 1);
    if (node === undefined || detail === undefined) {
        return (_jsx(Box, { flexDirection: "column", height: height, flexShrink: 0, children: _jsx(Text, { color: "subtle", children: "\u2014" }) }));
    }
    // Flatten every section into display lines up front, so paging and
    // clipping operate on one uniform list.
    const lines = [];
    for (const section of detail.sections) {
        // A lone section whose heading repeats the pane title (a message row's
        // `assistant` under `assistant`) spends a line saying nothing.
        const redundant = detail.sections.length === 1 && section.title.toLowerCase() === detail.title.toLowerCase();
        if (!redundant)
            lines.push({ text: section.title, tone: section.tone, head: true });
        for (const raw of section.body.split('\n')) {
            // Tabs would break column alignment inside the pane.
            lines.push({ text: raw.replace(/\t/g, '  '), tone: section.tone });
        }
    }
    // The pane always paints exactly `height` rows: one header plus bodyHeight
    // body rows, the last of which becomes the overflow marker when content
    // runs past the slot, and blank padding when it does not. Anything that
    // varied the row count here would resize the frame on every cursor move.
    const overflow = lines.length - scroll > bodyHeight;
    const visibleCount = overflow ? bodyHeight - 1 : bodyHeight;
    const clipped = lines.slice(scroll, scroll + visibleCount);
    const hidden = lines.length - scroll - visibleCount;
    const body = Array.from({ length: bodyHeight }, (_, index) => clipped[index] ?? null);
    const status = node.status === 'error' ? 'error' : node.status === 'running' ? 'success' : 'inactive';
    return (_jsxs(Box, { flexDirection: "column", height: height, flexShrink: 0, children: [_jsxs(Box, { flexDirection: "row", gap: 1, width: "100%", children: [_jsxs(Text, { color: status, bold: true, children: ['▎', detail.title] }), _jsx(Box, { flexGrow: 1, flexShrink: 1, overflow: "hidden", children: _jsx(Text, { wrap: "truncate", color: "subtle", children: detail.facts.join(' · ') }) }), _jsx(Box, { flexShrink: 0, children: _jsx(Text, { color: status, children: node.durationMs === undefined ? '' : formatDuration(node.durationMs) }) })] }), body.map((line, index) => {
                const isMarker = overflow && index === bodyHeight - 1;
                if (isMarker) {
                    return (_jsx(Box, { width: "100%", overflow: "hidden", children: _jsx(Text, { color: "subtle", wrap: "truncate", children: `    …${hidden} more · ${expanded ? 'j/k' : 'enter'}` }) }, "more"));
                }
                if (line === null) {
                    return (_jsx(Box, { width: "100%", children: _jsx(Text, { children: " " }) }, index));
                }
                return (_jsx(Box, { width: "100%", overflow: "hidden", children: _jsx(Text, { wrap: "truncate", bold: line.head, color: line.head
                            ? line.tone === 'error'
                                ? 'error'
                                : 'permission'
                            : line.tone === 'error'
                                ? 'error'
                                : line.tone === 'dim'
                                    ? 'subtle'
                                    : 'inactiveShimmer', children: line.head ? `  ${line.text}` : `    ${line.text.slice(0, Math.max(0, width - 6))}` }) }, index));
            })] }));
}
