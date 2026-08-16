/**
 * Structural guards for the session events the trajectory projection reads.
 *
 * ## Why guards instead of the declared types
 *
 * `SessionEventMap` declares twelve core event types. Everything else in the
 * 44-name `KNOWN_SESSION_EVENT_TYPES` vocabulary arrives through *module
 * augmentation* from the plugin that owns it — `llm/retry` from the LLM
 * layer, `hook/*` from the hook runner, `tool/code-dispatch*` from the code
 * runtime. Those declaration packages are not all in this bundle's dependency
 * graph, so `event.type === 'llm/retry'` does not even type-check here: the
 * literal is not a member of the union TypeScript can see.
 *
 * The answer is the one the adapter boundary already prescribes for upstream
 * coupling — widen once, at a single auditable point ({@link asRawEvents}),
 * then validate shapes at runtime. Every guard below is a *total function*:
 * a payload that does not match returns `undefined` and the fold skips that
 * event. An upstream release that renames a field degrades the trajectory by
 * one row kind; it never throws inside a render.
 *
 * ## Why these exact shapes
 *
 * Each guard was written against payloads decoded out of real session logs
 * (39 sessions, 96,836 events) rather than from documentation, and the
 * corresponding fixture in `verify-trace-projection.mjs` reproduces the same
 * shape. Where a field was absent from every observed sample it is optional
 * here, so a future harness that starts emitting it is picked up for free.
 */
/**
 * The single widening point for the whole trajectory feature.
 *
 * `SessionEvent`'s `type` is a union of the *locally declared* event names;
 * the projection must also reason about augmented names it cannot see in the
 * type graph. Widening the array element to {@link RawTrajEvent} keeps every
 * field the projection reads (envelope) while forcing `data` through the
 * guards below. The cast is structural-only — no property is added, removed,
 * or reinterpreted — and it is the one place a reviewer must check.
 *
 * @param events - The session's immutable event snapshot.
 * @returns The same array, typed for guard-mediated access.
 */
export function asRawEvents(events) {
    return events;
}
/** True for a non-null object — the precondition of every guard below. */
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
/** Read a string property, or `undefined` when absent or the wrong type. */
function str(source, key) {
    const value = source[key];
    return typeof value === 'string' ? value : undefined;
}
/** Read a finite number property, or `undefined` when absent or non-finite. */
function num(source, key) {
    const value = source[key];
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
/** Narrow an `llm/retry` payload; `undefined` when the shape does not match. */
export function readRetry(data) {
    if (!isRecord(data))
        return undefined;
    const retryId = str(data, 'retryId');
    const retry = num(data, 'retry');
    const delayMs = num(data, 'delayMs');
    if (retryId === undefined || retry === undefined || delayMs === undefined)
        return undefined;
    const failure = isRecord(data.failure) ? data.failure : undefined;
    return {
        retryId,
        turn: num(data, 'turn'),
        step: num(data, 'step'),
        provider: str(data, 'provider'),
        retry,
        maxRetries: num(data, 'maxRetries'),
        delayMs,
        code: failure === undefined ? undefined : str(failure, 'code'),
        message: failure === undefined ? undefined : str(failure, 'message'),
    };
}
/** The `retryId` of an `llm/retry-started`, used to close the retry bracket. */
export function readRetryStarted(data) {
    return isRecord(data) ? str(data, 'retryId') : undefined;
}
/** Narrow a `tool/code-dispatch*` payload. */
export function readDispatch(data) {
    if (!isRecord(data))
        return undefined;
    const subCallId = str(data, 'subCallId');
    const name = str(data, 'name');
    if (subCallId === undefined || name === undefined)
        return undefined;
    const rawArgs = data.arguments;
    let args;
    if (typeof rawArgs === 'string')
        args = rawArgs;
    else if (rawArgs !== undefined) {
        // Structured arguments: a bounded stringify. JSON.stringify throws on
        // circular references, which a JSON-validated log cannot contain — but
        // the guard contract is "never throw", so it is caught regardless.
        try {
            args = JSON.stringify(rawArgs);
        }
        catch {
            args = undefined;
        }
    }
    const isError = data.isError;
    return {
        subCallId,
        rootCallId: str(data, 'rootCallId'),
        parentCallId: str(data, 'parentCallId'),
        name,
        args,
        isError: typeof isError === 'boolean' ? isError : undefined,
    };
}
/** Narrow a `request/header` payload. */
export function readRequestHeader(data) {
    if (!isRecord(data))
        return undefined;
    const header = isRecord(data.header) ? data.header : undefined;
    if (header === undefined)
        return undefined;
    const config = isRecord(header.config) ? header.config : undefined;
    return {
        provider: config === undefined ? undefined : str(config, 'provider'),
        model: config === undefined ? undefined : str(config, 'model'),
        effort: config === undefined ? undefined : str(config, 'reasoningEffort'),
        reason: str(data, 'reason'),
    };
}
/** Narrow a `subagent/descriptor` payload. */
export function readSubagent(data) {
    if (!isRecord(data))
        return undefined;
    return {
        label: str(data, 'label'),
        model: str(data, 'agentModel'),
        mode: str(data, 'mode'),
    };
}
/** Narrow an `approval/asked` payload. */
export function readApprovalAsked(data) {
    if (!isRecord(data))
        return undefined;
    const id = str(data, 'id');
    if (id === undefined)
        return undefined;
    return {
        id,
        toolName: str(data, 'toolName'),
        callId: str(data, 'callId'),
        reason: str(data, 'reason'),
    };
}
/** Narrow an `approval/decided` payload. */
export function readApprovalDecided(data) {
    if (!isRecord(data))
        return undefined;
    const id = str(data, 'id');
    if (id === undefined)
        return undefined;
    const raw = data.outcome;
    const outcome = typeof raw === 'string'
        ? raw
        : isRecord(raw)
            ? (str(raw, 'kind') ?? str(raw, 'decision') ?? '')
            : '';
    return { id, outcome };
}
/** Outcomes that mark an approval row as failed. */
const DENIED = new Set(['denied', 'deny', 'rejected', 'cancelled', 'canceled', 'unavailable']);
/** True when an approval outcome should render as an error. */
export function isApprovalDenied(outcome) {
    return DENIED.has(outcome.toLowerCase());
}
/**
 * Narrow a `hook/invoked` / `hook/result` payload. No sample appeared in the
 * surveyed logs (no hooks were configured), so the accepted key spellings are
 * deliberately broad: any of `name`/`hook`/`hookName` identifies the hook.
 */
export function readHook(data) {
    if (!isRecord(data))
        return undefined;
    const name = str(data, 'name') ?? str(data, 'hook') ?? str(data, 'hookName');
    if (name === undefined)
        return undefined;
    return { id: str(data, 'id') ?? str(data, 'invocationId'), name, event: str(data, 'event') };
}
/** A `sandbox/mode`, `plan/mode`, `approval/policy` or `permission/preset` value. */
export function readModeValue(data) {
    if (!isRecord(data))
        return undefined;
    return str(data, 'mode') ?? str(data, 'policy') ?? str(data, 'preset') ?? str(data, 'name');
}
/** A `command/run` payload — the slash command the user dispatched. */
export function readCommandRun(data) {
    if (!isRecord(data))
        return undefined;
    const name = str(data, 'name');
    if (name === undefined)
        return undefined;
    return { name, args: str(data, 'args') };
}
/** Narrow a `compaction/start` or `compaction/end` payload. */
export function readCompaction(data) {
    if (!isRecord(data))
        return {};
    return {
        id: str(data, 'id') ?? str(data, 'compactionId'),
        reason: str(data, 'reason') ?? str(data, 'trigger'),
        removed: num(data, 'removed') ?? num(data, 'pruned'),
    };
}
/** A `todo/write` payload, reduced to the progress counters. */
export function readTodos(data) {
    if (!isRecord(data))
        return undefined;
    const todos = data.todos;
    if (!Array.isArray(todos))
        return undefined;
    let done = 0;
    let current;
    for (const item of todos) {
        if (!isRecord(item))
            continue;
        const status = str(item, 'status');
        if (status === 'completed')
            done += 1;
        else if (status === 'in_progress' && current === undefined)
            current = str(item, 'content');
    }
    return { done, total: todos.length, current };
}
