/**
 * Package-owned `activity/status` snapshot invariants.
 * @module dsh-working-activity/invariant
 */
import type { Context } from '@nuaagent/cordis';
/** Cordis companion plugin name. */
export declare const name = "working-activity-invariant";
/** Service required before the companion can reserve package ownership. */
export declare const inject: string[];
/**
 * Register the working-activity invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export declare const apply: (ctx: Context) => Promise<() => void>;
//# sourceMappingURL=invariant.d.ts.map