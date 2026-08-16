import React from 'react';
import { type TrajBuild } from '../dsh-adapter/trajectory/index.js';
import type { Channel } from '../dsh-adapter/channel.js';
export type TrajectoryView = 'timeline' | 'hotspot';
export declare function TrajectoryScene({ channel, build, onClose, }: {
    channel: Channel;
    /**
     * The session projection, folded by the host. Passing it in rather than
     * folding here means the chat chrome and the scene share one build, so
     * opening the scene costs no work at all.
     */
    build: TrajBuild;
    /** Leave the scene and return to the conversation. */
    onClose: () => void;
}): React.ReactNode;
//# sourceMappingURL=TrajectoryScene.d.ts.map