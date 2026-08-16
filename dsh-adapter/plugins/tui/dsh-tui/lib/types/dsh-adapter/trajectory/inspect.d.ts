/**
 * Inspector detail — full content, resolved on demand.
 *
 * The projection stores no message bodies: a node keeps `seq` (and `endSeq`)
 * and nothing else about content, so a ten-thousand-row session costs a few
 * hundred kilobytes of index rather than a second copy of the transcript. The
 * price is that opening a row has to go back to the log — which is free,
 * because the log is the same in-memory immutable array the fold read.
 *
 * That is also why this module lives in the adapter: it is the only place that
 * reads raw event payloads for display, and the boundary gate keeps it here.
 * The scene renders the returned sections without knowing what an event is.
 */
import type { TrajNode } from './types.js';
import type { SessionEvent } from '@nuaagent/session';
/** One titled block of full content. */
export interface InspectSection {
    readonly title: string;
    /** Raw body; the view truncates to its own box. */
    readonly body: string;
    /** Render hint: `error` for failures, `dim` for supporting material. */
    readonly tone?: 'error' | 'dim';
}
/** Everything the inspector shows for one row. */
export interface InspectDetail {
    readonly title: string;
    /** Short `key value` facts rendered on the header line. */
    readonly facts: readonly string[];
    readonly sections: readonly InspectSection[];
}
/**
 * Resolve the full detail for one ledger row.
 *
 * @param node - The focused row.
 * @param events - The session's current event snapshot.
 * @returns Display-ready sections. Always succeeds: a row whose owning event
 *   has been compacted away still yields its header facts.
 */
export declare function inspectNode(node: TrajNode, events: readonly SessionEvent[]): InspectDetail;
//# sourceMappingURL=inspect.d.ts.map