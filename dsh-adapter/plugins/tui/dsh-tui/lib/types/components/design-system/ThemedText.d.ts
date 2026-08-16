import React from 'react';
import type { Color, Styles } from '../../ink/styles.js';
import { type Theme } from '../../theme.js';
/**
 * Colors uncolored ThemedText in the subtree. Precedence: explicit `color` >
 * this > dimColor (in the Claude Code visual language, where message rows
 * set it to `text` on hover).
 */
export declare const TextHoverColorContext: React.Context<keyof Theme | undefined>;
export type Props = {
    /**
     * Change text color. Accepts a theme key or raw color value.
     */
    readonly color?: keyof Theme | Color;
    /**
     * Same as `color`, but for background.
     */
    readonly backgroundColor?: keyof Theme | Color;
    /**
     * Dim the color using the theme's inactive color.
     * This is compatible with bold (unlike ANSI dim).
     */
    readonly dimColor?: boolean;
    /**
     * Make the text bold.
     */
    readonly bold?: boolean;
    /**
     * Make the text italic.
     */
    readonly italic?: boolean;
    /**
     * Make the text underlined.
     */
    readonly underline?: boolean;
    /**
     * Make the text crossed with a line.
     */
    readonly strikethrough?: boolean;
    /**
     * Inverse background and foreground colors.
     */
    readonly inverse?: boolean;
    /**
     * This property tells Ink to wrap or truncate text if its width is larger than container.
     */
    readonly wrap?: Styles['textWrap'];
    readonly children?: React.ReactNode;
};
/**
 * Theme-aware Text component that resolves theme color keys to raw colors
 * (in the Claude Code visual language). This is what lets every ported CC
 * component use `color="subtle"`-style theme keys unchanged.
 */
export default function ThemedText({ color, backgroundColor, dimColor, bold, italic, underline, strikethrough, inverse, wrap, children, }: Props): React.ReactNode;
//# sourceMappingURL=ThemedText.d.ts.map