/**
 * Copy pools for the working-activity status line: short, colloquial, playful
 * Chinese fragments with deadpan English one-liners mixed in, matching the
 * pi-working-activity tone. Everything here is pure data + pure pickers.
 * @module @nuaagent/working-activity/phrases
 */
/** A pool of copy fragments. */
export type PhrasePool = readonly string[];
/** Pick one random entry; repeated draws avoid the previous entry when possible. */
export declare function pickPhrase(entries: PhrasePool, previous?: string): string;
/** Thinking phrases while the model works without a tool. */
export declare const THINKING_PHRASES: readonly string[];
/** Tiered phrases when thinking runs long (elapsed >= threshold). */
export declare const THINKING_TIERS: readonly {
    /** Minimum thinking ms for this tier. */
    readonly atMs: number;
    readonly pool: readonly string[];
}[];
/** Phrases shown while waiting for the first streamed token. */
export declare const WAITING_PHRASES: readonly string[];
/** Tool-name patterns mapped to playful action verbs. */
export declare const ACTION_MAP: readonly {
    readonly test: RegExp;
    readonly actions: readonly string[];
}[];
/** Fallback verbs for unknown tools. */
export declare const FALLBACK_ACTIONS: readonly string[];
/** Tool failure phrases, replacing a bare ✗. */
export declare const FAIL_PHRASES: readonly string[];
/** Turn-completion phrases. */
export declare const DONE_PHRASES: readonly string[];
/** Night-owl phrases mixed in between 00:00 and 06:00 local time. */
export declare const NIGHT_PHRASES: readonly string[];
/** Common git tool names / bash commands containing `git `. */
export declare const GIT_TOOL_RE: RegExp;
/** Detect the 00:00–06:00 night window (local time). */
export declare function isNight(hour: number): boolean;
/**
 * Pick a thinking phrase appropriate for the elapsed thinking time.
 * @param elapsedMs - Milliseconds spent thinking in the current phase.
 * @param previous - Previously shown phrase, to avoid repeats.
 * @param night - Mix night-owl copy into the pool.
 */
export declare function thinkingPhrase(elapsedMs: number, previous?: string, night?: boolean): string;
/**
 * Map a tool name to a playful action verb.
 * @param toolName - Registry tool name (unqualified).
 * @param custom - Exact-name custom action pools, matched case-insensitively.
 */
export declare function actionFor(toolName: string, custom?: Readonly<Record<string, readonly string[]>>): string;
/** Whether a tool is a git operation (name match, or a shell command containing `git `). */
export declare function isGitTool(toolName: string, args?: Readonly<Record<string, unknown>>): boolean;
/** Format milliseconds as a compact human duration (`1m23s`). */
export declare function fmtDuration(ms: number): string;
//# sourceMappingURL=phrases.d.ts.map