/**
 * working-activity — a live "working line" for DeepSeek Harness agents.
 *
 * Folds the durable session stream (turn/step/tool/stream events) plus
 * `agent/status` into a playful real-time status line, then publishes it two
 * ways, both optional:
 *
 * - TUI: registers the `${activity}` prompt slot on `ctx.tuiPrompt` when the
 *   TUI is composed; add `${activity}` to `theme.leftPrompt` to see it.
 * - Session log: appends log-only `activity/status` events (never surface
 *   events) for Web and other UI consumers; replay ignores them.
 *
 * The state machine itself lives in `./status.ts` (pure, clock-injected); this
 * module only wires events, the render tick, and the two sinks.
 * @module @nuaagent/working-activity
 */
import type { Context } from '@nuaagent/cordis';
export type * from './events.js';
export declare const name = "working-activity";
/** Configurable knobs; every key has a sane default. */
export type Config = {
    /** Playful copy pool; false renders plain functional labels. */
    phrases?: boolean;
    /** Append `activity/status` session events for UI consumers. Default OFF:
     *  dsh-session's append() cannot mark events ignorable, and the resume
     *  read path refuses logs containing unknown non-ignorable types — every
     *  appended snapshot makes the whole session unresumable. Re-enable only
     *  for a log-replaying consumer on a harness that supports ignorable
     *  appends. The live status line (prompt slot / session events) is
     *  unaffected by this flag. */
    publish?: boolean;
    /** Status render tick interval in ms. */
    tickMs?: number;
    /** Minimum interval in ms between published events while the line is stable. */
    publishIntervalMs?: number;
    /** Maximum displayed detail length (paths/commands/patterns). */
    detailLimit?: number;
    /** Exact tool-name → action-copy pools (case-insensitive match). */
    customActions?: Record<string, string[]>;
    /** Inject the `⏵` self-narration contract into the system prompt and surface it. */
    narrate?: boolean;
};
export declare const Config: Schemastery<Config>;
/**
 * Wire the working-activity plugin.
 * @param ctx - Cordis context (agent loop + session services composed).
 * @param config - Validated plugin config (schema defaults applied).
 */
export declare function apply(ctx: Context, config?: Config): void;
//# sourceMappingURL=index.d.ts.map