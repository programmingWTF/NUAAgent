# Vendored community plugins — dsht-web-ui family

Vendored, scope-adapted copies of the `@linxin666/*` DSH Web UI plugin family
(upstream repo: https://github.com/zhu1090093659/dsht-web-ui, Apache-2.0),
version 0.1.18 each, taken from their prebuilt npm tarballs.

Adaptation for the NUAAgent fork (single mechanical rename, no code changes):

- `@deepseek-ai/dsht-*` → `@nuaagent/*` (harness package scope of this fork)
- `@deepseek-ai/cordis` → `@nuaagent/cordis`

applied across `package.json` (deps, devDeps, `dsht.client.inject`), `lib/**`
(built host halves, client bundles, type declarations, source maps), and
`co�rdis.patch.yml` row names. The aggregator `dsht-web-ui-all` had its
`dependencies` emptied: every sibling is installed as a direct profile
dependency instead, so no un-adapted `@linxin666/*` copy is ever fetched
from npm.

Runtime resolution of `@nuaagent/*` goes through the profile module fallback
(`~/.dsh/profiles/node_modules/@nuaagent`, one symlink per harness package),
so these directories carry no harness dependencies themselves.

Packages (14):

| Directory | npm name | Role |
|---|---|---|
| dsht-web-ui-all | @linxin666/dsht-web-ui-all | aggregator + column-attribute compat shim |
| dsht-client-ui-web-ui-settings | …ui-web-ui-settings | settings-page section for the family |
| dsht-client-ui-community-plugins | …ui-community-plugins | community plugin listing UI |
| dsht-client-ui-aionui-panel | …ui-aionui-panel | AionUi-style right panel (files/preview/git) |
| dsht-client-ui-task-board | …ui-task-board | kanban task board with real session execution |
| dsht-client-ui-git-graph | …ui-git-graph | branch selector + git graph |
| dsht-pet | …dsh-pet | desktop pixel pet |
| dsht-remote-web-ui | …dsh-remote-web-ui | mobile remote control (pairing QR) |
| dsht-live-stats | …dsh-live-stats | live token estimates + TPS line |
| dsht-ssh | …dsh-ssh | SSH ops terminal (host ssh2 pool + xterm panel) |
| dsht-tool-describe-image | …tool-describe-image | image-understanding tool |
| dsht-liangshen | …dsh-liangshen | assistant companion plugin |
| dsht-skins | …dsh-skins | skin assets bundle (skins built in) |
| dsht-client-ui-skin-center | …ui-skin-center | in-GUI skin center |

Install/update: rerun the fork CLI plugin add with these directories, e.g.

    node --import tsx/esm apps/cli/src/bin.ts plugin --profile web add <dirs...>

run from `dsh/`. To upgrade, re-download the npm tarballs at the new version,
re-extract here, re-apply the same rename, and re-run the add command.
