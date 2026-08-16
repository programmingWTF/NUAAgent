/**
 * Trajectory projection — the adapter-side barrel.
 *
 * This directory is the only part of the trajectory feature allowed to import
 * `@deepseek-ai/*` (enforced by `verify-adapter-boundary`). The scene, the
 * ledger, the wave band and the hotspot view are pure UI over the types and
 * functions re-exported here; they never touch a session event directly.
 *
 * @module @deepseek-harness-tui/dsh-tui/trajectory
 */
export { buildTrajectory, emptyTrajectory, extendTrajectory, } from './projection.js';
export { aggregate, forEachCall, sortRows } from './aggregate.js';
export { inspectNode } from './inspect.js';
export { channelOf, columnOfIndex, dominantChannel, projectWave } from './wave.js';
export { BURST_MIN, burstDurationMs, burstErrors, burstRunning, HOTSPOT_SORTS, previewText, WAVE_PROJECTIONS, } from './types.js';
