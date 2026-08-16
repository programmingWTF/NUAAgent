/**
 * Connection pool: per-alias persistent ssh2 connections with multi-hop jump
 * support, the acquire / dispose / sweep lifecycle, and the pooled exec path.
 */
import { Client, type ConnectConfig } from 'ssh2';
import type { ExecResult, SshHostEntry } from '../protocol.ts';
import { type HostStore } from '../store.ts';
/** Default engine knobs. */
export interface EngineOptions {
    /** Connections idle longer than this are closed (ms). */
    idleTimeoutMs?: number;
    /** SSH handshake timeout (ms). */
    connectTimeoutMs?: number;
    /** Keepalive ping interval (ms). */
    keepaliveIntervalMs?: number;
    /** Cap on captured stdout/stderr bytes per exec (ms). */
    maxOutputBytes?: number;
    /** Default exec timeout (ms). */
    defaultExecTimeoutMs?: number;
    /** Default cluster concurrency. */
    defaultMaxWorkers?: number;
    /** SFTP concurrent channel count for transfers. */
    sftpConcurrency?: number;
}
/** Default engine knobs (applied when an option is omitted). */
export declare const DEFAULTS: Required<EngineOptions>;
/** One pooled connection record. */
export interface PoolRecord {
    client: Client;
    /** Jump-chain clients kept alive under the target. */
    hops: Client[];
    idleAt: number;
    /** Pinned connections (tunnels) are never swept. */
    pinned: boolean;
    broken: boolean;
    /** Operations currently running on this connection (sweep guard). */
    inFlight: number;
}
/**
 * The slice of the engine the pool and exec paths need. The host class
 * (engine.ts facade) satisfies this structurally.
 */
export interface PoolEngine {
    readonly store: HostStore;
    readonly opts: Required<EngineOptions>;
    readonly pool: Map<string, PoolRecord>;
    readonly acquireQueue: Map<string, Promise<PoolRecord>>;
}
/** Build the ssh2 connect config for one entry (key read from disk). */
export declare function buildConnectConfig(entry: SshHostEntry, sock?: ConnectConfig['sock']): ConnectConfig;
/** Connect one ssh2 client (resolve on ready, reject on error/close). */
export declare function connectClient(config: ConnectConfig): Promise<Client>;
/** Cap captured output at the configured byte budget (marks truncation). */
export declare function appendOutput(target: {
    text: string;
    truncated: boolean;
}, chunk: Buffer, maxBytes: number): void;
/**
 * Build one full jump chain for an entry: hop clients connected through in
 * order, each forwarding a stream to the next destination, ending with the
 * target client. Shared by the pool and standalone shell sessions.
 */
export declare function connectChain(engine: PoolEngine, entry: SshHostEntry): Promise<{
    client: Client;
    hops: Client[];
}>;
/** Connect (or reuse) the pooled chain for one alias; pins nothing. */
export declare function acquire(engine: PoolEngine, alias: string): Promise<PoolRecord>;
/**
 * Tear down one alias's record. When `record` is given and no longer the
 * pooled record for the alias (a concurrent acquire replaced it), nothing
 * is torn down — the connection belongs to someone else now.
 */
export declare function disposeRecord(engine: PoolEngine, alias: string, record?: PoolRecord): void;
/** Close connections idle beyond the threshold (skips pinned and in-flight). */
export declare function sweepPool(engine: PoolEngine): void;
/**
 * Run `fn` with a live client for `alias`, reconnecting (up to the
 * attempt budget) when the connection broke mid-flight.
 */
export declare function withClient<T>(engine: PoolEngine, alias: string, fn: (client: Client) => Promise<T>, attempts?: number): Promise<T>;
/** Run one command on `alias` (reusing the pooled connection). */
export declare function execCommand(engine: PoolEngine, alias: string, command: string, timeoutMs?: number): Promise<ExecResult>;
