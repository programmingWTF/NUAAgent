import React from 'react';
import type { InspectDetail } from '../../dsh-adapter/trajectory/index.js';
import type { TrajNode } from '../../dsh-adapter/types.js';
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
export declare function Inspector({ node, detail, height, width, expanded, scroll, }: {
    node: TrajNode | undefined;
    detail: InspectDetail | undefined;
    /** Rows this pane occupies, borders included. Never varies with content. */
    height: number;
    width: number;
    /** True when `Enter` has promoted the pane to a full-height reading page. */
    expanded: boolean;
    /** First body line to show, for paging an expanded pane. */
    scroll: number;
}): React.ReactNode;
//# sourceMappingURL=Inspector.d.ts.map