/**
 * Client-side activity snapshot type + the ConversationSnapshot merge that
 * carries it.
 *
 * The host half (@nuaagent/working-activity's node side) publishes
 * `activity/status` session events; the web runtime patch (dsh-client-runtime
 * activity field, shipping separately) narrows those frames into the
 * conversation snapshot's `activity` member. Until that runtime release lands
 * on npm, this module re-declares the field via declaration merging so the
 * dock component type-checks against the published rc.6 types.
 *
 * REMOVE the `declare module` block below once
 * `@nuaagent/client-runtime/client` ships `ConversationSnapshot.activity`
 * natively (the runtime's own `ActivityStatusView` is structurally identical
 * to {@link ActivitySnapshot}; the two then agree by construction).
 * @module @nuaagent/working-activity/client/activity
 */
export {};
