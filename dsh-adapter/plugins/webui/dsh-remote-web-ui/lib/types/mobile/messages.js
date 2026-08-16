/** Runtime shape guard for the lossless-JSON `data` of a `WireEvent`. */
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function pickString(value) {
    return typeof value === 'string' ? value : undefined;
}
function pickNumber(value) {
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
/** Fallback message id for events without a stable wire id. */
function syntheticId(prefix, seq) {
    return `${prefix}#${String(seq)}`;
}
/** Concatenate the plain text of every `text` content block. */
function textFromContent(content) {
    return blocksOfType(content, 'text');
}
/** Concatenate the plain text of every `reasoning` content block. */
function reasoningFromContent(content) {
    return blocksOfType(content, 'reasoning');
}
/** Concatenate the plain text of every content block of one type. */
function blocksOfType(content, type) {
    if (!Array.isArray(content))
        return '';
    let out = '';
    for (const block of content) {
        if (!isRecord(block))
            continue;
        if (block['type'] !== type)
            continue;
        const text = pickString(block['text']);
        if (text !== undefined)
            out += text;
    }
    return out;
}
/**
 * Extract a text-chunk target from `assistant/chunk` or the mobile alias
 * `message/chunk`.
 *
 * - DSH shape: `data.chunk = { type: 'text-delta', text }` keyed by
 *   `(turn, step)`; the pending message is created/aggregated on the owning
 *   step and later finalized by the matching `assistant/message`.
 * - Mobile shape: `data.text` with an optional `messageId` binding the delta
 *   to a specific assistant message.
 *
 * Returns null for non-text chunk variants (usage / finish / block-start).
 */
function chunkTarget(data) {
    if (!isRecord(data))
        return null;
    let text;
    let kind = 'text';
    let idValue;
    let turn;
    let step;
    const chunk = data['chunk'];
    if (isRecord(chunk)) {
        if (chunk['type'] !== 'text-delta' && chunk['type'] !== 'reasoning-delta')
            return null;
        text = pickString(chunk['text']);
        kind = chunk['type'] === 'reasoning-delta' ? 'reasoning' : 'text';
        turn = pickNumber(data['turn']);
        step = pickNumber(data['step']);
    }
    else {
        text = pickString(data['text']);
        kind = pickString(data['kind']) === 'reasoning' ? 'reasoning' : 'text';
        idValue = pickString(data['messageId']) ?? pickString(data['id']);
        turn = pickNumber(data['turn']);
        step = pickNumber(data['step']);
    }
    if (text === undefined)
        return null;
    const result = { text, kind };
    if (idValue !== undefined)
        result.id = idValue;
    if (turn !== undefined)
        result.turn = turn;
    if (step !== undefined)
        result.step = step;
    return result;
}
/** Max message seq across an existing list, or -1 for an empty list. */
function watermarkOf(existing) {
    if (existing === undefined)
        return -1;
    let maxSeq = -1;
    for (const message of existing) {
        if (message.seq > maxSeq)
            maxSeq = message.seq;
    }
    return maxSeq;
}
function createState(existing) {
    const messages = existing === undefined ? [] : [...existing];
    const state = {
        messages,
        byId: new Map(),
        pendingByTurnStep: new Map(),
        turnStepMessage: new Map(),
        messageTurn: new Map(),
        toolNames: new Map(),
    };
    for (const message of messages) {
        state.byId.set(message.id, message);
        if (message.kind !== 'assistant')
            continue;
        // Rebuild the (turn, step) and turn index maps lost when `existing` was
        // handed back to us as plain rows.
        const decoded = decodePendingTurnStep(message.id);
        const key = decoded === undefined ? undefined : tsKey(decoded.turn, decoded.step);
        if (message.pending === true && key !== undefined) {
            state.pendingByTurnStep.set(key, message);
            state.turnStepMessage.set(key, message);
        }
        if (decoded !== undefined) {
            state.messageTurn.set(message.id, decoded.turn);
        }
    }
    return state;
}
function tsKey(turn, step) {
    return turn === undefined || step === undefined ? undefined : `${turn}.${step}`;
}
/**
 * Recover the `(turn, step)` a pending assistant message was created under from
 * its synthetic id (`assistant,<turn>.<step>#<seq>`), so an incremental fold
 * over an `existing` list can re-attach index maps that were lost across calls.
 */
function decodePendingTurnStep(id) {
    if (!id.startsWith('assistant,'))
        return undefined;
    const rest = id.slice('assistant,'.length);
    const hash = rest.indexOf('#');
    const tsPart = hash === -1 ? rest : rest.slice(0, hash);
    const dot = tsPart.indexOf('.');
    if (dot <= 0 || dot === tsPart.length - 1)
        return undefined;
    const turn = Number(tsPart.slice(0, dot));
    const step = Number(tsPart.slice(dot + 1));
    if (!Number.isInteger(turn) || !Number.isInteger(step))
        return undefined;
    return { turn, step };
}
/**
 * Swap in a replacement message object at the old message's position and
 * re-index it. Immutable: `next` is a fresh object; the old one is untouched.
 */
function replaceMessage(state, oldMessage, next) {
    const index = state.messages.indexOf(oldMessage);
    if (index !== -1)
        state.messages[index] = next;
    state.byId.delete(oldMessage.id);
    state.byId.set(next.id, next);
}
/** Bundle the maps keyed per `(turn, step)` over to a newly swapped message. */
function retargetTurnStep(state, key, oldMessage, next) {
    if (key === undefined)
        return;
    if (state.pendingByTurnStep.get(key) === oldMessage)
        state.pendingByTurnStep.set(key, next);
    if (state.turnStepMessage.get(key) === oldMessage)
        state.turnStepMessage.set(key, next);
}
/** Fold one event into the working state. Assumes the event passes the watermark. */
function applyEvent(state, event) {
    switch (event.type) {
        case 'user/message':
            applyUserMessage(state, event);
            break;
        case 'assistant/message':
            applyAssistantMessage(state, event);
            break;
        case 'assistant/chunk':
        case 'message/chunk':
            applyChunk(state, event);
            break;
        case 'message/update':
            applyUpdate(state, event);
            break;
        case 'message/delete':
            applyDelete(state, event);
            break;
        case 'turn/end':
            applyTurnEnd(state, event);
            break;
        case 'tool/call':
            applyToolCall(state, event);
            break;
        case 'request/context': {
            // Wire shape: { provider, model, contextWindow? }. A present finite
            // contextWindow seeds every later assistant message that reports usage.
            const data = isRecord(event.data) ? event.data : {};
            const window = pickNumber(data['contextWindow']);
            if (window !== undefined)
                state.contextWindow = window;
            break;
        }
        // turn/start, session/end-seed, and every other/unknown type render nothing.
        default:
            break;
    }
}
function applyUserMessage(state, event) {
    const data = isRecord(event.data) ? event.data : {};
    const id = pickString(data['id']) ?? syntheticId('user', event.seq);
    const text = textFromContent(data['content']);
    const source = isRecord(data['source']) ? data['source'] : {};
    const sourceKind = pickString(source['kind']);
    const existing = state.byId.get(id);
    if (existing !== undefined) {
        // Idempotent replace (replayed events update in place, never duplicate).
        replaceMessage(state, existing, {
            ...existing,
            ...(sourceKind !== undefined ? { sourceKind } : {}),
            text,
            seq: event.seq,
            time: event.time,
        });
        return;
    }
    const message = {
        id,
        kind: 'user',
        text,
        ...(sourceKind !== undefined ? { sourceKind } : {}),
        seq: event.seq,
        time: event.time,
    };
    state.messages.push(message);
    state.byId.set(id, message);
}
function applyAssistantMessage(state, event) {
    const data = isRecord(event.data) ? event.data : {};
    const messageData = isRecord(data['message']) ? data['message'] : data;
    const id = pickString(messageData['id']) ?? pickString(data['id']) ?? syntheticId('assistant', event.seq);
    const turn = pickNumber(data['turn']);
    const step = pickNumber(data['step']);
    const finalText = textFromContent(messageData['content']);
    const finalReasoning = reasoningFromContent(messageData['content']);
    const key = tsKey(turn, step);
    const usage = usageFromData(data);
    const contextWindow = state.contextWindow;
    // Finalize the matching assistant message (by id, or by turn/step for the
    // streaming partial that chunks built before the final event arrived).
    let target = state.byId.get(id);
    if (target === undefined && key !== undefined)
        target = state.pendingByTurnStep.get(key);
    if (target !== undefined) {
        const next = {
            ...target,
            id,
            text: finalText,
            // The final content block list is authoritative; an adapter that omits
            // reasoning from the final message keeps the streamed reasoning text.
            ...(finalReasoning !== '' ? { reasoning: finalReasoning } : {}),
            ...(usage !== undefined ? { usage } : {}),
            ...(usage !== undefined && contextWindow !== undefined ? { contextWindow } : {}),
            seq: event.seq,
            time: event.time,
            pending: false,
        };
        replaceMessage(state, target, next);
        retargetTurnStep(state, key, target, next);
        if (turn !== undefined)
            state.messageTurn.set(next.id, turn);
        return;
    }
    const message = {
        id,
        kind: 'assistant',
        text: finalText,
        ...(finalReasoning !== '' ? { reasoning: finalReasoning } : {}),
        ...(usage !== undefined ? { usage } : {}),
        ...(usage !== undefined && contextWindow !== undefined ? { contextWindow } : {}),
        seq: event.seq,
        time: event.time,
    };
    state.messages.push(message);
    state.byId.set(id, message);
    if (key !== undefined) {
        state.pendingByTurnStep.delete(key);
        state.turnStepMessage.set(key, message);
    }
    if (turn !== undefined)
        state.messageTurn.set(id, turn);
}
/**
 * Extract token usage from an assistant event payload. Only attaches when the
 * wire carries finite `inputTokens` AND `outputTokens`; the cache fields are
 * included only for finite numbers.
 */
function usageFromData(data) {
    const usageData = data['usage'];
    if (!isRecord(usageData))
        return undefined;
    const inputTokens = pickNumber(usageData['inputTokens']);
    const outputTokens = pickNumber(usageData['outputTokens']);
    if (inputTokens === undefined || outputTokens === undefined)
        return undefined;
    const usage = { inputTokens, outputTokens };
    const cacheReadTokens = pickNumber(usageData['cacheReadTokens']);
    const cacheWriteTokens = pickNumber(usageData['cacheWriteTokens']);
    if (cacheReadTokens !== undefined)
        usage.cacheReadTokens = cacheReadTokens;
    if (cacheWriteTokens !== undefined)
        usage.cacheWriteTokens = cacheWriteTokens;
    return usage;
}
function applyChunk(state, event) {
    const target = chunkTarget(event.data);
    if (target === null)
        return;
    const key = tsKey(target.turn, target.step);
    let message;
    if (target.id !== undefined) {
        message = state.byId.get(target.id);
    }
    else if (key !== undefined) {
        message = state.pendingByTurnStep.get(key) ?? state.turnStepMessage.get(key);
    }
    if (message !== undefined && message.kind === 'assistant') {
        const next = target.kind === 'reasoning'
            ? { ...message, reasoning: (message.reasoning ?? '') + target.text, seq: event.seq, time: event.time }
            : { ...message, text: message.text + target.text, seq: event.seq, time: event.time };
        replaceMessage(state, message, next);
        retargetTurnStep(state, key, message, next);
        return;
    }
    const id = target.id
        ?? (key !== undefined ? syntheticId(`assistant,${key}`, event.seq) : syntheticId('assistant', event.seq));
    const created = target.kind === 'reasoning'
        ? { id, kind: 'assistant', text: '', reasoning: target.text, seq: event.seq, time: event.time, pending: true }
        : { id, kind: 'assistant', text: target.text, seq: event.seq, time: event.time, pending: true };
    state.messages.push(created);
    state.byId.set(id, created);
    if (key !== undefined) {
        state.pendingByTurnStep.set(key, created);
        state.turnStepMessage.set(key, created);
    }
    if (target.turn !== undefined)
        state.messageTurn.set(id, target.turn);
}
function findByIdOrSeq(state, event) {
    const data = isRecord(event.data) ? event.data : {};
    const id = pickString(data['id']);
    if (id !== undefined) {
        const byId = state.byId.get(id);
        if (byId !== undefined)
            return byId;
    }
    const seq = pickNumber(data['seq'] ?? data['messageSeq']);
    if (seq !== undefined) {
        return state.messages.find(message => message.seq === seq);
    }
    return undefined;
}
function applyUpdate(state, event) {
    const message = findByIdOrSeq(state, event);
    if (message === undefined)
        return;
    const data = isRecord(event.data) ? event.data : {};
    const text = pickString(data['text']);
    const next = {
        ...message,
        ...(text !== undefined ? { text } : {}),
        seq: event.seq,
        time: event.time,
    };
    replaceMessage(state, message, next);
}
function removeMessage(state, message) {
    const index = state.messages.indexOf(message);
    if (index !== -1)
        state.messages.splice(index, 1);
    state.byId.delete(message.id);
    state.messageTurn.delete(message.id);
    state.toolNames.delete(message.id);
    for (const [key, candidate] of state.turnStepMessage) {
        if (candidate === message)
            state.turnStepMessage.delete(key);
    }
    for (const [key, candidate] of state.pendingByTurnStep) {
        if (candidate === message)
            state.pendingByTurnStep.delete(key);
    }
}
function applyDelete(state, event) {
    const message = findByIdOrSeq(state, event);
    if (message === undefined)
        return;
    removeMessage(state, message);
}
function applyToolCall(state, event) {
    const data = isRecord(event.data) ? event.data : {};
    const name = pickString(data['name']);
    if (name === undefined)
        return;
    const turn = pickNumber(data['turn']);
    const step = pickNumber(data['step']);
    const key = tsKey(turn, step);
    let target = key === undefined ? undefined : state.turnStepMessage.get(key);
    if (target === undefined && turn !== undefined) {
        for (let i = state.messages.length - 1; i >= 0; i--) {
            const candidate = state.messages[i];
            if (candidate !== undefined && candidate.kind === 'assistant' && state.messageTurn.get(candidate.id) === turn) {
                target = candidate;
                break;
            }
        }
    }
    if (target === undefined) {
        for (let i = state.messages.length - 1; i >= 0; i--) {
            const candidate = state.messages[i];
            if (candidate !== undefined && candidate.kind === 'assistant') {
                target = candidate;
                break;
            }
        }
    }
    if (target === undefined)
        return;
    const names = state.toolNames.get(target.id) ?? new Set();
    const isNewName = !names.has(name);
    if (isNewName) {
        names.add(name);
        state.toolNames.set(target.id, names);
    }
    const callId = pickString(data['callId']) ?? `${name}#${String(event.seq)}`;
    const args = pickString(data['arguments']);
    const tools = target.tools ?? [];
    const existingIndex = tools.findIndex(tool => tool.callId === callId);
    const isNewCall = existingIndex === -1;
    const nextTools = isNewCall
        ? [...tools, { callId, name, ...(args !== undefined ? { arguments: args } : {}) }]
        : tools.map((tool, index) => index === existingIndex
            ? { ...tool, ...(args !== undefined ? { arguments: args } : {}) }
            : tool);
    const next = {
        ...target,
        ...(isNewName ? { toolSummary: `使用 ${[...names].join(' / ')}` } : {}),
        ...(isNewCall || args !== undefined ? { tools: nextTools } : {}),
        seq: event.seq,
        time: event.time,
    };
    replaceMessage(state, target, next);
    retargetTurnStep(state, key, target, next);
}
function applyTurnEnd(state, event) {
    const data = isRecord(event.data) ? event.data : {};
    const turn = pickNumber(data['turn']);
    const reason = isRecord(data['reason']) ? data['reason'] : {};
    const failed = reason['kind'] === 'error';
    let targets;
    if (turn !== undefined) {
        targets = state.messages.filter(message => message.kind === 'assistant' && state.messageTurn.get(message.id) === turn);
    }
    else {
        targets = state.messages.filter(message => message.kind === 'assistant');
    }
    if (targets.length === 0) {
        for (let i = state.messages.length - 1; i >= 0; i--) {
            const candidate = state.messages[i];
            if (candidate !== undefined && candidate.kind === 'assistant') {
                targets = [candidate];
                break;
            }
        }
    }
    for (const message of targets) {
        const wasPending = message.pending === true;
        replaceMessage(state, message, {
            ...message,
            ...(wasPending ? { pending: false } : {}),
            ...(failed ? { failed: true } : {}),
            seq: Math.max(message.seq, event.seq),
            time: event.time,
        });
    }
}
/**
 * Fold a batch of session events into a renderable message list.
 *
 * @param events - events to apply, in any order (folded by ascending seq).
 * @param existing - the previously rendered list (live-stream incremental tail).
 * @returns messages sorted by seq.
 */
export function foldEvents(events, existing) {
    const sorted = [...events].sort((a, b) => a.seq - b.seq);
    const watermark = watermarkOf(existing);
    const state = createState(existing);
    for (const event of sorted) {
        if (event.seq <= watermark)
            continue;
        applyEvent(state, event);
    }
    return [...state.messages].sort((a, b) => a.seq - b.seq || (a.id < b.id ? -1 : 1));
}
