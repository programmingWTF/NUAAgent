import type { SshApi } from '../api.ts';
import type { TunnelInfo } from '../../protocol.ts';
/** Live-tunnel polling interval while the tab is mounted (ms). */
export declare const TUNNEL_POLL_MS = 5000;
/**
 * Return `next` only when the tunnel list changed in a user-visible way
 * (identity, ordering or any renderable field), else `null` so a poll tick
 * with no real change keeps the previous reference and React skips the
 * re-render. `prev === null` (first load) always accepts the list.
 */
export declare function diffTunnels(prev: TunnelInfo[] | null, next: TunnelInfo[]): TunnelInfo[] | null;
/** Tunnels tab props. */
export interface TunnelsTabProps {
    api: SshApi;
}
/** The tunnels tab. */
export declare function TunnelsTab({ api }: TunnelsTabProps): import("react").JSX.Element;
