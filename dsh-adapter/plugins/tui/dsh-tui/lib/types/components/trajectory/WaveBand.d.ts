import React from 'react';
import type { WaveBand as Band } from '../../dsh-adapter/types.js';
export declare function WaveBand({ band, width, cursorColumn, viewportStart, viewportEnd, matches, tick, alertTick, }: {
    band: Band;
    /** Rendered width in cells; equals `band.buckets.length`. */
    width: number;
    /** Column the ledger cursor currently sits in. */
    cursorColumn: number;
    /** First and last column covered by the visible ledger window. */
    viewportStart: number;
    viewportEnd: number;
    /**
     * Columns containing a query match, or `undefined` when no query is active.
     * Non-matching columns drop to grey so the match distribution across the
     * whole session is visible at a glance; the silhouette never changes.
     */
    matches?: ReadonlySet<number>;
    /** Scene clock tick. */
    tick: number;
    /** Tick the most recent alert was triggered on. */
    alertTick: number;
}): React.ReactNode;
/**
 * Convert a theme colour to the `#rrggbb` form chalk needs.
 *
 * Theme values are `rgb(r,g,b)` strings; a custom theme may instead carry an
 * ANSI name, which cannot be blended — those fall back to a neutral grey
 * rather than crashing chalk's hex parser.
 */
declare function toHex(colour: string): string;
/** Shared by the scene so every chalk colour goes through one conversion. */
export { toHex as waveHex };
//# sourceMappingURL=WaveBand.d.ts.map