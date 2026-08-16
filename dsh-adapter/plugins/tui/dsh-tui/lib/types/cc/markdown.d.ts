/**
 * Markdown-to-ANSI renderer over marked's token stream.
 *
 * Converts the shared marked lexer output into styled terminal text: quote
 * gutters, syntax-highlighted fenced blocks, indented list bullets with
 * depth-based numbering, and alignment-padded tables. The visual conventions
 * (▎ bars for blockquotes, theme-colored inline code, OSC 8 hyperlinks) are
 * standard terminal markdown idioms, but this is an independent
 * implementation: a single dispatch switch fans tokens out to dedicated
 * per-type render functions, and all recursive calls thread one immutable
 * RenderState (parent token, list depth, list ordinal, highlighter) instead
 * of passing positional arguments.
 */
import { type Token } from 'marked';
import type { CliHighlight } from './cliHighlight.js';
/**
 * Strip tool-analysis XML blocks (`<commit_analysis>`, `<context>`,
 * `<function_analysis>`, `<pr_analysis>`) and their contents, then trim.
 * @param content - Markdown that may wrap the tool-analysis tag blocks.
 * @returns The content with those blocks removed and whitespace trimmed.
 */
export declare function stripPromptXMLTags(content: string): string;
/**
 * Configure the shared `marked` instance once. Strikethrough parsing is
 * disabled so that `~100` renders literally instead of as deleted text —
 * models use `~` far more often for "approximate" than for real
 * strikethrough.
 */
export declare function configureMarked(): void;
/**
 * Render one marked token to ANSI text, recursing into child tokens.
 * @param token - The marked token to render.
 * @param listDepth - Nesting depth of the enclosing list; drives indentation and numbering style.
 * @param orderedListNumber - Current ordinal of the enclosing ordered list item, or null for unordered lists.
 * @param parent - The parent token; linkification is skipped inside links and prefixes are added inside list items.
 * @param highlight - Optional cli-highlight surface for code blocks; null disables syntax highlighting.
 * @returns The rendered ANSI string for the token, or '' for unrendered token types.
 */
export declare function formatToken(token: Token, listDepth?: number, orderedListNumber?: number | null, parent?: Token | null, highlight?: CliHighlight | null): string;
/**
 * Render markdown content to ANSI-styled text via the shared `marked` instance.
 * @param content - Markdown source to render.
 * @param highlight - Optional cli-highlight surface for code blocks; null disables syntax highlighting.
 * @returns The rendered ANSI string, trimmed.
 */
export declare function applyMarkdown(content: string, highlight?: CliHighlight | null): string;
/**
 * Pad `content` to `targetWidth` according to alignment. `displayWidth` is
 * the visible width of `content` (callers compute it via stringWidth on the
 * ANSI-stripped text, so embedded escape codes don't affect padding).
 * @param content - The text to pad, which may carry ANSI codes.
 * @param displayWidth - Visible width of `content` without ANSI codes.
 * @param targetWidth - Column width to pad `content` to.
 * @param align - Alignment: 'left', 'center', 'right', or null/undefined for left.
 * @returns `content` padded with spaces to `targetWidth`.
 */
export declare function padAligned(content: string, displayWidth: number, targetWidth: number, align: 'left' | 'center' | 'right' | null | undefined): string;
//# sourceMappingURL=markdown.d.ts.map