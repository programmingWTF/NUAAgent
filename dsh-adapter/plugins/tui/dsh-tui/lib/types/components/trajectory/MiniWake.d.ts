import React from 'react';
import type { WaveBand } from '../../dsh-adapter/types.js';
/**
 * Column budget for the mini wake at a given terminal width.
 *
 * It is the first thing to go on a narrow terminal: the status line's own
 * fields (model, tps, branch, cwd) are what a user reads constantly, and a
 * decoration that squeezes them is a decoration that has overstayed.
 *
 * @param columns - Terminal width in cells.
 * @returns Glyph count, or 0 when the strip should not render at all.
 */
export declare function miniWakeWidth(columns: number): number;
export declare function MiniWake({ band, hint, tick, }: {
    /** The session projected onto {@link miniWakeWidth} columns. */
    band: WaveBand;
    /**
     * Key hint shown once beside the strip, until the trajectory has been
     * opened for the first time. Absent afterwards.
     */
    hint?: string;
    tick: number;
}): React.ReactNode;
//# sourceMappingURL=MiniWake.d.ts.map