/**
 * Chat-transcript mermaid enhancement: the core conversation renderer emits
 * fenced code as `pre > code.language-mermaid`, and the shell has no slot
 * for message-body post-processing — so this component rides the
 * conversation input dock as a zero-render sentinel and observes the
 * document for mermaid blocks the transcript mounts. Blocks inside the
 * preview panel's own subtree are excluded (each surface owns its blocks).
 *
 * Streaming awareness: an assistant message re-renders continuously, so a
 * diagram fence is often incomplete mid-stream. Renders that fail restore
 * the block and the next mutation retries it — once the fence closes the
 * diagram lands. Mutations are debounced to one rAF and the observer is
 * disconnected on unmount.
 * @module dsh-aionui-panel/client/chat/mermaid-chat
 */
import type { JSX } from 'react';
/** Hidden sentinel: renders nothing, owns the transcript observer. */
export declare function MermaidChatEnhancer(): JSX.Element | null;
//# sourceMappingURL=mermaid-chat.d.ts.map