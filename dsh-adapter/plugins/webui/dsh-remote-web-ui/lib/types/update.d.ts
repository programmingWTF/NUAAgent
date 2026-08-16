/**
 * Remote update support for the dsh-web-ui family — host half. Detects the
 * installed aggregate package (@linxin666/dsh-web-ui-all) and its family
 * children, probes the npm registry for newer releases, and runs the actual
 * update as `pnpm update --latest` inside the owning dsh profile directory.
 *
 * Pure logic with injected seams (manifest reading, registry fetches, process
 * spawning) so the whole surface is unit-testable without touching disk,
 * network, or a real profile.
 */
import { spawn } from 'node:child_process';
/** npm registry base used for version probes. */
export declare const NPM_REGISTRY = "https://registry.npmjs.org";
/** The family scope every dsh-web-ui package is published under. */
export declare const FAMILY_SCOPE = "@linxin666/";
/** The aggregate package that is the canonical update entry point. */
export declare const AGGREGATE_PACKAGE = "@linxin666/dsh-web-ui-all";
/** Fallback anchor: this plugin's own package when the aggregate is absent. */
export declare const SELF_PACKAGE = "@linxin666/dsh-remote-web-ui";
/** A parsed semantic version (prerelease identifiers kept as strings). */
export interface SemverParts {
    major: number;
    minor: number;
    patch: number;
    /** Dot-split prerelease identifiers; empty when absent. */
    prerelease: string[];
}
/**
 * Parse a semantic version string (leading `v` tolerated, build metadata
 * ignored). Returns undefined for unparseable input.
 * @param value - the version string, e.g. `0.1.10` or `0.1.11-rc.1`.
 * @returns the parsed parts, or undefined.
 */
export declare function parseSemver(value: string): SemverParts | undefined;
/**
 * Compare two semantic versions per the semver precedence rules (a release
 * outranks any of its prereleases; numeric prerelease identifiers compare
 * numerically and sort below alphanumeric ones). An unparseable version sorts
 * below every parseable one; two unparseable versions compare equal.
 * @param a - first version.
 * @param b - second version.
 * @returns negative when a < b, 0 when equal, positive when a > b.
 */
export declare function compareVersions(a: string, b: string): number;
/** The found dsh profile owning an installed package. */
export interface FoundProfile {
    /** Profile name (e.g. `web`). */
    name: string;
    /** Absolute profile directory. */
    dir: string;
}
/**
 * Locate the owning dsh profile by walking up from an installed package's
 * manifest until a manifest named `dsh-profile-*` appears (the profile
 * directory is the first ancestor whose package.json carries that name).
 * @param anchorManifestPath - absolute path of the anchor package.json.
 * @returns the profile name/dir, or undefined when not profile-installed.
 */
export declare function findProfile(anchorManifestPath: string): FoundProfile | undefined;
/** A package version spec in a manifest dependencies map. */
type DependencySpec = string | {
    version: string;
} | undefined;
/** Whether a dependency spec is a local link/file/dev-mode install. */
export declare function isLinkedSpec(spec: DependencySpec): boolean;
/** One package's current-vs-latest comparison. */
export interface UpdatePackageStatus {
    /** Package name. */
    name: string;
    /** Locally installed version. */
    current: string;
    /** Latest npm release — undefined when the registry probe failed. */
    latest?: string;
    /** Whether npm carries a strictly newer release. */
    outdated: boolean;
}
/** The full update-status snapshot served to the browser half. */
export interface UpdateStatus {
    /** npm = registry-managed (updatable); link = local dev install; missing = no anchor package. */
    mode: 'npm' | 'link' | 'missing';
    /** Owning profile name (npm mode). */
    profileName?: string;
    /** The anchor package the update targets. */
    anchor?: string;
    /** Per-package version comparison (anchor first). */
    packages: UpdatePackageStatus[];
    /** True when any package has a newer npm release. */
    outdated: boolean;
    /** Whole-check failure (e.g. registry unreachable). */
    error?: string;
}
/** Dependency-injection seam for checkUpdates (testable without network). */
export interface UpdateCheckDeps {
    /** Absolute path of the anchor package manifest, when resolvable. */
    anchorManifestPath?: string;
    /** Resolve a package.json specifier to its absolute path (host require). */
    resolve(specifier: string): string | undefined;
    /** Probe one package's latest npm version; undefined on failure. */
    fetchLatest(name: string): Promise<string | undefined>;
}
/**
 * Resolve the anchor package's manifest path. The aggregate package is the
 * canonical entry point; this plugin's own package is the fallback. Both a
 * throwing resolve and an undefined return mean "not installed" and move on
 * to the next candidate.
 * @param resolve - a Node resolve implementation scoped to the host process.
 * @returns the absolute manifest path, or undefined when neither is installed.
 */
export declare function resolveAnchorManifest(resolve: (specifier: string) => string | undefined): string | undefined;
/** The resolved update target: the profile pnpm runs in plus the package list. */
export interface UpdateTarget {
    /** Owning profile name. */
    profileName: string;
    /** Absolute profile directory pnpm runs in. */
    profileDir: string;
    /** The package names pnpm updates (anchor first). */
    packages: string[];
}
/**
 * Resolve what an update would touch: the owning profile directory and the
 * family package list. Fails with an error code when the anchor is missing
 * ('not-found') or is a local dev install ('link').
 * @param deps - the anchor manifest path (resolveAnchorManifest output).
 * @returns the target, or the failure code.
 */
export declare function resolveUpdateTarget(deps: {
    anchorManifestPath?: string;
}): UpdateTarget | {
    error: 'not-found' | 'link';
};
/** Family children of the anchor: its dependencies under the family scope. */
export declare function familyChildren(anchorManifest: Record<string, unknown>): string[];
/**
 * Probe the npm registry for one package's latest release.
 * @param name - the package name (scope slash URL-encoded).
 * @param fetchImpl - the fetch implementation (global fetch in the host).
 * @param timeoutMs - probe timeout.
 * @returns the latest version string, or undefined on any failure.
 */
export declare function fetchLatestVersion(name: string, fetchImpl: (url: string) => Promise<{
    ok: boolean;
    json(): Promise<unknown>;
}>, timeoutMs?: number): Promise<string | undefined>;
/**
 * Build the update status: locate the anchor, detect the install mode, and
 * compare every family package against the npm registry.
 * @param deps - manifest resolution + registry probe seams.
 * @returns the status snapshot.
 */
export declare function checkUpdates(deps: UpdateCheckDeps): Promise<UpdateStatus>;
/** Structured failure codes the browser half translates. */
export type UpdateErrorCode = 
/** pnpm is not on PATH. */
'pnpm-missing'
/** The install exceeded the hard timeout. */
 | 'timeout'
/** The anchor package is not installed. */
 | 'not-found'
/** The anchor is a local link/dev install pnpm cannot update. */
 | 'link'
/** pnpm exited non-zero. */
 | 'pnpm-failed'
/** pnpm exited 0 but the installed versions did not move. */
 | 'stale'
/** pnpm exited 0 but the post-run version check could not verify the install. */
 | 'verify-failed';
/** Result of one update run. */
export interface UpdateRunResult {
    ok: boolean;
    /** pnpm exit code (null when the process never started or was killed). */
    exitCode: number | null;
    /** Captured pnpm output tail (diagnostics for the panel). */
    output: string;
    /** Human-readable failure description (fallback copy). */
    error?: string;
    /** Structured failure code (translated by the browser half). */
    errorCode?: UpdateErrorCode;
}
/** Dependency-injection seam for runUpdate. */
export interface UpdateRunDeps {
    /** The profile directory pnpm runs in. */
    profileDir: string;
    /** The package names pnpm updates. */
    packages: readonly string[];
    /** Spawn seam (defaults to child_process.spawn). */
    spawnImpl?: typeof spawn;
    /** Hard timeout; the child is killed on expiry. */
    timeoutMs?: number;
    /** Platform override (defaults to process.platform; test seam). */
    platform?: NodeJS.Platform;
}
/**
 * Run the update inside the profile directory. Tries pnpm first, falls back
 * to corepack and then npx when the previous command is missing (ENOENT);
 * all candidates share one hard timeout and keep accumulating output.
 * @param deps - profile dir, package list, and spawn/timeout seams.
 * @returns the outcome with captured output.
 */
export declare function runUpdate(deps: UpdateRunDeps): Promise<UpdateRunResult>;
/** Seam set for the verified update run (run + post-run status check). */
export interface UpdateRunVerifiedDeps {
    /** The pnpm run (profile dir + package list). */
    run: UpdateRunDeps;
    /** The post-run status check (same seams as checkUpdates). */
    check: UpdateCheckDeps;
}
/**
 * Run the update, then verify the installed versions actually moved. pnpm
 * exits 0 even when it silently kept the installed versions — runUpdate
 * overrides pnpm 11's `minimumReleaseAge` gate (default 24 h) with
 * `--config.minimumReleaseAge=0`, but an older pnpm without the override or
 * another silent no-op can still keep versions in place — so a green exit
 * alone must not report a misleading "update complete". Re-read the
 * installed versions afterwards and surface a `stale` failure (with the
 * captured pnpm output) when nothing moved, so the panel can tell the user
 * how to unblock the gate instead of claiming success.
 *
 * The stale decision anchors on the pre-run installed versions, not on the
 * registry latest: under a lenient gate pnpm may move 0.1.12 -> 0.1.13 while
 * latest stays 0.1.15 — that is a real update, not stale. The post-run anchor
 * path is re-resolved rather than reused from boot time: pnpm removes the old
 * version's .pnpm directory on update, so a boot-time captured path would
 * fail to read and collapse a successful update into a bogus 'missing'.
 *
 * A green exit whose verification has nothing to compare (registry probe
 * outage, missing anchor, non-npm mode) is reported as `verify-failed` — it
 * must never read as success. A green exit where no package moved but the
 * post-run check could not prove the install is fully current (a partial
 * probe failure hides whether a gate kept something back) is also
 * `verify-failed`: it must not collapse into a success either.
 * @param deps - the run and check seams.
 * @returns the run result; `stale` when exit 0 left every version in place,
 * `verify-failed` when the post-run check could not verify anything.
 */
export declare function runUpdateVerified(deps: UpdateRunVerifiedDeps): Promise<UpdateRunResult>;
export {};
//# sourceMappingURL=update.d.ts.map