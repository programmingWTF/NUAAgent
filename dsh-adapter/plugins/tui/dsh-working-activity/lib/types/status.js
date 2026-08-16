/**
 * Pure activity state machine for the working-activity status line. Consumes
 * session events (turn/step/tool/stream) plus agent running/idle transitions
 * and renders a human-readable status line at any wall-clock instant. No I/O,
 * no timers, no cordis — deterministic given the event stream and a clock.
 * @module @nuaagent/working-activity/status
 */
import { actionFor, fmtDuration, isGitTool, isNight, pickPhrase, thinkingPhrase, WAITING_PHRASES, DONE_PHRASES, FAIL_PHRASES, } from './phrases.js';
/** Format one tool into its display fragment (`跑个命令 npm test`). */
function toolFragment(tool) {
    return tool.detail.length === 0 ? tool.action : `${tool.action} ${tool.detail}`;
}
/** Simple non-ANSI string shortener by grapheme count. */
function shorten(value, limit) {
    const graphemes = Array.from(value);
    if (graphemes.length <= limit)
        return value;
    return `${graphemes.slice(0, Math.max(0, limit - 1)).join('')}…`;
}
/**
 * Extract a displayable detail fragment from a tool call's parsed arguments.
 * @param toolName - Registry tool name.
 * @param args - Parsed tool arguments (lossless JSON by registry contract).
 */
export function detailFor(toolName, args, limit) {
    if (args === undefined)
        return '';
    const pickString = (...keys) => {
        for (const key of keys) {
            const value = args[key];
            if (typeof value === 'string' && value.trim().length > 0)
                return value.trim();
        }
        return '';
    };
    const normalized = toolName.toLowerCase();
    if (normalized === 'mcp' || normalized.startsWith('mcp__') || normalized.includes('__')) {
        const action = pickString('action', 'tool', 'server', 'connect', 'describe');
        return shorten(action, limit);
    }
    const path = pickString('path', 'file', 'file_path', 'filepath', 'target');
    if (path.length > 0)
        return shorten(path, limit);
    const command = pickString('command', 'cmd', 'cmdline');
    if (command.length > 0)
        return shorten(command, limit);
    const pattern = pickString('pattern', 'query', 'search');
    if (pattern.length > 0)
        return shorten(pattern, limit);
    const url = pickString('url');
    if (url.length > 0)
        return shorten(url, limit);
    if (/^(?:subagent|agent|task)$/i.test(toolName)) {
        const description = pickString('description');
        if (description.length > 0)
            return shorten(description, limit);
        const prompt = pickString('prompt');
        if (prompt.length > 0)
            return shorten(prompt, limit);
    }
    const named = pickString('name', 'server', 'tool', 'id', 'goal');
    if (named.length > 0)
        return shorten(named, limit);
    return '';
}
/**
 * Track one agent's activity from its durable session events. Events from
 * other sessions are ignored (the owning plugin feeds only the agent it
 * displays). The tracker is deliberately single-agent: multi-session UIs
 * instantiate one tracker per agent.
 */
export class ActivityTracker {
    config;
    now;
    customActions;
    phase = 'idle';
    phaseStartedAt = 0;
    turnStartedAt = 0;
    thinkingStartedAt = 0;
    thinkingMs = 0;
    toolMs = 0;
    toolCount = 0;
    activeTools = new Map();
    doneQueue = [];
    previousPhrase;
    phraseChangedAt = 0;
    waitingFirstToken = false;
    /** Latest `⏵` self-narration line extracted from the stream, or null. */
    narratedText = null;
    /** Wall-clock time of the most recent stream delta (narration freshness). */
    lastChunkAt = 0;
    /** Rolling stream buffer (reasoning + text deltas) for `⏵` extraction. */
    recentStream = '';
    /** Total tokens reported across the turn's assistant messages. */
    turnTokens = 0;
    /** Completion prefix drawn ONCE at turn end so the done line stays stable. */
    donePrefix = '搞定 ✓';
    /**
     * @param config - Behavioral knobs.
     * @param now - Wall-clock supplier (injectable for tests).
     * @param customActions - Exact-name custom action pools for {@link actionFor}.
     */
    constructor(config, now = Date.now, customActions) {
        this.config = config;
        this.now = now;
        this.customActions = customActions;
    }
    /** Agent transitioned to running/idle. */
    onAgentStatus(status) {
        if (status === 'idle') {
            // The turn end already moved us to the done phase; idle only clears the
            // lingering done card after its display window.
            if (this.phase !== 'done')
                this.phase = 'idle';
            return;
        }
        if (this.phase === 'idle') {
            this.phase = 'waiting';
            this.phaseStartedAt = this.now();
            this.waitingFirstToken = true;
        }
    }
    /** Consume one durable session event (turn/step/tool/stream). */
    onSessionEvent(event) {
        switch (event.type) {
            case 'turn/start': {
                const at = event.time;
                this.turnStartedAt = at;
                this.thinkingStartedAt = at;
                this.thinkingMs = 0;
                this.toolMs = 0;
                this.toolCount = 0;
                this.turnTokens = 0;
                this.activeTools.clear();
                this.doneQueue = [];
                this.waitingFirstToken = true;
                this.narratedText = null;
                this.lastChunkAt = 0;
                this.recentStream = '';
                this.setPhase('waiting', at);
                return;
            }
            case 'step/start':
                if (this.phase === 'waiting' && !this.waitingFirstToken) {
                    // A new step without streamed output yet — stay waiting.
                }
                return;
            case 'assistant/chunk': {
                const chunk = event.data.chunk;
                this.lastChunkAt = event.time;
                if (chunk.type === 'text-delta' || chunk.type === 'reasoning-delta') {
                    if (this.waitingFirstToken) {
                        this.waitingFirstToken = false;
                        this.setPhase('thinking', event.time);
                        this.thinkingStartedAt = event.time;
                    }
                    this.recentStream = (this.recentStream + chunk.text).slice(-STREAM_BUFFER_CHARS);
                    const narration = extractNarration(this.recentStream);
                    if (narration !== null)
                        this.narratedText = narration;
                }
                return;
            }
            case 'assistant/message': {
                const usage = event.data.usage;
                if (usage !== undefined) {
                    this.turnTokens += usage.inputTokens + usage.outputTokens
                        + (usage.cacheReadTokens ?? 0) + (usage.cacheWriteTokens ?? 0);
                }
                return;
            }
            case 'tool/call': {
                const at = event.time;
                if (this.phase === 'thinking' || this.phase === 'waiting') {
                    this.thinkingMs += at - this.thinkingStartedAt;
                }
                const parsed = parseArguments(event.data.arguments);
                const action = this.config.phrases ? actionFor(event.data.name, this.customActions) : event.data.name;
                const detail = detailFor(event.data.name, parsed, this.config.detailLimit);
                const active = {
                    callId: event.data.callId,
                    name: event.data.name,
                    action,
                    detail,
                    isGit: isGitTool(event.data.name, parsed),
                    startedAt: at,
                    failed: false,
                };
                this.activeTools.set(event.data.callId, active);
                this.setPhase('tool', at);
                return;
            }
            case 'tool/result': {
                const at = event.time;
                // `ToolResultMessage.content` is the single-block `[ToolResultBlock]`
                // tuple, so `block` is never absent and always a tool-result block.
                const block = event.data.message.content[0];
                const active = this.activeTools.get(block.toolCallId);
                if (active === undefined)
                    return;
                active.failed = event.data.error !== undefined || block.isError === true;
                active.endedAt = at;
                this.toolMs += at - active.startedAt;
                this.toolCount += 1;
                this.doneQueue.push({
                    action: active.action,
                    detail: active.detail,
                    failed: active.failed,
                    endedAt: at,
                });
                if (this.doneQueue.length > DONE_QUEUE_MAX)
                    this.doneQueue.shift();
                this.activeTools.delete(block.toolCallId);
                if (this.activeTools.size === 0) {
                    // Back to thinking (or a trailing done card if the turn just closed).
                    this.setPhase('thinking', at);
                    this.thinkingStartedAt = at;
                }
                return;
            }
            case 'turn/end': {
                const at = event.time;
                if (this.activeTools.size > 0) {
                    // Tools still running at turn end: count their elapsed time as tool time.
                    for (const tool of this.activeTools.values()) {
                        this.toolMs += Math.max(0, at - tool.startedAt);
                    }
                    this.activeTools.clear();
                }
                else if (this.phase === 'thinking' || this.phase === 'waiting') {
                    this.thinkingMs += Math.max(0, at - this.thinkingStartedAt);
                }
                // Draw the completion prefix ONCE so repeated renders of the done line
                // stay stable (a fresh random per render would make it flicker).
                const lastTool = this.doneQueue.at(-1);
                if (this.config.phrases) {
                    this.donePrefix = lastTool?.failed ? pickPhrase(FAIL_PHRASES) : pickPhrase(DONE_PHRASES);
                }
                else {
                    this.donePrefix = '搞定 ✓';
                }
                this.setPhase('done', at);
                return;
            }
            default:
                return;
        }
    }
    /** Render the current status snapshot at a wall-clock instant. */
    render(nowMs = this.now()) {
        switch (this.phase) {
            case 'idle':
                return {
                    phase: 'idle',
                    line: '',
                    toolCount: 0,
                    turnElapsedMs: 0,
                    phaseStartedAt: this.phaseStartedAt,
                };
            case 'done': {
                const summary = this.doneSummary(nowMs);
                return {
                    phase: 'done',
                    line: summary.line,
                    toolCount: this.toolCount,
                    turnElapsedMs: this.turnElapsedMs(nowMs),
                    phaseStartedAt: this.phaseStartedAt,
                    ...(summary.phrase === undefined ? {} : { phrase: summary.phrase }),
                };
            }
            case 'tool': {
                const tool = this.primaryTool();
                if (tool === undefined) {
                    return this.renderThinking(nowMs);
                }
                const fragment = toolFragment(tool);
                const elapsed = fmtDuration(Math.max(0, nowMs - tool.startedAt));
                const git = tool.isGit ? ' · git' : '';
                const narration = this.freshNarration(nowMs);
                const line = narration === null
                    ? `${fragment} · ${elapsed}${git}`
                    : `⏵ ${narration} · ${fragment} · ${elapsed}${git}`;
                return {
                    phase: 'tool',
                    line,
                    label: tool.action,
                    detail: tool.detail,
                    ...(narration === null ? {} : { phrase: narration }),
                    toolCount: this.toolCount,
                    turnElapsedMs: this.turnElapsedMs(nowMs),
                    phaseStartedAt: this.phaseStartedAt,
                };
            }
            case 'waiting':
            case 'thinking': {
                const rendered = this.renderThinking(nowMs);
                if (this.phase === 'waiting') {
                    return { ...rendered, phase: 'waiting' };
                }
                return rendered;
            }
        }
    }
    /** Per-turn thinking/tooling split for stats consumers. */
    stats() {
        return {
            thinkingMs: this.thinkingMs,
            toolMs: this.toolMs,
            toolCount: this.toolCount,
        };
    }
    renderThinking(nowMs) {
        const thinkingMs = this.phase === 'waiting'
            ? 0
            : this.thinkingMs + Math.max(0, nowMs - this.thinkingStartedAt);
        const elapsed = fmtDuration(this.turnElapsedMs(nowMs));
        const narration = this.freshNarration(nowMs);
        if (narration !== null) {
            return {
                phase: this.phase,
                line: `⏵ ${narration} · 总${elapsed}`,
                phrase: narration,
                toolCount: this.toolCount,
                turnElapsedMs: this.turnElapsedMs(nowMs),
                phaseStartedAt: this.phaseStartedAt,
            };
        }
        if (this.config.phrases) {
            if (nowMs - this.phraseChangedAt >= PHRASE_ROTATE_MS) {
                // Waiting (pre-first-token) draws from the waiting pool; thinking
                // rotates the playful copy pool with night mixing.
                this.previousPhrase = this.phase === 'waiting'
                    ? pickPhrase(WAITING_PHRASES, this.previousPhrase)
                    : thinkingPhrase(thinkingMs, this.previousPhrase, isNight(new Date(nowMs).getHours()));
                this.phraseChangedAt = nowMs;
            }
            const phrase = this.previousPhrase ?? (this.phase === 'waiting'
                ? pickPhrase(WAITING_PHRASES)
                : thinkingPhrase(thinkingMs, undefined, isNight(new Date(nowMs).getHours())));
            return {
                phase: this.phase,
                line: `${phrase} · 总${elapsed}`,
                phrase,
                toolCount: this.toolCount,
                turnElapsedMs: this.turnElapsedMs(nowMs),
                phaseStartedAt: this.phaseStartedAt,
            };
        }
        const label = this.phase === 'waiting' ? '等待模型响应' : '思考中';
        return {
            phase: this.phase,
            line: `${label} · 总${elapsed}`,
            label,
            toolCount: this.toolCount,
            turnElapsedMs: this.turnElapsedMs(nowMs),
            phaseStartedAt: this.phaseStartedAt,
        };
    }
    doneSummary(nowMs) {
        const { thinkingMs, toolMs, toolCount } = this.stats();
        const tokens = this.turnTokens > 0 ? ` · 🔥 ${fmtTokens(this.turnTokens)}` : '';
        const base = `${this.donePrefix} · ${toolCount} 工具 · 想${fmtDuration(thinkingMs)} 干${fmtDuration(toolMs)}${tokens}`;
        if (!this.config.phrases) {
            return { line: `搞定 ✓ · ${toolCount} 工具 · 想${fmtDuration(thinkingMs)} 干${fmtDuration(toolMs)}${tokens}` };
        }
        const last = this.doneQueue.at(-1);
        if (last !== undefined && nowMs - last.endedAt < DONE_FRAGMENT_MS) {
            const fragment = toolFragment(last);
            return { line: `${this.donePrefix} · ${fragment} · ${toolCount} 工具${tokens}`, phrase: this.donePrefix };
        }
        return { line: base, ...(this.donePrefix === '搞定 ✓' ? {} : { phrase: this.donePrefix }) };
    }
    /** The fresh self-narration line, or null once the stream has been quiet. */
    freshNarration(nowMs) {
        if (this.narratedText === null)
            return null;
        if (nowMs - this.lastChunkAt > NARRATE_GRACE_MS)
            return null;
        return this.narratedText;
    }
    primaryTool() {
        let primary;
        for (const tool of this.activeTools.values()) {
            if (primary === undefined || tool.startedAt < primary.startedAt)
                primary = tool;
        }
        return primary;
    }
    turnElapsedMs(nowMs) {
        return this.turnStartedAt === 0 ? 0 : Math.max(0, nowMs - this.turnStartedAt);
    }
    setPhase(phase, atMs) {
        this.phase = phase;
        this.phaseStartedAt = atMs;
    }
}
/** Rotate the thinking phrase every N render ticks (render cadence ≈ 500ms → ~4s). */
const PHRASE_ROTATE_MS = 4000;
/** Cap on replayed done cards; older entries drop. */
const DONE_QUEUE_MAX = 6;
/** Show the last tool's fragment in the done line for this long after it ends. */
const DONE_FRAGMENT_MS = 3000;
/** Rolling stream buffer size for `⏵` narration extraction. */
const STREAM_BUFFER_CHARS = 300;
/** A narration stays visible this long after the stream went quiet. */
const NARRATE_GRACE_MS = 5000;
/** Extract the latest `⏵` self-narration line from a stream buffer. */
export function extractNarration(buffer) {
    const matches = [...buffer.matchAll(/⏵\s*([^\n⏵]{1,40})/g)];
    if (matches.length === 0)
        return null;
    const latest = matches[matches.length - 1]?.[1];
    if (latest === undefined)
        return null;
    const text = latest.replace(/[。．.!！,，、;；]+$/, '').trim();
    return text.length === 0 ? null : text;
}
/** Format a token count compactly (`12.3k`, `1.2M`). */
function fmtTokens(tokens) {
    if (tokens >= 1_000_000)
        return `${(tokens / 1_000_000).toFixed(1)}M`;
    if (tokens >= 1000)
        return `${(tokens / 1000).toFixed(1)}k`;
    return String(tokens);
}
/** Parse a tool call's raw arguments JSON defensively. */
function parseArguments(raw) {
    if (raw.trim().length === 0)
        return undefined;
    try {
        const parsed = JSON.parse(raw);
        if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
            return parsed;
        }
        return undefined;
    }
    catch {
        return undefined;
    }
}
