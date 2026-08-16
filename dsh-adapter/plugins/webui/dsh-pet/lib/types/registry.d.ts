/**
 * Pet registry — the multi-pet contract. One pet is a directory holding a
 * 'pet.json' manifest plus an atlas image; nothing else is required, and no
 * host or client code changes when a pet is added. The registry scans three
 * sources, later sources overriding earlier ones on an id collision:
 *
 *   1. the package's own 'assets' subdirectories (built-in pets);
 *   2. '${CODEX_HOME:-~/.codex}/pets' subdirectories (hatch-pet custom pets);
 *   3. 'PetConfig.pets' manifests composed by the embedding application
 *      (highest precedence).
 *
 * The manifest follows the Codex/hatch-pet contract (8 columns x 9 rows of
 * 192x208 cells, the 9-state row order below). Legacy whale-girl manifests
 * that only carry 'frames' keep working: geometry, per-row frame counts and
 * per-track rhythm all fall back to the hatch-pet contract defaults, and the
 * whale-girl manifest overrides its own durations.
 * @module @linxin666/dsh-pet/registry
 */
import type { PetAnimation } from './state.ts';
/** Fixed row order of the 9-state animation contract. */
export declare const PET_ROW_ORDER: readonly PetAnimation[];
/** Atlas cell size in px. */
export interface PetCell {
    width: number;
    height: number;
}
/** Atlas cell size in px (Codex/hatch-pet contract). */
export declare const DEFAULT_PET_CELL: PetCell;
/** Columns per row (max frames per track). */
export declare const DEFAULT_PET_COLUMNS = 8;
/** Rows in the atlas (fixed by the animation contract). */
export declare const DEFAULT_PET_ROW_COUNT = 9;
/**
 * Per-row used-column counts from the hatch-pet contract table. Manifests
 * that carry no 'frames' field (the Codex custom-pet shape) resolve here.
 */
export declare const DEFAULT_FRAME_COUNTS: readonly number[];
/** Absolute package root, resolved from a module URL (lib/ or src/). */
export declare function petPackageRoot(importMetaUrl: string): string;
/** Resolve the hatch-pet custom pets directory (CODEX_HOME or ~/.codex). */
export declare function codexPetsDir(env?: NodeJS.ProcessEnv, home?: string): string;
/** One animation track as served to the browser half. */
export interface PetTrackDef {
    /** Frame indices (columns) played in order. */
    frames: number[];
    /** Per-frame duration in ms; same length as frames. */
    durations: number[];
    /** Whether the track loops; a non-looping track holds its last frame. */
    loop: boolean;
    /** Track to switch to after a non-looping track finishes. */
    fallback?: PetAnimation;
}
/** Default per-track rhythm (hatch-pet contract table). */
export declare const DEFAULT_TRACK_PATTERNS: Record<PetAnimation, {
    durations: number[];
    loop: boolean;
    fallback?: PetAnimation;
}>;
/** Manifest shape a pet directory (or 'PetConfig.pets' entry) declares. */
export interface PetManifest {
    /** Unique pet id, lowercase kebab-case. */
    id: string;
    /** Human-readable display name (settings selector, panel header). */
    displayName: string;
    /** One-line description. */
    description?: string;
    /** Atlas path relative to the manifest's directory. */
    spritesheetPath: string;
    /** Atlas cell size; defaults to the Codex contract 192x208. */
    cell?: {
        width?: number;
        height?: number;
    };
    /** Columns per row; defaults to 8. */
    columns?: number;
    /**
     * Per-row frame counts (9 entries, row order above). Manifests that omit
     * it resolve the hatch-pet contract table.
     */
    frames?: number[];
    /** Optional per-track rhythm overrides; omitted tracks use the defaults. */
    tracks?: Partial<Record<PetAnimation, PetTrackOverride>>;
}
/** Per-track rhythm overrides a manifest may carry. */
export interface PetTrackOverride {
    /** Per-frame durations in ms (cycled to the row's frame count). */
    durations?: number[];
    /** Whether the track loops. */
    loop?: boolean;
    /** Track to switch to after a non-looping track finishes. */
    fallback?: PetAnimation;
}
/** A normalized pet as served to the browser half. */
export interface PetDefinition {
    id: string;
    displayName: string;
    description: string;
    /** Atlas cell size in px. */
    cell: PetCell;
    /** Columns per row. */
    columns: number;
    /** Per-row frame counts (length 9, row order above). */
    rows: number[];
    /** Fully resolved animation tracks (frames + durations + loop/fallback). */
    tracks: Record<PetAnimation, PetTrackDef>;
    /** Browser URL of the atlas (served by the host asset route). */
    atlasUrl: string;
    /** Browser URL of the manifest (served by the host asset route). */
    manifestUrl: string;
}
/** A resolved pet plus its host-side file location. */
export interface PetEntry extends PetDefinition {
    /** Absolute directory holding the manifest and atlas. */
    dir: string;
    /** Atlas path relative to 'dir' (declared by the manifest). */
    spritesheetPath: string;
}
/** Registry load result: resolved entries plus load warnings. */
export interface PetRegistry {
    entries: PetEntry[];
    warnings: string[];
    byId(id: string): PetEntry | undefined;
    /** The pet an installation falls back to when the selection is unknown. */
    defaultEntry(): PetEntry;
}
/** Registry sources. */
export interface PetRegistryOptions {
    /** Absolute package root whose 'assets/*' hold built-in pets. */
    packageRoot: string;
    /** Asset route prefix the browser URLs are built under. */
    assetPrefix?: string;
    /** Custom pet directory (defaults to '${CODEX_HOME:-~/.codex}/pets'). */
    petsDir?: string;
    /** Extra manifest entries composed by the embedding application. */
    extra?: readonly PetManifest[];
}
/**
 * Normalize one parsed manifest into a renderable pet entry, or undefined
 * (with a warning recorded) when the manifest violates the contract.
 */
export declare function resolvePetManifest(raw: unknown, dir: string, options?: {
    assetPrefix?: string;
    warnings?: string[];
}): PetEntry | undefined;
/**
 * Load the pet registry: built-in 'assets/*' first, then the hatch-pet
 * custom pets directory, then composed 'extra' manifests (each later source
 * overrides an earlier one on id collision). The registry never throws on a
 * bad manifest: it skips it and records a warning.
 */
export declare function loadPetRegistry(options: PetRegistryOptions): PetRegistry;
/** Strip host-only fields, leaving the client-visible definition. */
export declare function petEntryView(entry: PetEntry): PetDefinition;
/** The absolute file a pet's atlas resolves to (host asset route). */
export declare function petAtlasFile(entry: PetEntry): string;
/** The directory basename of one entry (legacy asset URL alias, e.g. whale). */
export declare function petDirAlias(entry: PetEntry): string;
//# sourceMappingURL=registry.d.ts.map