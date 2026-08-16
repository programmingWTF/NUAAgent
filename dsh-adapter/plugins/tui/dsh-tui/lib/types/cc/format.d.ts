/**
 * Number, token-count, and duration formatters shared by the status line
 * and message rows.
 *
 * All number output uses the `en` locale with at most one fraction digit.
 * Values at or above 1000 switch to compact notation (e.g. `1.5K`), which
 * callers receive lowercased as `1.5k` for a calmer status-line look.
 */
/**
 * Format a number for display, switching to compact notation at 1000.
 * @param number - The value to format.
 * @returns The formatted number, lowercased (e.g. `1.2k`, `1.5m`).
 */
export declare function formatNumber(number: number): string;
/**
 * Format a token count for display.
 * Compact values that round to an even unit (e.g. `1.0k`) drop the
 * trailing zero so the status line reads `1k` instead of `1.0k`.
 * @param count - The token count to format.
 * @returns The formatted count (e.g. `988`, `3.4k`, `1k`).
 */
export declare function formatTokens(count: number): string;
/**
 * Format a duration in milliseconds as a compact `h`/`m`/`s` string
 * (e.g. `12s`, `3m 4s`, `1h 2m`).
 * Negative durations are clamped to zero; a zero duration renders as `0s`.
 * @param durationMs - Duration in milliseconds.
 * @param options - `mostSignificantOnly` stops at the first non-zero unit
 *                  (e.g. `1h`, `3m`) instead of emitting every unit.
 * @returns The space-joined duration string.
 */
export declare function formatDuration(durationMs: number, options?: {
    mostSignificantOnly?: boolean;
}): string;
//# sourceMappingURL=format.d.ts.map