/**
 * Pure activity state machine for the working-activity status line. Consumes
 * session events (turn/step/tool/stream) plus agent running/idle transitions
 * and renders a human-readable status line at any wall-clock instant. No I/O,
 * no timers, no cordis — deterministic given the event stream and a clock.
 * @module @nuaagent/working-activity/status
 */
import type { SessionEvent } from '@nuaagent/session';
/** Public status phases a UI can render. */
export type ActivityPhase = 'idle' | 'waiting' | 'thinking' | 'tool' | 'done';
/** One snapshot of the model's activity, renderable by any UI. */
export interface ActivityState {
    /** Which activity phase the model is in right now. */
    readonly phase: ActivityPhase;
    /** Full human-readable status line (plain text, no ANSI). */
    readonly line: string;
    /** Short label of the current work (tool action or stage), when any. */
    readonly label?: string;
    /** Detail fragment (path / command / search pattern), when any. */
    readonly detail?: string;
    /** The playful phrase currently shown. */
    readonly phrase?: string;
    /** Tools completed in the current turn. */
    readonly toolCount: number;
    /** Wall-clock milliseconds since the current turn started (0 when idle). */
    readonly turnElapsedMs: number;
    /** Wall-clock time the current phase started, for animations. */
    readonly phaseStartedAt: number;
}
/** Per-turn thinking/tooling split, exposed for done summaries and stats. */
export interface TurnStats {
    /** Milliseconds the model was thinking (between turn start and first tool / turn end). */
    readonly thinkingMs: number;
    /** Milliseconds spent inside tool executions. */
    readonly toolMs: number;
    /** Tools completed in the turn. */
    readonly toolCount: number;
}
/** Configuration knobs for the state machine (subset of plugin Config). */
export interface TrackerConfig {
    /** Playful copy pool on/off; false renders plain functional labels. */
    readonly phrases: boolean;
    /** Maximum characters of a detail fragment (paths/commands). */
    readonly detailLimit: number;
    /** Hide the status line while idle. */
    readonly showIdle: boolean;
}
/**
 * Extract a displayable detail fragment from a tool call's parsed arguments.
 * @param toolName - Registry tool name.
 * @param args - Parsed tool arguments (lossless JSON by registry contract).
 */
export declare function detailFor(toolName: string, args: Readonly<Record<string, unknown>> | undefined, limit: number): string;
/**
 * Track one agent's activity from its durable session events. Events from
 * other sessions are ignored (the owning plugin feeds only the agent it
 * displays). The tracker is deliberately single-agent: multi-session UIs
 * instantiate one tracker per agent.
 */
export declare class ActivityTracker {
    private readonly config;
    private readonly now;
    private readonly customActions?;
    private phase;
    private phaseStartedAt;
    private turnStartedAt;
    private thinkingStartedAt;
    private thinkingMs;
    private toolMs;
    private toolCount;
    private activeTools;
    private doneQueue;
    private previousPhrase;
    private phraseChangedAt;
    private waitingFirstToken;
    /** Latest `⏵` self-narration line extracted from the stream, or null. */
    private narratedText;
    /** Wall-clock time of the most recent stream delta (narration freshness). */
    private lastChunkAt;
    /** Rolling stream buffer (reasoning + text deltas) for `⏵` extraction. */
    private recentStream;
    /** Total tokens reported across the turn's assistant messages. */
    private turnTokens;
    /** Completion prefix drawn ONCE at turn end so the done line stays stable. */
    private donePrefix;
    /**
     * @param config - Behavioral knobs.
     * @param now - Wall-clock supplier (injectable for tests).
     * @param customActions - Exact-name custom action pools for {@link actionFor}.
     */
    constructor(config: TrackerConfig, now?: () => number, customActions?: Readonly<Record<string, readonly string[]>> | undefined);
    /** Agent transitioned to running/idle. */
    onAgentStatus(status: 'idle' | 'running'): void;
    /** Consume one durable session event (turn/step/tool/stream). */
    onSessionEvent(event: SessionEvent): void;
    /** Render the current status snapshot at a wall-clock instant. */
    render(nowMs?: number): ActivityState;
    /** Per-turn thinking/tooling split for stats consumers. */
    stats(): TurnStats;
    private renderThinking;
    private doneSummary;
    /** The fresh self-narration line, or null once the stream has been quiet. */
    private freshNarration;
    private primaryTool;
    private turnElapsedMs;
    private setPhase;
}
/** Extract the latest `⏵` self-narration line from a stream buffer. */
export declare function extractNarration(buffer: string): string | null;
//# sourceMappingURL=status.d.ts.map