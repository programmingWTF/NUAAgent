/**
 * Type-only re-exports of the official upstream surface for UI layers.
 *
 * UI modules (screens/, components/, ink/, hooks/, utils/) must never import
 * `@deepseek-ai/*` directly — they import types from here. This keeps the
 * upstream coupling in one tree (src/dsh-adapter/) so an upstream rc bump
 * breaks exactly one module, never the whole UI.
 */
export type { LlmModelInfo } from '@nuaagent/llm';
export type { Agent, AgentHandle, AgentStatus, CreateAgentOptions, ModelSelectionRef } from '@nuaagent/agent';
export type { SessionId, SessionEvent, SessionHeader } from '@nuaagent/session';
export type { CommandRuntime } from '@nuaagent/commands';
export type { ApprovalOutcome, ApprovalRequest } from '@nuaagent/user-approval';
export type { AgentSetup } from '@nuaagent/agent';
export type { Context } from '@nuaagent/cordis';
export type { InvariantInstaller } from '@nuaagent/invariants';
/**
 * Trajectory projection types. Not upstream types, but the same rule applies:
 * the scene is pure UI over this shape and never reaches into the projection's
 * own modules (which do import `@deepseek-ai/*`).
 */
export type { HotspotRow, HotspotSort, TrajAggregate, TrajBurst, TrajKind, TrajNode, TrajStatus, TrajTokens, TrajTotals, WaveBand, WaveBucket, WaveChannel, WaveProjection, } from './trajectory/types.js';
//# sourceMappingURL=types.d.ts.map