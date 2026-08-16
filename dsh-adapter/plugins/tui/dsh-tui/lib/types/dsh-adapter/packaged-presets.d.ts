export interface PackagedPresetResult {
    id: string;
    status: 'installed' | 'updated' | 'current' | 'conflict';
}
export interface PackagedPresetOptions {
    dshHome?: string;
    sourceRoot?: string;
    moduleUrl?: string;
}
/** Resolve the package asset in both src/tsx and compiled npm layouts. */
export declare function packagedPresetRoot(moduleUrl?: string): string;
/**
 * Materialize presets shipped by dsh-tui into the Harness user preset root.
 *
 * The official launcher replaces the roster's configured roots with its own
 * shipped root at the end of profile composition, so a bundle patch cannot
 * add a second system root. The user root is the roster's supported extension
 * seam and is discovered on every list/resolve call. Existing unmarked
 * directories are never overwritten.
 */
export declare function ensurePackagedPresets(options?: PackagedPresetOptions): PackagedPresetResult[];
//# sourceMappingURL=packaged-presets.d.ts.map