/**
 * Mobile-surface theme: light by default, dark via an explicit persisted
 * toggle. The standalone page boots without the shell, so there is no theme
 * system to inherit — the choice is stored in localStorage and applied as a
 * `data-theme` attribute on <html>; the stylesheet defines both palettes
 * under `:root` (light) / `:root[data-theme='dark']` (dark).
 *
 * A tiny module store (subscribe/get) keeps the toggle button and the boot
 * path in sync without threading props through the three view levels.
 */
export type MobileTheme = 'light' | 'dark';
/** Current theme (light unless the user explicitly toggled to dark). */
export declare function getMobileTheme(): MobileTheme;
/** Subscribe to theme changes; returns the unsubscribe function. */
export declare function subscribeMobileTheme(listener: () => void): () => void;
/** Set the theme explicitly (persisted + applied to the document). */
export declare function setMobileTheme(theme: MobileTheme): void;
/** Flip light/dark and return the new theme. */
export declare function toggleMobileTheme(): MobileTheme;
/** Apply the persisted (or default) theme once at boot, before first paint. */
export declare function initMobileTheme(): void;
//# sourceMappingURL=mobile-theme.d.ts.map