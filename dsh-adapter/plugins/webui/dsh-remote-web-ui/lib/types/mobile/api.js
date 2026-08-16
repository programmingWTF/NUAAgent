/**
 * Mobile-surface business API: the handful of host RPC methods the
 * simplified surface needs. Types come from the harness apiproxy contract
 * (type-only imports; the wire schemas stay in the bundle only through the
 * rpc/mux layers).
 */
import { callUnary } from "./rpc.js";
/** The workspace roster (session ids come back per workspace). */
export async function listWorkspaces() {
    const { items } = await callUnary('workspace.list', {});
    return items;
}
/** Read-only mobile display preferences (answered by the plugin, not the host proxy). */
export async function fetchMobilePreferences() {
    return await callUnary('mobile.preferences', {});
}
/** One session.list page; omit the cursor for the first page. */
export async function listSessions(cursor) {
    return await callUnary('session.list', cursor === undefined ? {} : { cursor });
}
/**
 * Create a blank session (entity birth precedes the first message). Name a
 * workspace to attach it there, or a cwd; omitting both uses the host cwd.
 */
export async function createSession(options = {}) {
    return await callUnary('session.create', options);
}
/** One history window; omit beforeSeq for the tail page, pass a signal to abort. */
export async function history(sessionId, beforeSeq, maxMessages = 30, signal) {
    return await callUnary('session.history', {
        sessionId,
        maxMessages,
        ...(beforeSeq !== undefined ? { beforeSeq } : {}),
    }, signal);
}
/** Send one text prompt (queued: the agent picks it up in order). */
export async function prompt(sessionId, text) {
    await callUnary('session.prompt', {
        sessionId,
        mode: 'queue',
        content: [{ type: 'text', text }],
    });
}
/** Send one slash command line (e.g. `/permission workspace-write`). */
export async function sendCommand(sessionId, line) {
    return await callUnary('session.prompt', {
        sessionId,
        mode: 'queue',
        content: [{ type: 'text', text: line }],
    });
}
/** Fresh advisory model directory for one session (current + groups + failures). */
export async function models(sessionId) {
    return await callUnary('session.models', { sessionId });
}
/** Select the complete model selection (provider/model/reasoning effort) for a session. */
export async function selectModel(sessionId, selection) {
    return await callUnary('session.selectModel', {
        sessionId,
        provider: selection.provider,
        model: selection.model,
        ...(selection.reasoningEffort !== undefined ? { reasoningEffort: selection.reasoningEffort } : {}),
    });
}
