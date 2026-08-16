import React from 'react';
import type { Channel } from '../dsh-adapter/channel.js';
import type { WaveBand } from '../dsh-adapter/types.js';
/**
 * The footer under the prompt input, in Claude Code's PromptInputFooter
 * layout: the segmented context progress bar on its own first line, the
 * status line below (left group: model · tokens · think level · cache · tps
 * gauge/sparkline; right group: git · cwd · title, right-aligned), and the
 * mode/hint line last. The right side of the footer shows the latest
 * transient notification (errors in red, warnings in amber — CC style).
 */
export declare function StatusLine({ channel, selectionActive, helpOpen, wake, }: {
    channel: Channel;
    selectionActive?: boolean;
    helpOpen?: boolean;
    /**
     * The session projected onto the status line's few columns, plus the
     * animation tick and the self-retiring key hint.
     *
     * A strip that shows the session's shape keeps earning its space in a way a
     * static label cannot, and it carries the failure signal in position rather
     * than as a count in the corner. Absent in headless embeds, where nothing
     * folds the event log.
     */
    wake?: {
        band: WaveBand;
        hint?: string;
        tick: number;
    };
}): React.JSX.Element;
//# sourceMappingURL=StatusLine.d.ts.map