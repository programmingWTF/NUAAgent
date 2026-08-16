/**
 * Trajectory formatting — durations, clocks, badges and heat.
 *
 * Presentation only, and deliberately in the UI layer rather than beside the
 * projection: these decisions are about a terminal's width and palette, not
 * about what the session log means.
 */
import type { Theme } from '../theme.js';
import type { TrajKind } from '../dsh-adapter/types.js';
/**
 * Truncate to a terminal DISPLAY width, CJK-aware (a wide char costs two
 * columns). Used where the caller must control the cut precisely: Ink's own
 * `wrap="truncate"` appends its ellipsis as soon as the content is as wide as
 * its box rather than wider, which silently eats the last character of a
 * right-aligned group that was laid out at exactly its natural width.
 *
 * @param text - Plain text (no ANSI).
 * @param maxWidth - Column budget, ellipsis included.
 * @returns `text` unchanged when it fits, otherwise a cut ending in `…`.
 */
export declare function truncateWidth(text: string, maxWidth: number): string;
/** `HH:MM:SS` local wall-clock of an epoch-ms timestamp. */
export declare function formatClock(time: number): string;
/**
 * Compact duration: `82ms` / `1.4s` / `2m05s` / `1h04m`.
 *
 * Every form is at most six columns wide, so the ledger's duration column
 * never reflows when a fast call is followed by a slow one.
 */
export declare function formatDuration(ms: number): string;
/** Compact token count: `840` / `12.4k` / `1.1M`. */
export declare function formatTokens(count: number): string;
/**
 * Heat colour for a duration cell.
 *
 * The point of the ledger is usually to find the slow thing, so the duration
 * column encodes magnitude as colour: anything under a second recedes, tens
 * of seconds warn, minutes shout. Reading a column of numbers is work; seeing
 * one red cell is not.
 */
export declare function heatColor(ms: number | undefined): keyof Theme;
/**
 * Cost glyph for a row's own duration — an ABSOLUTE, learnable scale.
 *
 * A relative scale (tallest row in view = full block) would re-teach itself on
 * every scroll; fixed thresholds mean `█` always says "over a minute" and `▁`
 * always says "instant", so after one session the column is read without
 * looking at the number beside it. Each step is roughly half an order of
 * magnitude, which is the resolution a human actually acts on.
 */
export declare function costGlyph(ms: number | undefined): string;
/**
 * Fixed-width badge text per row kind — six columns, including one cell of
 * padding on each side.
 *
 * The padding is what turns a coloured word into a pill. Background colour
 * flush against the glyphs reads as a highlighter smudge; a cell of ground on
 * either side reads as a chip, and chips are what let the eye group forty rows
 * by kind without reading any of them.
 */
export declare const KIND_BADGE: Record<TrajKind, string>;
/** One-character badge for the narrowest layout tier. */
export declare const KIND_GLYPH: Record<TrajKind, string>;
/**
 * Badge foreground per kind. Backgrounds come from {@link KIND_BADGE_BG} — the
 * pair reads as a pill, which carries far better in a dense ledger than
 * coloured text alone.
 */
export declare const KIND_FG: Record<TrajKind, keyof Theme>;
/**
 * Badge background per kind, or `undefined` for kinds that read better
 * unfilled (structural rows, which should recede behind the work rows).
 */
export declare const KIND_BADGE_BG: Partial<Record<TrajKind, keyof Theme>>;
/**
 * Ledger column budget at a given terminal width.
 *
 * Columns are dropped whole rather than letting a row wrap: a wrapped ledger
 * row destroys the alignment that makes the whole view scannable, so at every
 * tier the row is still exactly one line.
 */
export interface LedgerLayout {
    /** Width of the badge column: 6 (padded pill), 1 (bare glyph). */
    readonly badge: 6 | 1;
    /** Show the `#N` index column. */
    readonly index: boolean;
    /** Show the `→ result` preview. */
    readonly outcome: boolean;
    /** Characters available to the label + detail preview. */
    readonly detail: number;
}
/**
 * Resolve the column budget for one terminal width.
 *
 * @param columns - Terminal width in cells.
 * @returns The tier's budget; `detail` is never below 12 so the label itself
 *   survives even on a pathologically narrow terminal.
 */
export declare function ledgerLayout(columns: number): LedgerLayout;
//# sourceMappingURL=format.d.ts.map