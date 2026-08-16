/**
 * Browser-side wire helpers for the /api/update surface. Plain fetch over
 * same-origin /api like the pairing client; the host half enforces the
 * loopback-only fence and owns the pnpm run.
 */
/**
 * Error thrown when the update status probe fails: carries the HTTP status
 * so the panel can tell "the update route is not mounted" (404 — the host
 * process runs an older plugin build) apart from real network failures.
 */
export class UpdateStatusError extends Error {
    /** HTTP status of the failed response (0 when the fetch never returned). */
    status;
    constructor(status) {
        super('update status unavailable (HTTP ' + String(status) + ')');
        this.status = status;
    }
}
/**
 * Probe the update status: install mode, owning profile, and the
 * current-vs-latest comparison for every family package.
 * @returns the status snapshot.
 */
export async function fetchUpdateStatus() {
    let response;
    try {
        response = await fetch('/api/update/status');
    }
    catch {
        // Network-level failure: nothing came back at all.
        throw new UpdateStatusError(0);
    }
    if (!response.ok)
        throw new UpdateStatusError(response.status);
    return await response.json();
}
/**
 * Run the update (pnpm update in the owning profile). Blocks until pnpm
 * exits — the panel shows an in-flight state meanwhile.
 * @returns the run outcome.
 */
export async function runUpdate() {
    const response = await fetch('/api/update/run', { method: 'POST' });
    if (!response.ok)
        throw new Error('update run unavailable');
    return await response.json();
}
