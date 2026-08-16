import React from 'react';
import type { HotspotRow, HotspotSort, TrajAggregate } from '../../dsh-adapter/types.js';
/** Flatten the three sections into the single list the cursor walks. */
export declare function hotspotRows(agg: TrajAggregate): HotspotRow[];
export declare function HotspotView({ agg, sort, width, height, cursor, tick, switchTick, }: {
    agg: TrajAggregate;
    sort: HotspotSort;
    width: number;
    height: number;
    cursor: number;
    tick: number;
    switchTick: number;
}): React.ReactNode;
//# sourceMappingURL=HotspotView.d.ts.map