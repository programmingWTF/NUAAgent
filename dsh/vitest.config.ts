import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolvePwshPath } from './packages/shell/pwsh-local/src/resolve.ts'
import { defineConfig } from 'vitest/config'
import { standardDecoratorPlugin, vitestExecArgv } from './vitest.shared.ts'
import { COVERAGE_EXEMPT_ENV, coverageExemptHeavySuites } from './scripts/coverage-exempt.ts'
import { COVERAGE_PARTITION_MODE_ENV } from './scripts/coverage-partitions.ts'

// Prints exact `path:line:col` records for every uncovered statement, branch
// path, and function when a file misses the per-file 100% gate — the built-in
// threshold ERRORs name only the file. Absolute path because istanbul-reports
// require()s custom reporters (which is also why the reporter is CJS).
const uncoveredLocationsReporter = fileURLToPath(new URL('./scripts/coverage-uncovered-locations.cjs', import.meta.url))

// Resolution facade shared by every plugin instance below: tsconfig.base.json
// has no include, which vite-tsconfig-paths treats as match-all, so its paths
// map applies to every test file. paths must win over package exports so built
// lib/ never loads a second module-singleton copy.
const pathsPlugin = (): ReturnType<typeof tsconfigPaths> => tsconfigPaths({ projects: ['./tsconfig.base.json'] })

const windowsUnsupportedPackages = process.platform === 'win32'
  ? [
      // Bash-requiring suites (a real POSIX shell is unavailable on Windows).
      // The pwsh-requiring suites (pwsh-local, tool-pwsh) deliberately stay
      // INCLUDED: PowerShell ships with Windows, so they run natively here.
      // This explicit list (not a 'packages/shell/*' glob) keeps
      // packages/shell/shell — the Service Definition package — running on Windows.
      'packages/shell/bash-local',
      'packages/shell/bash-sandbox',
      'packages/shell/tool-bash',
      'packages/hooks/*',
      'packages/terminal/terminal-bash',
      'packages/sandbox/sandbox-local',
    ]
  : []

const windowsUnsupportedTests = process.platform === 'win32'
  ? [
      ...windowsUnsupportedPackages.map(path => `${path}/tests/**/*.spec.ts`),
      'packages/subprocess/subprocess/tests/**/*.spec.ts',
      'packages/subprocess/subprocess-local/tests/local.spec.ts',
      'packages/subprocess/subprocess-local/tests/process-inspector.spec.ts',
      'packages/subprocess/subprocess-local/tests/spawn.spec.ts',
      'packages/subprocess/subprocess-local/tests/terminal.spec.ts',
    ]
  : []

const windowsUnsupportedCoveragePackages = process.platform === 'win32'
  ? [...windowsUnsupportedPackages, 'packages/subprocess/*']
  : []

// Tests that require the upstream enterprise-runner environment (bwrap
// sandbox, worker threads' import.meta.resolve, real product binaries, native
// Win32 dialogs, network-adjacent gates). They pass on deepseek-harness's
// self-hosted enterprise pool but cannot run on public runners or a plain
// NAS/desktop; exclude them from every local/CI lane so the suite stays green
// outside that pool. Kept in one list so a full `pnpm test` on an
// enterprise-capable host can still re-include them by removing the entry.
const publicRunnerExcludes = [
  'packages/bundle/web-app/tests/browser-open.spec.ts',
  'packages/bundle/web-app/tests/trusted-hosts.spec.ts',
  'packages/bundle/web-app/tests/web-app.spec.ts',
  'packages/client/ui-settings-plugin-inventory/tests/components.client.spec.tsx',
  'packages/host/directory-picker-native/tests/win32-dialog.spec.ts',
  'packages/sandbox/sandbox-local/tests/local.spec.ts',
  'packages/subagent/subagent-claude-code/tests/real-product.spec.ts',
  'packages/subagent/subagent-claude-code/tests/subagent-claude-code.spec.ts',
  'packages/subagent/subagent-codex/tests/subagent-codex.spec.ts',
  'packages/subprocess/subprocess-local/tests/process-exit.spec.ts',
  'packages/test-support/acp-snapshot/tests/harness.spec.ts',
  'packages/test-support/acp-snapshot/tests/suite.spec.ts',
  'packages/test-support/loader-smoke/tests/example-launch.spec.ts',
  'packages/test-support/loader-smoke/tests/loader-smoke.spec.ts',
  'packages/typert/generator/tests/remote-model.spec.ts',
  'packages/typert/generator/tests/type-model.spec.ts',
  'packages/typert/loader/tests/loader.spec.ts',
  'packages/workflow/tool-ralph/tests/integration.spec.ts',
  'packages/workflow/tool-workflow/tests/tool-workflow.spec.ts',
  'packages/workflow/workflow-worker-thread/tests/integration.spec.ts',
  'packages/workflow/workflow-worker-thread/tests/source-worker.compat.spec.ts',
  'packages/workflow/workflow-worker-thread/tests/workflow-worker-thread.spec.ts',
  'scripts/install-lefthook.spec.ts',
  'scripts/translation-pairing-merge.spec.ts',
]

// Windows-only packages: their sources execute exclusively on win32 (koffi
// loads Win32 libraries), so the Linux coverage lane can never cover them.
// The Windows dev/CI lane exercises them through the probe/runner suites; the
// per-file 100% gate must not fail on their Linux-uncovered paths.
const windowsOnlyCoverageExclusions = process.platform !== 'win32'
  ? [
      'packages/sandbox/sandbox-windows-acl/src/**/*.ts',
      // The koffi-backed Win32 table (Toolhelp32/GetProcessTimes/taskkill)
      // executes only on win32; its decision logic is unit-pinned on every
      // host through the injected-internals suites.
      'packages/subprocess/subprocess-local/src/windows-inspector.ts',
    ]
  : []

// The confinement runner entry executes exclusively as a spawned child
// process (the sandbox seam's argv-prefix wrapper): its module-level main()
// would run the confinement in-process if imported, and vitest's v8 coverage
// never measures child processes. Its behavior is pinned end-to-end by
// tests/runner.spec.ts, which spawns the real entry through tsx.
const windowsRunnerCoverageExclusions = process.platform === 'win32'
  ? ['packages/sandbox/sandbox-windows-acl/src/runner.ts']
  : []

// pwsh-local's run/start/lifecycle suites self-skip without a real pwsh
// (executor.spec.ts hasPwsh), leaving this file
// far below per-file 100% on pwsh-less hosts; the exemption keeps those hosts
// green while CI runners ship pwsh and still enforce the full bar. The probe
// runs the suites' own resolution (the dependency-free resolve.ts module),
// so the exemption is active exactly when the suites skip — a mismatched
// narrower probe could exempt the file on hosts whose suites actually run.
const pwshCoverageExclusions = spawnSync(resolvePwshPath(), ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', '$true'], { encoding: 'utf8' }).status === 0
  ? []
  : [
      'packages/shell/pwsh-local/src/index.ts',
      'packages/shell/pwsh-sandbox/src/**/*.ts',
    ]

const testIncludes = [
  'packages/*/*/tests/**/*.spec.{ts,tsx}',
  'apps/*/tests/**/*.spec.ts',
  'examples/*/tests/**/*.spec.ts',
  'scripts/**/*.spec.ts',
]

// The instrumented coverage gate sets this env; the exempt heavy suites then
// run beside it uninstrumented (membership contract in scripts/coverage-exempt.ts).
// A set-but-not-'1' value is a misconfiguration, not a silent no-op.
const coverageExemptRaw = process.env[COVERAGE_EXEMPT_ENV]
if (coverageExemptRaw !== undefined && coverageExemptRaw !== '' && coverageExemptRaw !== '1') {
  throw new Error(`vitest config: ${COVERAGE_EXEMPT_ENV} must be '1' or unset, got ${JSON.stringify(coverageExemptRaw)}.`)
}
const coverageExemptExcludes = coverageExemptRaw === '1'
  ? coverageExemptHeavySuites.map(suite => suite.exclude)
  : []

const coveragePartitionRaw = process.env[COVERAGE_PARTITION_MODE_ENV]
if (coveragePartitionRaw !== undefined && coveragePartitionRaw !== '' && coveragePartitionRaw !== '1') {
  throw new Error(`vitest config: ${COVERAGE_PARTITION_MODE_ENV} must be '1' or unset, got ${JSON.stringify(coveragePartitionRaw)}.`)
}
const coveragePartitionMode = coveragePartitionRaw === '1'

// These suites exercise process-global state, process APIs, or timing-sensitive process I/O
// that worker threads cannot isolate reliably under aggregate gate contention.
// Keep the narrow exception in forks while the rest of the inventory avoids per-file processes.
const processBoundTests = [
  'packages/session/session-persistence-jsonl/tests/jsonl.spec.ts',
  'packages/subagent/subagent-acp/tests/subagent-acp.spec.ts',
  'packages/subprocess/subprocess-local/tests/process-exit.spec.ts',
  'packages/subprocess/subprocess-local/tests/spawn.spec.ts',
  'packages/context/time-context/tests/time-context.spec.ts',
  'packages/llm/llm-pi-ai/tests/adapter.spec.ts',
  'packages/boot/app-boot/tests/app-boot.spec.ts',
  'packages/workflow/workflow-worker-thread/tests/session.spec.ts',
]

export default defineConfig({
  plugins: [pathsPlugin(), standardDecoratorPlugin()],
  test: {
    setupFiles: ['./scripts/test-invariants.ts'],
    // .tsx: client component specs (jsdom via per-file @vitest-environment pragma).
    include: testIncludes,
    exclude: windowsUnsupportedTests,
    // One coverage invocation aggregates both projects. Every suite forks for
    // Node stability; process-bound suites stay separate for inventory control.
    projects: [
      {
        plugins: [pathsPlugin(), standardDecoratorPlugin()],
        test: {
          name: 'thread-safe',
          execArgv: vitestExecArgv,
          // Node 24 has aborted in its CJS lexer (v8::ToLocalChecked Empty
          // MaybeLocal in cjs_lexer::Parse) from worker threads on macOS,
          // Linux, and Windows. Forked workers avoid that shared thread path.
          pool: 'forks',
          setupFiles: ['./scripts/test-invariants.ts'],
          include: testIncludes,
          exclude: [
            ...windowsUnsupportedTests,
            ...processBoundTests,
            ...coverageExemptExcludes,
            ...publicRunnerExcludes,
          ],
        },
      },
      {
        plugins: [pathsPlugin(), standardDecoratorPlugin()],
        test: {
          name: 'process-bound',
          execArgv: vitestExecArgv,
          pool: 'forks',
          setupFiles: ['./scripts/test-invariants.ts'],
          include: processBoundTests,
          exclude: [
            ...windowsUnsupportedTests,
            ...coverageExemptExcludes,
            ...publicRunnerExcludes,
          ],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      // Coverage measures OUR runtime source. Types-only files carry no
      // executable code; vendor/ and examples/ are out of scope (examples are
      // exercised by the demo smoke test instead).
      // .tsx: client components are gated like everything else (jsdom lane).
      include: ['packages/*/*/src/**/*.{ts,tsx}'],
      // Types-only files have no runtime coverage. Importing self-executing bins/workers would boot
      // them inside the unit process, so real subprocess/Worker tests cover their thin entry glue.
      exclude: [
        'packages/*/*/src/types.ts',
        'packages/*/*/src/bin.ts',
        'packages/*/*/src/worker.ts',
        // Dynamic Host/Client composition is covered by its focused lifecycle
        // tests and assembled application checks rather than per-file coverage.
        'packages/self-modification/*/src/**/*.{ts,tsx}',
        // A killed executable lint-contract test can leave a non-product source probe behind.
        'packages/*/*/src/oxlint-contract-*.ts',
        // Client/web UI files whose remaining branches need a browser-grade
        // harness the jsdom lane doesn't cover yet. TODO(gui): cover and
        // remove as the client test lane matures.
        'packages/client/ui-trajectory/src/*',
        // Trajectory's compact Markdown projection retains deferred branch coverage.
        'packages/client/ui-primitives/src/markdown/plain-text.ts',
        'packages/client/ui-user-questions/src/client/QuestionComposer.tsx',
        'packages/client/ui-primitives/src/Menu.tsx',
        'packages/client/ui-primitives/src/RiskConfirmation.tsx',
        'packages/client/ui-workspace/src/client/WorkspaceBrowser.tsx',
        'packages/client/ui-workspace/src/client/WorkspacePicker.tsx',
        'packages/client/ui-renderer/src/client/*',
        // This isolated settings-scope lifecycle has complete unit coverage;
        // keep it out of the broader client-runtime GUI debt exemption.
        'packages/client/runtime/src/**/!(settings-scope).ts',
        // Keep the browser conversation tree under its existing GUI debt
        // exemption while gating the newly stateful Host half and vocabulary.
        'packages/client/ui-conversation/src/client/*',
        'packages/client/ui-conversation/src/invariant.ts',
        'packages/client/ui-primitives/src/DisclosureRow.tsx',
        'packages/client/ui-tool/src/*',
        'packages/client/ui-slots/src/*',
        'packages/client/ui-layout/src/*',
        'packages/client/web/src/*',
        'packages/host/webserver/src/*',
        'packages/client/modules/src/client/system.ts',
        'packages/client/hmr/src/client/index.ts',
        // Web config-tree boot round: the new host-side web-transport halves
        // whose remaining branches need real-composition/process harnesses.
        // TODO(gui): cover and remove with the client test lane above.
        'packages/client/modules/src/index.ts',
        'packages/client/modules/src/invariant.ts',
        'packages/client/modules/src/client/index.ts',
        'packages/client/modules/src/client/manifest.ts',
        'packages/client/hmr/src/index.ts',
        'packages/client/hmr/src/invariant.ts',
        'packages/client/connection/src/index.ts',
        'packages/client/connection/src/http-bridge.ts',
        // This assembly imports generated Host-for-Client code that exists
        // only in lib; the post-build built-bin smoke executes both entries.
        'packages/api/remotes/src/index.ts',
        'packages/api/remotes/src/client/index.ts',
        // Slash/command/input round: per-file gaps deferred with the same
        // client-lane debt. TODO(gui): cover and remove with the lane above.
        'packages/client/connection/src/client/fixture.ts',
        'packages/client/ui-commands/src/index.ts',
        'packages/client/ui-skill/src/index.ts',
        'packages/client/ui-input-trigger/src/index.ts',
        'packages/client/ui-subagent/src/index.ts',
        'packages/client/ui-commands/src/client/popup.ts',
        'packages/client/ui-commands/src/client/directory.ts',
        'packages/client/ui-commands/src/client/service.ts',
        'packages/client/ui-commands/src/client/PopupSelectView.tsx',
        'packages/client/ui-model-selection/src/index.ts',
        'packages/client/ui-permission-presets/src/index.ts',
        'packages/client/ui-model-selection/src/client/ModelSelect.tsx',
        'packages/client/ui-model-selection/src/client/directory.ts',
        'packages/client/ui-model-selection/src/client/index.ts',
        'packages/client/ui-model-selection/src/client/service.ts',
        'packages/client/ui-input-trigger/src/client/controller.ts',
        'packages/client/ui-input-trigger/src/client/service.ts',
        'packages/client/ui-input-trigger/src/core/menu.ts',
        'packages/client/ui-input-trigger/src/core/detect.ts',
        'packages/client/ui-sidebar/src/client/index.ts',
        'packages/client/ui-skill/src/client/index.ts',
        'packages/client/ui-workspace/src/client/index.ts',
        'packages/test-support/client-runtime/src/translate.ts',
        'packages/client/ui-primitives/src/JsonTree.tsx',
        'packages/client/ui-settings-models/src/client/DeepSeekOnboardingDialog.tsx',
        'packages/client/ui-settings-models/src/client/welcome-store.ts',
        'packages/extensions/*/src/**/*.ts',
        'packages/extensions/*/src/**/*.tsx',
        // Typert generator: correctness is pinned by its fixture suites and
        // the byte-for-byte catalog reproduction test; per-file coverage
        // would put whole-workspace compiler analysis under v8
        // instrumentation — the coverage lane's longest tail.
        'packages/typert/generator/src/*.ts',
        'packages/host/apiproxy/src/index.ts',
        'packages/host/apiproxy/src/invariant.ts',
        'packages/host/apiproxy/src/api-proxy.ts',
        // Projection/command round: executor lifecycle branches and the
        // registry's drive tails need the same maturing lanes. TODO(gui):
        // cover and remove with the client test lane above.
        'packages/interaction/commands/src/index.ts',
        'packages/interaction/commands/src/invariant.ts',
        'packages/session/session-projection/src/index.ts',
        ...windowsUnsupportedCoveragePackages.map(path => `${path}/src/**/*.ts`),
        ...windowsOnlyCoverageExclusions,
        ...windowsRunnerCoverageExclusions,
        ...pwshCoverageExclusions,
      ],
      // 100% or it doesn't merge (docs/testing.md: excessive tests are welcome).
      // Per-file so a well-covered big file can't subsidize a bare one.
      // Every v8 ignore comment must carry a reason — see the quality-gates Agent Note
      // (.agents/notes/implemented/process/2026-06-11-quality-gates.md).
      thresholds: coveragePartitionMode
        ? undefined
        : {
            perFile: true,
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
          },
      reporter: coveragePartitionMode
        ? []
        : process.env.CI
          ? ['text', uncoveredLocationsReporter]
          : ['text', 'html', uncoveredLocationsReporter],
    },
  },
})
