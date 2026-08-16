/**
 * Trajectory aggregate — the hotspot view's data and the session totals.
 *
 * The ledger answers "what happened, in order". This module answers the other
 * question a long session raises: **where did the time go**. Chronological
 * order is the worst order for that, so everything here is grouped and ranked
 * instead: cost per tool, cost per model phase (decode vs. waiting for the
 * first token vs. retry backoff), cost per turn.
 *
 * Three details make the numbers trustworthy rather than merely plausible:
 *
 * - **Own duration only.** A turn's cost is its own bracket, never the sum of
 *   its children — summing both would double-count every tool inside it.
 * - **No fabricated spans.** A step that produced no `assistant/chunk` (the
 *   request failed, or the log predates chunk capture) contributes no TTFT and
 *   no decode sample rather than a zero that would drag the average down.
 * - **Bursts expand.** A folded run is one ledger row but N calls; the counts
 *   and totals here are over calls, so `count` matches what actually ran.
 */
import type { HotspotRow, HotspotSort, TrajAggregate, TrajNode } from './types.js';
import type { TrajBuild } from './projection.js';
/**
 * Visit every logical call in ledger order, expanding burst rows.
 *
 * @param nodes - The folded ledger.
 * @param visit - Receives each call node plus the ledger index of the row it
 *   is displayed under (the burst row's index, for folded members).
 */
export declare function forEachCall(nodes: readonly TrajNode[], visit: (node: TrajNode, ledgerIndex: number) => void): void;
/**
 * Rank hotspot rows by the active sort key.
 *
 * Ties break on label so the order is total — an unstable order would make
 * rows jump between frames while the session streams.
 */
export declare function sortRows(rows: readonly HotspotRow[], sort: HotspotSort): HotspotRow[];
/**
 * Derive the hotspot groups and session totals from a projection.
 *
 * @param build - The current projection.
 * @param sort - Ranking key for the tool and turn groups.
 * @returns Ranked groups plus the counters the scene header and status badge
 *   read. Pure: nothing here mutates the build.
 */
export declare function aggregate(build: TrajBuild, sort?: HotspotSort): TrajAggregate;
//# sourceMappingURL=aggregate.d.ts.map