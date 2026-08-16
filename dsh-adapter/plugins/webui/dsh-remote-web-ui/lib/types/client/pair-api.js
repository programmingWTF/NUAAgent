/**
 * Browser-side wire helpers for the /api/pair surface. Plain fetch over
 * same-origin /api (like the connection client); JSON bodies, string
 * responses for the error codes.
 */
/**
 * Mint a fresh pairing token (one active token at a time — this invalidates
 * any previous link).
 * @param workspaceId - optional current workspace to deep-link the phone into.
 * @param address - optional LAN IP literal the QR must be built from (the
 * default is the first interface); unknown literals refuse with
 * 'unknown-address'.
 * @returns the issued link, the lan-required refusal (server never bound
 * 0.0.0.0), or the forbidden refusal (the loopback-only fence rejected this
 * origin — the panel is a desktop control endpoint).
 */
export async function issuePair(workspaceId, address) {
    const response = await fetch('/api/pair/issue', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            ...(workspaceId !== undefined ? { workspaceId } : {}),
            ...(address !== undefined ? { address } : {}),
        }),
    });
    if (!response.ok) {
        if (response.status === 409)
            return { ok: false, code: 'lan-required' };
        if (response.status === 403)
            return { ok: false, code: 'forbidden' };
        if (response.status === 400)
            return { ok: false, code: 'unknown-address' };
        throw new Error(`remote-web-ui: issue failed with ${String(response.status)}`);
    }
    return await response.json();
}
/**
 * Accept a pairing token (the phone's first open of the QR link). Success
 * sets the device cookie; the page then reloads to boot with it.
 * @param token - the token from the URL.
 * @returns the wire result.
 */
export async function acceptPair(token) {
    const response = await fetch('/api/pair/accept', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
    });
    if (response.ok)
        return { ok: true };
    if (response.status === 404)
        return { ok: false, code: 'invalid' };
    if (response.status === 409)
        return { ok: false, code: 'used' };
    return { ok: false, code: 'forbidden' };
}
/** Revoke mobile access (paired devices + the current token). */
export async function stopPair() {
    const response = await fetch('/api/pair/stop', { method: 'POST' });
    if (!response.ok)
        throw new Error(`remote-web-ui: stop failed with ${String(response.status)}`);
}
/** Presence heartbeat from a paired phone (unpaired heartbeats 401 harmlessly). */
export async function sendHeartbeat() {
    await fetch('/api/pair/heartbeat', { method: 'POST' });
}
/** Whether the current page URL carries a pairing token / workspace target. */
export function readPairParams(search) {
    const params = new URLSearchParams(search);
    const pair = params.get('pair');
    const workspace = params.get('workspace');
    return {
        ...(pair !== null && pair !== '' ? { pair } : {}),
        ...(workspace !== null && workspace !== '' ? { workspace } : {}),
    };
}
/**
 * Strip one query parameter from the current URL without reloading.
 * @param name - the parameter to remove.
 * @returns the new search string ('' when empty).
 */
export function stripParam(name) {
    const url = new URL(window.location.href);
    url.searchParams.delete(name);
    return url.search;
} /** Human-readable expiry clock, e.g. "10:35". */
export function formatClock(epochMs) {
    const date = new Date(epochMs);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
/**
 * Copy text to the clipboard with a fallback for insecure contexts
 * (plain-HTTP LAN origins lack navigator.clipboard).
 * @param text - the text to copy.
 * @returns whether the copy succeeded.
 */
export async function copyText(text) {
    if (typeof navigator !== 'undefined' && navigator.clipboard !== undefined) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch {
            // fall through to the execCommand path
        }
    }
    try {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        return ok;
    }
    catch {
        return false;
    }
}
