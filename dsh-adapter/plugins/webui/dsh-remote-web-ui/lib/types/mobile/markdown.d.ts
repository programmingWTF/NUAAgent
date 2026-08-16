/**
 * A compact GFM-subset markdown renderer for the mobile chat: headings,
 * paragraphs, fenced + inline code, bold/italic/strikethrough, links,
 * images, lists, blockquotes, hr, and tables. All HTML is escaped before
 * transformation — the output only ever contains the renderer's own tags.
 * Dependency-free on purpose (the mobile bundle stays at ~456 KB); the
 * escape-first + protocol allow-list design mirrors the desktop panel's
 * preview renderer (dsh-aionui-panel/src/client/preview/markdown.ts).
 * Pure and exported for tests.
 * @module dsh-remote-web-ui/mobile/markdown
 */
/** Escape HTML special characters. */
export declare function escapeHtml(text: string): string;
/**
 * Guard a raw link/image target against dangerous protocols. Returns the
 * (trimmed) raw string when safe, else null. Only http:, https:, mailto:
 * and fragment anchors (#...) are allowed; anything with another scheme
 * — javascript:, data:, vbscript:, etc. — is rejected so the value never
 * reaches dangerouslySetInnerHTML.
 */
export declare function safeUrl(raw: string): string | null;
/** Inline pass: code spans, bold, italic, strikethrough, images, links. */
export declare function renderInline(text: string): string;
/** Render a markdown document to HTML (block pass). */
export declare function renderMarkdown(source: string): string;
//# sourceMappingURL=markdown.d.ts.map