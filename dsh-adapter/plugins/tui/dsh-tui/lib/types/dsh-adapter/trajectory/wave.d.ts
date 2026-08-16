/**
 * Wave band projection — the whole session compressed onto one row of glyphs.
 *
 * The band answers, without reading a single word: how long was this session,
 * where was it dense, where did it idle, where did it fail, and where am I
 * looking right now. It is the trajectory's coarse navigation axis — a few
 * keypresses cross a session that would take dozens of scrolls in the ledger.
 *
 * ## Three projections, one shape
 *
 * `sequence` gives every row equal width — best for scanning *what* happened.
 * `time` maps real wall-clock, so a five-minute tool call is visibly five
 * minutes and idle gaps are visibly idle. `compressed` keeps wall-clock
 * proportions but caps each inter-row gap, which is what you want on a session
 * that sat idle overnight between two bursts of work.
 *
 * ## Purity and cost
 *
 * {@link projectWave} is pure and O(nodes + columns). It is recomputed only
 * when the node count, the column count, or the projection changes — the
 * caller memoizes on exactly those three, which is why no cache lives here.
 */
import { type TrajNode, type WaveBand, type WaveBucket, type WaveChannel, type WaveProjection } from './types.js';
/** Which band channel a row contributes its weight to. */
export declare function channelOf(kind: TrajNode['kind']): WaveChannel;
/**
 * Project the ledger onto a fixed number of columns.
 *
 * @param nodes - The folded ledger, in log order.
 * @param columns - Column count; normally the band's rendered width.
 * @param projection - Horizontal domain (see the module comment).
 * @returns The band, with `peak` for glyph scaling and turn markers for the
 *   ruler row. An empty ledger yields zero buckets and `peak` 0.
 */
export declare function projectWave(nodes: readonly TrajNode[], columns: number, projection?: WaveProjection): WaveBand;
/** The dominant channel of a column, or `undefined` for an empty column. */
export declare function dominantChannel(bucket: WaveBucket): WaveChannel | undefined;
/**
 * Map a ledger index back to its column — the inverse used to draw the
 * viewport bracket under the band.
 *
 * @returns Column index, clamped into range; 0 for an empty band.
 */
export declare function columnOfIndex(band: WaveBand, ledgerIndex: number): number;
//# sourceMappingURL=wave.d.ts.map