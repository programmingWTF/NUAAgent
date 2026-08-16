/**
 * Trajectory query — whole-session structured filtering.
 *
 * The official web trajectory is paged, and its own documentation is explicit
 * that search covers only the currently loaded window. In the terminal the
 * entire event log is already resident, so filtering can be exhaustive — and
 * once it is exhaustive, plain substring search stops being enough. This is a
 * small field language instead:
 *
 * ```
 *   tool:web_search        name equals (case-insensitive)
 *   kind:retry             row kind
 *   turn:9                 owning turn
 *   err:                   failed rows only
 *   run:                   still-running rows only
 *   >10s  <500ms           own duration bounds (ms / s / m suffixes)
 *   tok>1k                 token bounds
 *   anything else          free text over label, detail and outcome
 * ```
 *
 * Everything is AND-ed. An unparseable term degrades to free text rather than
 * erroring, so a half-typed query still narrows sensibly while you type.
 */
import type { TrajKind, TrajNode } from '../dsh-adapter/types.js';
/** One parsed predicate. */
type Term = {
    readonly kind: 'text';
    readonly value: string;
} | {
    readonly kind: 'tool';
    readonly value: string;
} | {
    readonly kind: 'rowKind';
    readonly value: string;
} | {
    readonly kind: 'turn';
    readonly value: number;
} | {
    readonly kind: 'error';
} | {
    readonly kind: 'running';
} | {
    readonly kind: 'duration';
    readonly op: '>' | '<';
    readonly ms: number;
} | {
    readonly kind: 'tokens';
    readonly op: '>' | '<';
    readonly count: number;
};
/** A compiled query: the parsed terms plus the raw text they came from. */
export interface TrajQuery {
    readonly raw: string;
    readonly terms: readonly Term[];
    /** True when the query selects everything (empty or whitespace only). */
    readonly empty: boolean;
}
/** Field prefixes offered in the query hint line. */
export declare const QUERY_FIELDS: readonly ["tool:", "kind:", "turn:", "err:", "run:", ">10s", "<1s", "tok>1k"];
/**
 * Compile a query string.
 *
 * @param raw - The user's query text.
 * @returns A query that {@link matchesQuery} can evaluate. Never throws.
 */
export declare function parseQuery(raw: string): TrajQuery;
/** True when a row satisfies every term (an empty query matches everything). */
export declare function matchesQuery(node: TrajNode, query: TrajQuery): boolean;
/**
 * Apply a query to the ledger.
 *
 * @returns The matching rows and, in parallel, their original ledger indexes —
 *   the wave band highlights matches in place, so it needs the positions the
 *   rows had before filtering, not after.
 */
export declare function applyQuery(nodes: readonly TrajNode[], query: TrajQuery): {
    rows: TrajNode[];
    indexes: number[];
};
/** Row kinds offered as `kind:` completions, in ledger-usefulness order. */
export declare const QUERY_KINDS: readonly TrajKind[];
export {};
//# sourceMappingURL=query.d.ts.map