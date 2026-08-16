export declare const UPSTREAM_VALIDATED_VERSION = "0.1.0-rc.6";
/**
 * Framework packages version on their own lines; the contract validates
 * their MAJOR (breaking surface), not the harness rc number.
 */
export declare const UPSTREAM_FRAMEWORK_MAJORS: Record<string, number>;
/** Official packages the adapter consumes at runtime or as types. */
export declare const UPSTREAM_BLESSED_PACKAGES: readonly ["@nuaagent/cordis", "@nuaagent/schemastery", "@nuaagent/invariants", "@nuaagent/agent", "@nuaagent/agent-instructions", "@nuaagent/agent-presets", "@nuaagent/commands", "@nuaagent/cordis-host-runner", "@nuaagent/llm", "@nuaagent/persona", "@nuaagent/session", "@nuaagent/skill", "@nuaagent/storage", "@nuaagent/storage-domain", "@nuaagent/storage-json", "@nuaagent/workspace", "@nuaagent/system-prompt", "@nuaagent/terminal", "@nuaagent/terminal-bash", "@nuaagent/tool-ask-user", "@nuaagent/tool-bash-persistent", "@nuaagent/tool-cordis", "@nuaagent/user-approval", "@nuaagent/user-questions"];
export interface UpstreamDriftEntry {
    package: string;
    installed: string | undefined;
    validated: string;
}
export declare function installedUpstreamVersions(): Record<string, string | undefined>;
/**
 * Report every blessed package whose installed version is NOT the validated
 * release line. Empty array = the running install matches the contract.
 */
export declare function upstreamDrift(): UpstreamDriftEntry[];
//# sourceMappingURL=contract.d.ts.map