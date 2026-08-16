import React from 'react';
import { type Channel } from '../dsh-adapter/channel.js';
import type { QuestionStore } from '../dsh-adapter/questions.js';
import { ApprovalStore } from '../dsh-adapter/approvals.js';
export declare function Chat({ channel, questionStore, approvalStore, onExit, onUpdate, fullscreen, trajectorySeen: trajectorySeenProp, }: {
    channel: Channel;
    questionStore: QuestionStore;
    /**
     * The approval seam's UI store. Optional: hosts without an approval
     * channel (headless scripts, older embeds) render Chat without it and
     * simply never see an approval panel — the question panel keeps its seat.
     */
    approvalStore?: ApprovalStore;
    onExit: () => void;
    /** Update the installed package and restart the current TUI process. */
    onUpdate?: () => void;
    /**
     * True when the host already wrapped this tree in `<AlternateScreen>`
     * (`fullscreen: true`). Both full-screen surfaces need this — the trajectory
     * scene and the session browser: entering the alt
     * screen a second time is harmless, but the inner unmount's DEC 1049 exit
     * would drop the whole app back to the main screen.
     */
    fullscreen?: boolean;
    /**
     * Whether the trajectory has been opened before on this machine.
     *
     * A prop rather than a filesystem read inside the component: a render
     * initializer touching disk is the wrong layer, and hosts that already know
     * (or tests that need determinism) can simply say. Falls back to the
     * persisted flag when the host does not supply one.
     */
    trajectorySeen?: boolean;
}): React.JSX.Element;
//# sourceMappingURL=Chat.d.ts.map