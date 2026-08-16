/**
 * Trajectory motion — five verbs, one shared clock, one hard rule.
 *
 * ## The rule: SGR-only
 *
 * The renderer diffs frames cell by cell and emits the smallest patch that
 * reconciles them. A cell whose *style* changed costs a few bytes of SGR; a
 * row whose *layout* changed costs a full row rewrite, and in inline mode a
 * frame that got shorter takes the full-reset path that once deposited a copy
 * of the whole UI into scrollback on every repaint (issues #38/#39/#19/#10).
 *
 * So every verb below animates colour and colour only. Nothing here changes a
 * glyph count, a row count, or a box dimension. `verify-trace-motion` asserts
 * this mechanically by capturing the write stream across a hundred ticks and
 * failing on any row-level escape — the rule is machine-enforced, not a
 * convention someone has to remember.
 *
 * ## The verbs
 *
 * | verb        | shape                      | used for                        |
 * |-------------|----------------------------|---------------------------------|
 * | `arrive`    | one bright frame, settle   | a row or wave column just landed |
 * | `reproject` | dim → bright, two frames   | the same data, re-sorted/filtered |
 * | `alert`     | two flashes, then steady   | an error, a retry, a pending ask |
 * | `alive`     | slow breath, loops         | the running edge (1–2 cells max) |
 * | `navigate`  | *nothing*                  | cursor, viewport, inspector      |
 *
 * `navigate` having no animation is a decision, not an omission: easing on a
 * cursor is latency you can feel, and key auto-repeat already supplies the
 * sense of continuity.
 *
 * ## Cost
 *
 * No timer is created here. The scene subscribes once to the Ink core's
 * shared animation clock, which already pauses when the terminal loses focus
 * or the view scrolls offscreen — so an idle session animates nothing.
 */
import { type RGBColor } from '../components/Spinner/spinnerUtils.js';
import type { Color } from '../ink/styles.js';
/** Scene clock period. One tick drives every verb below. */
export declare const MOTION_TICK_MS = 100;
/** Ticks a one-shot verb runs for before settling. */
export declare const MOTION_SPANS: {
    readonly arrive: 2;
    readonly reproject: 3;
    /** Two flashes: bright, dim, bright, dim, then steady. */
    readonly alert: 8;
};
/** Format an RGB triple the way the theme and `<Text color>` expect. */
export declare function rgbString(color: RGBColor): Color;
/**
 * Blend two colours, accepting either theme values (`rgb(r,g,b)`) or hex.
 *
 * @param base - Colour at `t = 0`.
 * @param highlight - Colour at `t = 1`.
 * @param t - Blend position, clamped into [0, 1].
 * @returns A colour string `<Text color>` accepts, or `base` when either
 *   input could not be parsed (a custom theme may carry an ANSI name).
 */
export declare function mix(base: string, highlight: string, t: number): Color;
/**
 * The `alive` verb: a triangular breath in [0, 1], synchronized across every
 * caller because they all read the same clock.
 *
 * @param tick - Current scene tick.
 * @returns Blend position for {@link mix}.
 */
export declare function alive(tick: number): number;
/**
 * The `arrive` verb: one bright frame, then settle.
 *
 * @returns Blend position, or 0 once settled.
 */
export declare function arrive(tick: number, startTick: number): number;
/**
 * The `reproject` verb: the view dims, then comes back up. Used when the same
 * rows are re-ordered or re-filtered, so the eye is told "this is the same
 * data, rearranged" rather than "this is a new screen".
 *
 * @returns Dim factor in [0, 1] where 1 is fully dimmed, 0 fully settled.
 */
export declare function reproject(tick: number, startTick: number): number;
/**
 * The `alert` verb: two flashes, then steady. Deliberately one-shot — a
 * looping alarm is noise, and an error that keeps blinking after you have
 * seen it trains you to ignore it.
 *
 * @returns Blend position toward the highlight, or 0 once steady.
 */
export declare function alert(tick: number, startTick: number): number;
/**
 * Colour for a running cell (the `alive` verb applied to a theme pair).
 *
 * @param tick - Current scene tick.
 * @param base - Settled colour.
 * @param highlight - Peak-of-breath colour.
 */
export declare function aliveColor(tick: number, base: string, highlight: string): Color;
//# sourceMappingURL=motion.d.ts.map