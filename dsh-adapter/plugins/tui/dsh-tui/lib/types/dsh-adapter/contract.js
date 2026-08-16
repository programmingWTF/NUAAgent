/**
 * Upstream compatibility contract.
 *
 * The TUI is validated against one upstream release line (0.1.0-rc.6).
 * Every official package this adapter touches is blessed here; anything
 * else must go through upstream channels or the adapter, never the UI.
 *
 * `upstreamDrift()` powers both the boot-time warning (dev visibility) and
 * the CI gate (scripts/verify-upstream-contract.ts) so a mismatched
 * install fails in CI before it fails on a user's machine.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
export const UPSTREAM_VALIDATED_VERSION = '0.1.0-rc.6';
/**
 * Framework packages version on their own lines; the contract validates
 * their MAJOR (breaking surface), not the harness rc number.
 */
export const UPSTREAM_FRAMEWORK_MAJORS = {
    '@nuaagent/cordis': 4,
    '@nuaagent/schemastery': 3,
};
/** Official packages the adapter consumes at runtime or as types. */
export const UPSTREAM_BLESSED_PACKAGES = [
    '@nuaagent/cordis',
    '@nuaagent/schemastery',
    '@nuaagent/invariants',
    '@nuaagent/agent',
    '@nuaagent/agent-instructions',
    '@nuaagent/agent-presets',
    '@nuaagent/commands',
    '@nuaagent/cordis-host-runner',
    '@nuaagent/llm',
    '@nuaagent/persona',
    '@nuaagent/session',
    '@nuaagent/skill',
    '@nuaagent/storage',
    '@nuaagent/storage-domain',
    '@nuaagent/storage-json',
    '@nuaagent/workspace',
    '@nuaagent/system-prompt',
    '@nuaagent/terminal',
    '@nuaagent/terminal-bash',
    '@nuaagent/tool-ask-user',
    '@nuaagent/tool-bash-persistent',
    '@nuaagent/tool-cordis',
    '@nuaagent/user-approval',
    '@nuaagent/user-questions',
];
function resolvePackageJson(packageName) {
    try {
        const path = import.meta.resolve(`${packageName}/package.json`);
        return path.startsWith('file:') ? fileURLToPath(path) : path;
    }
    catch {
        return undefined;
    }
}
export function installedUpstreamVersions() {
    const result = {};
    for (const packageName of UPSTREAM_BLESSED_PACKAGES) {
        let version;
        const path = resolvePackageJson(packageName);
        if (path !== undefined) {
            try {
                const manifest = JSON.parse(readFileSync(path, 'utf8'));
                version = manifest.version;
            }
            catch {
                version = undefined;
            }
        }
        result[packageName] = version;
    }
    return result;
}
function rcNumber(version) {
    const match = /0\.1\.0-rc\.(\d+)/u.exec(version ?? '');
    return match === null ? undefined : Number(match[1]);
}
/**
 * Report every blessed package whose installed version is NOT the validated
 * release line. Empty array = the running install matches the contract.
 */
export function upstreamDrift() {
    const drift = [];
    for (const [packageName, installed] of Object.entries(installedUpstreamVersions())) {
        const expected = UPSTREAM_BLESSED_PACKAGES.includes(packageName);
        if (!expected)
            continue;
        let matches;
        const frameworkMajor = UPSTREAM_FRAMEWORK_MAJORS[packageName];
        if (frameworkMajor !== undefined) {
            const installedMajor = Number((installed ?? '').split('.')[0]);
            matches = installedMajor === frameworkMajor;
        }
        else {
            matches = rcNumber(installed) === rcNumber(UPSTREAM_VALIDATED_VERSION);
        }
        if (!matches) {
            drift.push({
                package: packageName,
                installed,
                validated: frameworkMajor !== undefined ? `major ${frameworkMajor}` : UPSTREAM_VALIDATED_VERSION,
            });
        }
    }
    return drift;
}
