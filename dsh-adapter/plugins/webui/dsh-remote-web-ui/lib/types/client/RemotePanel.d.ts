import type { TranslateNS } from '@nuaagent/client-ui-slots';
import type { PairingPhase } from '../pairing.ts';
import { type TunnelStatusFrame } from './pair-api.ts';
/** The panel's view state, owned by the entry component. */
export type PanelState = {
    kind: 'lan-required';
} | {
    kind: 'loopback-required';
} | {
    kind: 'unreachable';
} | {
    kind: 'ready';
    url: string;
    expiresAt: number;
    expired: boolean;
    phase: PairingPhase;
    deviceCount: number;
    onlineCount: number;
    /** The LAN literal the current QR was built from. */
    address: string;
    /** Every constructible LAN literal (interface order). */
    lanAddresses: string[];
    /** Whether this QR is built on the configured public (tunneled) base. */
    public: boolean;
    /** The configured public (tunneled) base URL, when present. */
    publicBaseUrl?: string;
    /** Auto-tunnel status, while the auto-tunnel feature is active. */
    tunnel?: TunnelStatusFrame;
};
/** Full panel props: copy + view state + actions. */
export interface RemotePanelProps {
    t: TranslateNS<'remote'>;
    state: PanelState;
    copied: boolean;
    onClose(): void;
    onStop(): void;
    onRefresh(): void;
    onCopy(): void;
    /** Re-mint the QR against a different LAN address. */
    onPickAddress(address: string): void;
    /** Re-mint the QR against the configured public (tunneled) base. */
    onPickPublic(): void;
}
/**
 * Render the pairing panel.
 * @param props - copy, state, and actions.
 * @returns the panel element tree.
 */
export declare function RemotePanel({ t, state, copied, onClose, onStop, onRefresh, onCopy, onPickAddress, onPickPublic }: RemotePanelProps): import("react").JSX.Element;
//# sourceMappingURL=RemotePanel.d.ts.map