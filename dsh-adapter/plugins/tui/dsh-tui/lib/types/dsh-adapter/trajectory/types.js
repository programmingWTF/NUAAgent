/**
 * Trajectory projection — the data contract shared by the adapter-side fold
 * and the UI-side scene (issue #80 evolution).
 *
 * Two rules shape every type here, and both exist because the projection
 * feeds a terminal that repaints on a keystroke:
 *
 * 1. **Nodes carry references, never derived copies.** A node's `detail` is
 *    the raw event string exactly as the log holds it — JS strings are
 *    immutable and shared, so keeping one costs a pointer, while flattening
 *    or truncating it at fold time would allocate a second copy of every
 *    tool argument in the session AND bake in a width the terminal has not
 *    chosen yet. The view calls {@link previewText} on the ~15 rows it is
 *    about to paint; everything else stays untouched.
 * 2. **Full content is never held at all.** `seq`/`endSeq` address the
 *    owning events, and the inspector re-reads them from the session's own
 *    immutable snapshot on demand. The projection is an index, not a mirror.
 */
/** Summed own-duration of the burst members whose brackets have closed. */
export function burstDurationMs(burst) {
    let total = 0;
    for (const member of burst.members)
        total += member.durationMs ?? 0;
    return total;
}
/** Number of burst members that failed. */
export function burstErrors(burst) {
    let count = 0;
    for (const member of burst.members)
        if (member.status === 'error')
            count += 1;
    return count;
}
/** True while any burst member is still running. */
export function burstRunning(burst) {
    return burst.members.some(member => member.status === 'running');
}
/** Minimum run length that folds into a {@link TrajBurst}. */
export const BURST_MIN = 3;
/** Ordered cycle for the `m` key. */
export const WAVE_PROJECTIONS = ['sequence', 'time', 'compressed'];
/** Ordered cycle for the `t` key. */
export const HOTSPOT_SORTS = ['duration', 'count', 'tokens'];
/**
 * Collapse whitespace and cap a raw detail string for one-line display.
 *
 * The scan is bounded: only the first `limit * 4 + 16` code units are ever
 * examined, so a 200 KB tool result costs the same as a 200-byte one. This
 * is the ONLY place raw detail becomes a display string, and it runs per
 * painted row, never per stored node.
 *
 * @param raw - Untrusted message, argument, or result text.
 * @param limit - Maximum characters to return, excluding the ellipsis.
 * @returns Flattened preview, suffixed with `…` when the source was longer.
 */
export function previewText(raw, limit) {
    if (limit <= 0)
        return '';
    // Bounded window: enough slack that collapsing runs of whitespace still
    // yields `limit` visible characters in the worst realistic case.
    const window = raw.slice(0, limit * 4 + 16);
    const flat = window.replace(/\s+/g, ' ').trim();
    if (flat.length <= limit) {
        // Only authoritative when the window covered the whole source; a source
        // longer than the window is still truncated even if the window collapsed
        // below the limit.
        return raw.length <= window.length ? flat : `${flat}…`;
    }
    return `${flat.slice(0, limit)}…`;
}
