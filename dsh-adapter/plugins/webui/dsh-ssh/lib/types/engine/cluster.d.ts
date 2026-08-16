/**
 * Cluster execution: run one command concurrently across many hosts (all, or
 * filtered by explicit aliases / environment / tags with ALL semantics).
 */
import type { ClusterResult } from '../protocol.ts';
import { type PoolEngine } from './connection-pool.ts';
interface ClusterOptions {
    command: string;
    aliases?: string[];
    environment?: string;
    tags?: string[];
    timeoutMs?: number;
    maxWorkers?: number;
}
/** Run one command against many hosts concurrently. */
export declare function cluster(engine: PoolEngine, options: ClusterOptions): Promise<ClusterResult[]>;
export {};
