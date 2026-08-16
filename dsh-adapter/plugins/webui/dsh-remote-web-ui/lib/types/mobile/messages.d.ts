/**
 * Message fold: collapse a session event stream into a renderable, ordered
 * message list for the mobile surface.
 *
 * The mobile page is an independent, self-contained bundle, so this module has
 * no value imports: it re-declares a local `WireEvent` (a loose envelope with a
 * typed `type` and a wide `data`) and folds it into {@link RenderMessage} rows.
 * It is a pure, side-effect-free fold — callers hold the rendered list and feed
 * the next batch of events in to get the next list. Caller-supplied `existing`
 * messages are never mutated: every change builds a fresh message object.
 *
 * The data shapes follow the host session protocol (see the dsh session
 * `types.ts` / `surface.ts` and the llm `types.ts` sources the reference audit
 * read):
 *
 * - `user/message`      data = `{ id, role, content: ContentBlock[], source }`
 * - `assistant/message` data = `{ turn, step, message: { id, content }, usage? }`
 * - `assistant/chunk`   data = `{ turn, step, chunk: { type: 'text-delta' | 'reasoning-delta', text } }`
 * - `turn/start`        data = `{ turn }`
 * - `turn/end`          data = `{ turn, reason: { kind: 'error' | ... } }`
 * - `tool/call`         data = `{ turn, step, callId, name, arguments }`
 * - `session/end-seed`  empty data (skipped)
 *
 * Assistant content blocks (`text` vs `reasoning`) fold into two separate
 * fields — `text` and `reasoning` — so the surface can show reasoning behind
 * a collapsed disclosure instead of dumping it into the message body. Tool
 * calls accumulate ordered details (`tools`) in addition to the plain
 * `toolSummary` name list.
 *
 * The mobile message-level aliases `message/chunk`, `message/update` and
 * `message/delete` are also accepted (assumed shapes documented below).
 *
 * Design notes:
 * - Events are applied in ascending `seq` order.
 * - A `seq` watermark is derived from `existing` (the max already-rendered
 *   message seq). Events whose seq is already at or below the watermark are
 *   skipped, which makes re-applying the same batch idempotent without
 *   double-folding streamed chunk text.
 * - Create events additionally dedupe by message id, so a repeated
 *   `user/message` / `assistant/message` replaces in place instead of duplicating.
 * - A pending assistant message (alive while `assistant/chunk`-style deltas
 *   keep arriving, `pending: true`) is finalized by the matching
 *   `assistant/message` (same id or `(turn, step)`) or closed by `turn/end`.
 */
export interface RenderMessage {
    /** Stable message identity — the wire id when present, else the event seq. */
    readonly id: string;
    readonly kind: 'user' | 'assistant';
    /** The fully folded text (assistant chunks aggregate into their message). */
    readonly text: string;
    /**
     * Folded reasoning text, kept separate from `text` so the surface can
     * hide it behind a collapsed Think disclosure (web-UI parity).
     */
    readonly reasoning?: string;
    /**
     * Ordered tool calls of this assistant message, in first-seen order,
     * driving the collapsible tool disclosure (name + raw arguments).
     */
    readonly tools?: ToolCallInfo[];
    /** Seq of the latest event that touched this message (used for loadOlder). */
    readonly seq: number;
    /** Epoch ms of the latest touch. */
    readonly time: number;
    /** True while an assistant message is still receiving chunks (not yet closed). */
    readonly pending?: boolean;
    /** Plain-text tool call summary for this assistant message, e.g. "使用 bash / read". */
    readonly toolSummary?: string;
    /** Set when the owning turn ended in an error. */
    readonly failed?: boolean;
    /**
     * Token usage reported by the final assistant event. cacheReadTokens and
     * cacheWriteTokens are only attached when the wire carried finite values.
     */
    readonly usage?: {
        inputTokens: number;
        outputTokens: number;
        cacheReadTokens?: number;
        cacheWriteTokens?: number;
    };
    /** Context window for the model that produced this message (from request/context). */
    readonly contextWindow?: number;
    /** Wire source.kind of a user message (e.g. plugin or user). */
    readonly sourceKind?: string;
}
/** One tool call attached to an assistant message (callId dedupes repeats). */
export interface ToolCallInfo {
    /** Tool-call id (synthetic `${name}#${seq}` when the wire omitted it). */
    readonly callId: string;
    /** Tool name, e.g. "bash". */
    readonly name: string;
    /** Raw arguments JSON, when the event carried it. */
    readonly arguments?: string;
}
/**
 * The session event envelope as the mobile fold sees it. `data` is kept wide
 * (unknown) so the fold reads fields defensively; `surfaceOp` / `sourceEventSeqs`
 * are envelope metadata unrelated to message rendering and are ignored here.
 */
export interface WireEvent {
    readonly type: string;
    readonly seq: number;
    readonly time: number;
    readonly data: unknown;
    readonly sourceEventSeqs?: number[];
    readonly surfaceOp?: unknown;
    readonly ignorable?: true;
}
/**
 * Fold a batch of session events into a renderable message list.
 *
 * @param events - events to apply, in any order (folded by ascending seq).
 * @param existing - the previously rendered list (live-stream incremental tail).
 * @returns messages sorted by seq.
 */
export declare function foldEvents(events: readonly WireEvent[], existing?: readonly RenderMessage[]): RenderMessage[];
//# sourceMappingURL=messages.d.ts.map