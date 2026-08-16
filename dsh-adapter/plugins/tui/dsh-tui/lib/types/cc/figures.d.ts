/**
 * UI glyph constants used across the TUI: prompt markers, status badges,
 * direction arrows, media controls, reasoning-effort indicators, and
 * bridge-state symbols.
 *
 * Every constant is a fixed Unicode character, so rendering is identical on
 * all platforms except the activity bullet: macOS gets a heavier ring glyph
 * that matches its default terminal font, everything else gets a solid dot.
 * Escapes are used instead of raw characters so the file stays robust to
 * encoding round-trips; the rendered glyph is shown in each comment.
 */
/** Activity bullet: ring on macOS (`⏺`), solid dot elsewhere (`●`). */
export declare const BLACK_CIRCLE: string;
/** Prompt pointer, a bold right chevron (`❯`). */
export declare const POINTER = "\u276F";
/** Success checkmark (`✓`). */
export declare const TICK = "\u2713";
/** Small dot for separating operators (`∙`). */
export declare const BULLET_OPERATOR = "\u2219";
/** Teardrop asterisk, decorative list marker (`✻`). */
export declare const TEARDROP_ASTERISK = "\u273B";
/** Lightning bolt, "fast / hot" marker (`↯`). */
export declare const LIGHTNING_BOLT = "\u21AF";
/** Up arrow (`↑`). */
export declare const UP_ARROW = "\u2191";
/** Down arrow (`↓`). */
export declare const DOWN_ARROW = "\u2193";
/** Left arrow (`←`), channel indicator. */
export declare const CHANNEL_ARROW = "\u2190";
/** Right arrow (`→`), injected-message indicator. */
export declare const INJECTED_ARROW = "\u2192";
/** Low effort: open circle (`○`). */
export declare const EFFORT_LOW = "\u25CB";
/** Medium effort: half-filled circle (`◐`). */
export declare const EFFORT_MEDIUM = "\u25D0";
/** High effort: filled circle (`●`). */
export declare const EFFORT_HIGH = "\u25CF";
/** Maximum effort: bullseye (`◉`). */
export declare const EFFORT_MAX = "\u25C9";
/** Play control (`▶`). */
export declare const PLAY_ICON = "\u25B6";
/** Pause control (`⏸`). */
export declare const PAUSE_ICON = "\u23F8";
/** Refresh arrow (`↻`), MCP subscription indicator. */
export declare const REFRESH_ARROW = "\u21BB";
/** Fork glyph (`⑂`), fork indicator. */
export declare const FORK_GLYPH = "\u2442";
/** Open diamond (`◇`), review status indicator. */
export declare const DIAMOND_OPEN = "\u25C7";
/** Filled diamond (`◆`), review status indicator. */
export declare const DIAMOND_FILLED = "\u25C6";
/** Reference mark (`※`), reference indicator. */
export declare const REFERENCE_MARK = "\u203B";
/** Flag icon (`⚑`), issue indicator. */
export declare const FLAG_ICON = "\u2691";
/** Blockquote bar (`▎`), left one-quarter block. */
export declare const BLOCKQUOTE_BAR = "\u258E";
/** Heavy horizontal rule (`━`). */
export declare const HEAVY_HORIZONTAL = "\u2501";
/** Bridge spinner frames: `·|·` → `·/·` → `·—·` → `·\·`. */
export declare const BRIDGE_SPINNER_FRAMES: string[];
/** Bridge ready indicator (`·✔︎·`). */
export declare const BRIDGE_READY_INDICATOR = "\u00B7\u2714\uFE0E\u00B7";
/** Bridge failed indicator (`×`). */
export declare const BRIDGE_FAILED_INDICATOR = "\u00D7";
//# sourceMappingURL=figures.d.ts.map