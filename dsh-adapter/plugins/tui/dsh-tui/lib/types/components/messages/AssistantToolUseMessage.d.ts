import React from 'react';
import type { ToolRow } from '../../dsh-adapter/channel.js';
type Props = {
    tool: ToolRow;
    /** Adds the top margin between messages (CC: addMargin). */
    addMargin: boolean;
    /** Ctrl+O verbose: show full args/result instead of previews. */
    verbose: boolean;
    /** Message-selection mode highlight. */
    isSelected?: boolean;
    /** Row expanded on its own (persistent hover-grey background, CC). */
    isExpanded?: boolean;
    /**
     * Trajectory pointer, rendered as one more `⎿` line under a failed call.
     *
     * It appears on the NEWEST unseen failure only, so a session with a dozen
     * failed calls still shows exactly one pointer — the moment of failure is
     * where the trajectory is worth mentioning, and mentioning it twelve times
     * is worth less than mentioning it once.
     */
    footnote?: string;
};
/**
 * Tool-call card: `● Edit /path` header with a blinking status dot, then the
 * structured body under a `  ⎿  ` gutter — diff hunks in red/green, terminal
 * output, read content — instead of the raw result dump (mirroring Claude Code's `AssistantToolUseMessage.tsx` + the dsh-tools presentation views the
 * channel captures per call).
 */
export declare function AssistantToolUseMessage({ tool, addMargin, verbose, isSelected, isExpanded, footnote, }: Props): React.ReactNode;
export {};
//# sourceMappingURL=AssistantToolUseMessage.d.ts.map