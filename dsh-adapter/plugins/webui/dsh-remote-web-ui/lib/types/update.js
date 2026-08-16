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
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
/** npm registry base used for version probes. */
export const NPM_REGISTRY = 'https://registry.npmjs.org';
/** The family scope every dsh-web-ui package is published under. */
export const FAMILY_SCOPE = '@linxin666/';
/** The aggregate package that is the canonical update entry point. */
export const AGGREGATE_PACKAGE = '@linxin666/dsh-web-ui-all';
/** Fallback anchor: this plugin's own package when the aggregate is absent. */
export const SELF_PACKAGE = '@linxin666/dsh-remote-web-ui';
/** A profile manifest `name` prefix (e.g. `dsh-profile-web`). */
const PROFILE_NAME_PREFIX = 'dsh-profile-';
/** How many ancestor directories a profile search walks before giving up. */
const PROFILE_WALK_DEPTH = 12;
/**
 * Parse a semantic version string (leading `v` tolerated, build metadata
 * ignored). Returns undefined for unparseable input.
 * @param value - the version string, e.g. `0.1.10` or `0.1.11-rc.1`.
 * @returns the parsed parts, or undefined.
 */
export function parseSemver(value) {
    const match = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(value.trim());
    if (match === null)
        return undefined;
    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
        prerelease: match[4] === undefined ? [] : match[4].split('.'),
    };
}
/**
 * Compare two semantic versions per the semver precedence rules (a release
 * outranks any of its prereleases; numeric prerelease identifiers compare
 * numerically and sort below alphanumeric ones). An unparseable version sorts
 * below every parseable one; two unparseable versions compare equal.
 * @param a - first version.
 * @param b - second version.
 * @returns negative when a < b, 0 when equal, positive when a > b.
 */
export function compareVersions(a, b) {
    const pa = parseSemver(a);
    const pb = parseSemver(b);
    if (pa === undefined && pb === undefined)
        return 0;
    if (pa === undefined)
        return -1;
    if (pb === undefined)
        return 1;
    for (const key of ['major', 'minor', 'patch']) {
        if (pa[key] !== pb[key])
            return pa[key] < pb[key] ? -1 : 1;
    }
    if (pa.prerelease.length === 0 && pb.prerelease.length === 0)
        return 0;
    if (pa.prerelease.length === 0)
        return 1;
    if (pb.prerelease.length === 0)
        return -1;
    for (let index = 0; index < Math.max(pa.prerelease.length, pb.prerelease.length); index++) {
        const ra = pa.prerelease[index];
        const rb = pb.prerelease[index];
        if (ra === undefined)
            return -1;
        if (rb === undefined)
            return 1;
        if (ra === rb)
            continue;
        const numericA = /^\d+$/.test(ra);
        const numericB = /^\d+$/.test(rb);
        if (numericA && numericB)
            return Number(ra) < Number(rb) ? -1 : 1;
        // Numeric identifiers always sort below alphanumeric ones.
        if (numericA)
            return -1;
        if (numericB)
            return 1;
        return ra < rb ? -1 : 1;
    }
    return 0;
}
/** Read a package.json at a path, tolerating any parse/IO failure. */
function readManifest(path) {
    try {
        const parsed = JSON.parse(readFileSync(path, 'utf8'));
        return typeof parsed === 'object' && parsed !== null ? parsed : undefined;
    }
    catch {
        return undefined;
    }
}
/**
 * Locate the owning dsh profile by walking up from an installed package's
 * manifest until a manifest named `dsh-profile-*` appears (the profile
 * directory is the first ancestor whose package.json carries that name).
 * @param anchorManifestPath - absolute path of the anchor package.json.
 * @returns the profile name/dir, or undefined when not profile-installed.
 */
export function findProfile(anchorManifestPath) {
    let dir = dirname(anchorManifestPath);
    for (let depth = 0; depth < PROFILE_WALK_DEPTH; depth++) {
        const manifest = readManifest(join(dir, 'package.json'));
        const name = manifest?.name;
        if (typeof name === 'string' && name.startsWith(PROFILE_NAME_PREFIX)) {
            return { name: name.slice(PROFILE_NAME_PREFIX.length), dir };
        }
        const parent = dirname(dir);
        if (parent === dir)
            return undefined;
        dir = parent;
    }
    return undefined;
}
/** Whether a dependency spec is a local link/file/dev-mode install. */
export function isLinkedSpec(spec) {
    if (typeof spec !== 'string')
        return false;
    return /^(?:link|file):|^\.{1,2}(?:[/\\]|$)/.test(spec);
}
/**
 * Resolve the anchor package's manifest path. The aggregate package is the
 * canonical entry point; this plugin's own package is the fallback. Both a
 * throwing resolve and an undefined return mean "not installed" and move on
 * to the next candidate.
 * @param resolve - a Node resolve implementation scoped to the host process.
 * @returns the absolute manifest path, or undefined when neither is installed.
 */
export function resolveAnchorManifest(resolve) {
    for (const name of [AGGREGATE_PACKAGE, SELF_PACKAGE]) {
        try {
            const path = resolve(name + '/package.json');
            if (path !== undefined)
                return path;
        }
        catch {
            // Not installed — try the next candidate.
        }
    }
    return undefined;
}
/**
 * Resolve what an update would touch: the owning profile directory and the
 * family package list. Fails with an error code when the anchor is missing
 * ('not-found') or is a local dev install ('link').
 * @param deps - the anchor manifest path (resolveAnchorManifest output).
 * @returns the target, or the failure code.
 */
export function resolveUpdateTarget(deps) {
    const manifestPath = deps.anchorManifestPath;
    if (manifestPath === undefined)
        return { error: 'not-found' };
    const manifest = readManifest(manifestPath);
    if (manifest === undefined)
        return { error: 'not-found' };
    const anchor = typeof manifest.name === 'string' ? manifest.name : undefined;
    if (anchor === undefined)
        return { error: 'not-found' };
    const profile = findProfile(manifestPath);
    if (profile === undefined)
        return { error: 'link' };
    const profileManifest = readManifest(join(profile.dir, 'package.json'));
    const spec = profileManifest?.dependencies?.[anchor];
    if (isLinkedSpec(spec))
        return { error: 'link' };
    return {
        profileName: profile.name,
        profileDir: profile.dir,
        packages: [anchor, ...familyChildren(manifest)],
    };
}
/** Family children of the anchor: its dependencies under the family scope. */
export function familyChildren(anchorManifest) {
    const dependencies = anchorManifest.dependencies;
    if (typeof dependencies !== 'object' || dependencies === null)
        return [];
    const names = [];
    for (const [name, spec] of Object.entries(dependencies)) {
        if (name.startsWith(FAMILY_SCOPE) && typeof spec === 'string')
            names.push(name);
    }
    return names;
}
/**
 * Probe the npm registry for one package's latest release.
 * @param name - the package name (scope slash URL-encoded).
 * @param fetchImpl - the fetch implementation (global fetch in the host).
 * @param timeoutMs - probe timeout.
 * @returns the latest version string, or undefined on any failure.
 */
export async function fetchLatestVersion(name, fetchImpl, timeoutMs = 10_000) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => { controller.abort(); }, timeoutMs);
        try {
            const response = await fetchImpl(NPM_REGISTRY + '/' + name.replace('/', '%2F') + '/latest');
            if (!response.ok)
                return undefined;
            const body = await response.json();
            if (typeof body !== 'object' || body === null)
                return undefined;
            const version = body.version;
            return typeof version === 'string' ? version : undefined;
        }
        finally {
            clearTimeout(timer);
        }
    }
    catch {
        return undefined;
    }
}
/**
 * Sentinel for an installed version that could not be read (missing manifest
 * or resolve failure). It is a real-looking version so `checkUpdates` can
 * render the affected row, but the verified-update comparison must never
 * treat it as evidence — a read failure is not a version that "moved".
 */
const VERSION_UNKNOWN = '0.0.0';
/** The resolved current version of one family package (probe failure tolerated). */
function readInstalledVersion(resolve, name) {
    try {
        const path = resolve(name + '/package.json');
        const version = path === undefined ? undefined : readManifest(path)?.version;
        return typeof version === 'string' ? version : VERSION_UNKNOWN;
    }
    catch {
        return VERSION_UNKNOWN;
    }
}
/**
 * Build the update status: locate the anchor, detect the install mode, and
 * compare every family package against the npm registry.
 * @param deps - manifest resolution + registry probe seams.
 * @returns the status snapshot.
 */
export async function checkUpdates(deps) {
    const manifestPath = deps.anchorManifestPath;
    if (manifestPath === undefined) {
        return { mode: 'missing', packages: [], outdated: false };
    }
    const manifest = readManifest(manifestPath);
    if (manifest === undefined) {
        return { mode: 'missing', packages: [], outdated: false };
    }
    const anchor = typeof manifest.name === 'string' ? manifest.name : undefined;
    if (anchor === undefined) {
        return { mode: 'missing', packages: [], outdated: false };
    }
    // A package inside a dsh profile directory is a registry install; one that
    // lives outside every profile (e.g. a repo checkout wired through
    // link-profile.mjs) is a local dev install pnpm cannot update.
    const profile = findProfile(manifestPath);
    const profileManifest = profile === undefined ? undefined : readManifest(join(profile.dir, "package.json"));
    const linked = profile === undefined
        || isLinkedSpec(profileManifest?.dependencies?.[anchor]);
    if (profile === undefined) {
        return { mode: 'link', packages: [], outdated: false };
    }
    const names = [anchor, ...familyChildren(manifest)];
    const packages = [];
    let probeFailures = 0;
    for (const name of names) {
        const latest = await deps.fetchLatest(name);
        if (latest === undefined)
            probeFailures++;
        const current = readInstalledVersion(deps.resolve, name);
        packages.push({
            name,
            current,
            latest,
            outdated: latest !== undefined && latest !== current && compareVersions(latest, current) > 0,
        });
    }
    // Registry unreachable: every probe failed — report the outage distinctly
    // instead of a misleading "all up to date" (the panel needs the reason).
    const error = probeFailures === names.length && names.length > 0 ? 'registry-unreachable' : undefined;
    return {
        mode: linked ? 'link' : 'npm',
        profileName: profile.name,
        anchor,
        packages,
        outdated: packages.some(packageStatus => packageStatus.outdated),
        ...(error !== undefined ? { error } : {}),
    };
}
/** Cap on captured pnpm output (keeps error payloads bounded). */
const OUTPUT_CAP = 16 * 1024;
/**
 * Windows cmd command-not-found stderr. With shell:true a missing shim
 * exits with code 1 (cmd cannot report ENOENT), so the fallback chain
 * detects this message instead of the spawn error event.
 */
const WIN_CMD_MISSING_RE = /not recognized as an internal or external command/i;
/**
 * Bypass for pnpm 11's supply-chain gate: `minimumReleaseAge` (default 24 h)
 * silently skips same-day releases — `pnpm update --latest` then exits 0
 * without moving anything and the post-run verification would misreport a
 * stale no-op. The update here is explicitly user-initiated and the panel
 * shows exactly which versions are being installed, so the gate only adds a
 * confusing silent no-op; override it per-invocation instead of asking every
 * user to edit the profile's pnpm-workspace.yaml.
 */
const MIN_RELEASE_AGE_OVERRIDE = '--config.minimumReleaseAge=0';
/**
 * Run the update inside the profile directory. Tries pnpm first, falls back
 * to corepack and then npx when the previous command is missing (ENOENT);
 * all candidates share one hard timeout and keep accumulating output.
 * @param deps - profile dir, package list, and spawn/timeout seams.
 * @returns the outcome with captured output.
 */
export function runUpdate(deps) {
    return new Promise((resolve) => {
        const spawnImpl = deps.spawnImpl ?? spawn;
        const packages = deps.packages;
        const platform = deps.platform ?? process.platform;
        // Windows ships pnpm/corepack/npx as .cmd shims; Node's spawn cannot
        // start .cmd files directly (ENOENT even when installed), so route
        // them through cmd.exe there. POSIX spawns stay shell-free.
        const spawnOptions = {
            cwd: deps.profileDir,
            stdio: ['ignore', 'pipe', 'pipe'],
            ...(platform === 'win32' ? { shell: true } : {}),
        };
        // Ordered fallback chain: each is tried only when the previous one is
        // missing on PATH (ENOENT on the spawn error event, never on close).
        // `--latest` is required: dsh plugin writes exact-version specs (e.g.
        // "0.1.12" without a range), and plain `pnpm update` treats an exact spec
        // as pinned — it prints "Already up to date" and exits 0 without moving
        // the installed version, so the panel would report a false success.
        // `MIN_RELEASE_AGE_OVERRIDE` rides along every candidate: without it the
        // pnpm 11 minimumReleaseAge gate (default 24 h) silently keeps same-day
        // releases in place, which the post-run verification would then have to
        // surface as `stale` even though the update is legitimate.
        const candidates = [
            { command: 'pnpm', args: ['update', '--latest', MIN_RELEASE_AGE_OVERRIDE, ...packages] },
            { command: 'corepack', args: ['pnpm', 'update', '--latest', MIN_RELEASE_AGE_OVERRIDE, ...packages] },
            { command: 'npx', args: ['--yes', 'pnpm', 'update', '--latest', MIN_RELEASE_AGE_OVERRIDE, ...packages] },
        ];
        // `output` accumulates across candidates for UI display; `currentOutput`
        // is reset per candidate and carries only that candidate's own diagnostics
        // (its tail is subject to OUTPUT_CAP). The win32 missing-command test must
        // run against `currentOutput` so a previous candidate's 'not recognized'
        // stderr cannot misclassify a real failure in the next one.
        let output = '';
        let currentOutput = '';
        const append = (chunk) => {
            output += chunk.toString('utf8');
            if (output.length > OUTPUT_CAP)
                output = output.slice(output.length - OUTPUT_CAP);
            currentOutput += chunk.toString('utf8');
            if (currentOutput.length > OUTPUT_CAP)
                currentOutput = currentOutput.slice(currentOutput.length - OUTPUT_CAP);
        };
        let currentChild;
        // Terminal guard: once a result is produced the promise is settled and no
        // further candidate is started (a killed child's late close must not
        // respawn anything after a timeout resolution).
        let finished = false;
        const finish = (result) => {
            if (finished)
                return;
            finished = true;
            clearTimeout(timer);
            resolve(result);
        };
        const timer = setTimeout(() => {
            if (finished)
                return;
            if (platform === 'win32') {
                // cmd.exe under shell:true only kills the shell wrapper; kill the whole
                // process tree best-effort so pnpm/npx do not keep running.
                const pid = currentChild?.pid;
                if (pid !== undefined && pid > 0) {
                    try {
                        spawnImpl('taskkill', ['/pid', String(pid), '/t', '/f'], { stdio: 'ignore' });
                    }
                    catch {
                        // Best-effort kill; fall through to the timeout result.
                    }
                }
            }
            else {
                currentChild?.kill('SIGTERM');
            }
            finish({ ok: false, exitCode: null, output, error: 'update timed out; install process killed', errorCode: 'timeout' });
        }, deps.timeoutMs ?? 10 * 60_000);
        const runCandidate = (index) => {
            if (finished)
                return;
            if (index >= candidates.length) {
                finish({
                    ok: false,
                    exitCode: null,
                    output,
                    error: 'pnpm not found on PATH (tried pnpm, corepack, npx); install pnpm and restart the app',
                    errorCode: 'pnpm-missing',
                });
                return;
            }
            const candidate = candidates[index];
            currentOutput = '';
            const child = spawnImpl(candidate.command, candidate.args, spawnOptions);
            currentChild = child;
            let settled = false;
            const once = (fn) => {
                if (settled)
                    return;
                settled = true;
                fn();
            };
            child.stdout?.on('data', append);
            child.stderr?.on('data', append);
            child.on('error', (error) => {
                once(() => {
                    if (error.code === 'ENOENT') {
                        // Command missing: try the next candidate in the chain.
                        runCandidate(index + 1);
                    }
                    else {
                        finish({ ok: false, exitCode: null, output, error: error.message, errorCode: undefined });
                    }
                });
            });
            child.on('close', (code) => {
                if (settled || finished)
                    return;
                // Windows + shell: a missing command reports exit 1 with
                // 'not recognized' instead of ENOENT — keep the chain going. Checked
                // against this candidate's own output so a prior fallback's stderr
                // cannot misclassify a real failure here.
                if (platform === 'win32' && code !== 0 && WIN_CMD_MISSING_RE.test(currentOutput)) {
                    runCandidate(index + 1);
                    return;
                }
                settled = true;
                finish({
                    ok: code === 0,
                    exitCode: code,
                    output,
                    error: code === 0 ? undefined : 'pnpm exited with code ' + String(code),
                    ...(code === 0 ? {} : { errorCode: 'pnpm-failed' }),
                });
            });
        };
        runCandidate(0);
    });
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
export async function runUpdateVerified(deps) {
    // Pre-run snapshot: the installed versions the update starts from. Only
    // successfully-read versions are recorded — a read failure (VERSION_UNKNOWN)
    // is not a baseline and must not look like a version that "moved", or a
    // green exit that left everything in place could be mistaken for success.
    const before = new Map();
    for (const name of deps.run.packages) {
        const version = readInstalledVersion(deps.check.resolve, name);
        if (version !== VERSION_UNKNOWN)
            before.set(name, version);
    }
    const result = await runUpdate(deps.run);
    if (!result.ok)
        return result;
    // Re-resolve the anchor after the run: pnpm removes the old version's
    // .pnpm directory, so a boot-time captured path no longer reads. Fall back
    // to the provided path only when nothing resolves now.
    const anchorManifestPath = resolveAnchorManifest(deps.check.resolve) ?? deps.check.anchorManifestPath;
    const status = await checkUpdates({ ...deps.check, anchorManifestPath });
    // A green exit with no comparable result is not a success: registry probe
    // outage, missing anchor, or a non-npm install mode all mean the post-run
    // check could not verify anything.
    if (status.error !== undefined || status.mode !== 'npm') {
        return {
            ...result,
            ok: false,
            errorCode: 'verify-failed',
            error: 'pnpm exited 0 but the post-run version check could not verify the install',
        };
    }
    // A package "moved" only when a known pre-run version differs from a known
    // post-run version. A read failure on either side (VERSION_UNKNOWN) is not
    // evidence of movement and must not turn a no-op update into a success; a
    // package without a pre-run baseline is ignored — only the packages pnpm
    // was told to update count as evidence.
    const moved = status.packages.some(packageStatus => {
        const beforeVersion = before.get(packageStatus.name);
        if (beforeVersion === undefined || packageStatus.current === VERSION_UNKNOWN)
            return false;
        return packageStatus.current !== beforeVersion;
    });
    if (moved)
        return result;
    // Nothing moved. A green exit is only a true no-op when the post-run check
    // proves the install is already current: every probe succeeded and nothing
    // is outdated. If a probe failed we cannot tell "already up to date" from
    // "a gate silently kept it back", so report verify-failed rather than a
    // false success.
    if (status.outdated) {
        // stale: the check ran, a newer release exists, and no package moved
        // (e.g. the minimumReleaseAge gate kept everything in place).
        return {
            ...result,
            ok: false,
            errorCode: 'stale',
            error: 'pnpm exited 0 but the installed versions did not change',
        };
    }
    const unverifiable = status.packages.some(packageStatus => packageStatus.latest === undefined);
    if (unverifiable) {
        return {
            ...result,
            ok: false,
            errorCode: 'verify-failed',
            error: 'pnpm exited 0 but the post-run version check could not verify the install',
        };
    }
    return result;
}
