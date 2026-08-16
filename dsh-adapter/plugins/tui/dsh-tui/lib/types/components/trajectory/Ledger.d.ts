import React from 'react';
import type { TrajNode } from '../../dsh-adapter/types.js';
export declare function Ledger({ rows, start, height, cursor, width, tick, arrivalTick, arrivalFrom, }: {
    /** The (possibly filtered) ledger. */
    rows: readonly TrajNode[];
    /** Index of the first visible row. */
    start: number;
    /** Visible row count. */
    height: number;
    /** Focused row index into `rows`. */
    cursor: number;
    /** Terminal width in cells. */
    width: number;
    tick: number;
    /** Tick at which the most recent rows arrived. */
    arrivalTick: number;
    /** Rows at or after this index are the ones that just arrived. */
    arrivalFrom: number;
}): React.ReactNode;
//# sourceMappingURL=Ledger.d.ts.map