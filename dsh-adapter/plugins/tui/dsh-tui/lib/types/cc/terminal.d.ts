/**
 * The `(ctrl+o to expand)` hint, dimmed.
 * @returns The dim hint text.
 */
export declare function ctrlOToExpand(): string;
/**
 * Render `content` with line-based truncation for terminal display.
 * Content that fits in the visible budget is returned unchanged (modulo
 * trailing whitespace); longer content is folded with an overflow hint.
 * @param content - Text to render; trailing whitespace is trimmed.
 * @param terminalWidth - Terminal width in columns; the wrap width reserves
 *                        4 columns of padding.
 * @param suppressExpandHint - When true, omit the `(ctrl+o to expand)`
 *                             suffix from the overflow hint.
 * @returns The truncated text, or `''` when `content` is blank after trimming.
 */
export declare function renderTruncatedContent(content: string, terminalWidth: number, suppressExpandHint?: boolean): string;
//# sourceMappingURL=terminal.d.ts.map