/**
 * Trajectory projection — folding the session event log into ledger nodes.
 *
 * ## What this is
 *
 * The DSH session log is an append-only stream of ~44 event types. This
 * module folds it into the flat, turn-annotated node list the trajectory
 * scene renders, pairing every bracket (`tool/call` ↔ `tool/result`,
 * `step/start` ↔ `step/end`, `llm/retry` ↔ `llm/retry-started`,
 * `approval/asked` ↔ `approval/decided`, `compaction/start` ↔
 * `compaction/end`, `tool/code-dispatch-start` ↔ `tool/code-dispatch`) so a
 * row can show its own wall-clock duration and outcome.
 *
 * ## Incrementality
 *
 * `agent.session.events` is an immutable snapshot whose element objects are
 * frozen at append and REUSED until the next append. {@link extendTrajectory}
 * exploits exactly that: when the incoming snapshot prefix-extends the one the
 * previous build consumed — proven by *object identity* at the previous last
 * index, never by `seq` arithmetic, which a fork can rewind — only the new
 * tail is folded. Any other relationship (agent swap on `/resume`, `/rewind`,
 * `/new`) rebuilds from scratch. A long session therefore never pays an O(n)
 * refold per frame, and `verify-trace-projection` asserts that the incremental
 * and from-scratch results are field-for-field identical at every split point.
 *
 * ## What it deliberately does not do
 *
 * No node holds derived text. `detail`/`outcome` are references into strings
 * the log already owns, and the view flattens only the rows it paints (see
 * {@link previewText}). Full content is not held at all — `seq`/`endSeq`
 * address the owning events for the inspector to re-read on demand.
 *
 * Storage-level chunk packing (`text-chunks`, `reasoning-chunks`,
 * `tool-call-chunks`) is a durable *encoding*, not an event vocabulary: the
 * persistence reader expands those rows back into `assistant/chunk` events
 * before they reach `Session.events`, so this fold only ever sees the
 * expanded form.
 */
import { type RawTrajEvent } from './guards.js';
import { type TrajNode } from './types.js';
import type { SessionEvent } from '@nuaagent/session';
/** Per-step streaming timestamps, the source of TTFT and decode duration. */
export interface StepTiming {
    /** `step/start` time. */
    readonly startTime: number;
    /** First `assistant/chunk` time — the model's first observable output. */
    firstChunk?: number;
    /** Last `assistant/chunk` time. */
    lastChunk?: number;
    /** `step/end` time, when the step closed. */
    endTime?: number;
}
/**
 * One assembled projection. Carries everything a continuation needs, so an
 * append folds only its tail; treat every field as owned by this module.
 */
export interface TrajBuild {
    /** The snapshot this build consumed; identity-compared on the next append. */
    readonly source: readonly RawTrajEvent[];
    /** The ledger, in log order, after burst folding. */
    readonly nodes: TrajNode[];
    /** Per-step timing keyed `${turn}:${step}`, for the hotspot aggregate. */
    readonly timing: Map<string, StepTiming>;
    /**
     * Running counters, maintained O(1) per event.
     *
     * The status-line badge needs "how many rows, how many failed" on every
     * chat frame; deriving that with a scan would make an idle conversation pay
     * O(session) per repaint, which is exactly the cost the incremental fold
     * exists to avoid.
     */
    readonly counts: TrajCounts;
    /** Open brackets and fold state; internal, but reused across appends. */
    readonly state: FoldState;
}
/** Cheap session counters the chat chrome reads every frame. */
export interface TrajCounts {
    /** Ledger rows, after burst folding. */
    rows: number;
    /** Rows that ended in failure, plus retry sequences. */
    errors: number;
    /** Retry attempts across the session. */
    retries: number;
}
/** Mutable fold bookkeeping carried between incremental appends. */
interface FoldState {
    counts: TrajCounts;
    tools: Map<string, TrajNode>;
    subtools: Map<string, TrajNode>;
    steps: Map<string, TrajNode>;
    turns: Map<number, TrajNode>;
    retries: Map<string, TrajNode>;
    approvals: Map<string, TrajNode>;
    hooks: Map<string, TrajNode>;
    /** Compaction brackets carry no observed id — a stack pairs them by nesting. */
    compactions: TrajNode[];
    /** Live turn context for events that carry none. */
    turn: number;
    /** Live step context; cleared at `step/end`. */
    step: number | undefined;
    /** True until the first `session/end-seed`; marks replayed history. */
    seeding: boolean;
    /** `${kind}:${name}` of the run being folded, or undefined. */
    runKey: string | undefined;
    /** Length of the current run. */
    runCount: number;
    /** Index in `nodes` of the run's first row (or its burst stand-in). */
    runStart: number;
    /** Members of the run, kept so the burst node can adopt them. */
    runMembers: TrajNode[];
}
/** An empty build, used as the identity element and for empty sessions. */
export declare function emptyTrajectory(): TrajBuild;
/**
 * Extend a previous projection with the session's current event snapshot.
 *
 * @param previous - The prior build, or `null` to fold from scratch.
 * @param events - The session's current immutable event snapshot.
 * @returns A build over `events`; `previous` itself when nothing was appended.
 */
export declare function extendTrajectory(previous: TrajBuild | null, events: readonly SessionEvent[]): TrajBuild;
/**
 * Fold from scratch — the one-shot form used by tests and by consumers that
 * hold no previous build.
 */
export declare function buildTrajectory(events: readonly SessionEvent[]): TrajBuild;
export {};
//# sourceMappingURL=projection.d.ts.map