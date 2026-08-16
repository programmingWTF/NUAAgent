/**
 * `activity/status` session event — a log-only, non-surface snapshot of the
 * model's current working activity, published by this plugin for any UI
 * consumer (Web client, telemetry, …). It never enters derived model history
 * (no `surfaceOp`), so it cannot leak into prompts; UIs render it like
 * `todo/write` or `plan/mode`.
 * @module @nuaagent/working-activity/events
 */
export {};
