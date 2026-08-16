import { a as AFFINITY_MAX, c as applyInteraction, d as emptyAffinity, f as rankOf, i as rowOf, l as applyTurnReward, n as animationForPhase, o as AFFINITY_RANKS, r as defaultPetStateConfig, s as affinityViewOf, t as PetStateMachine, u as defaultAffinityConfig } from "./state-CFyJv0sQ.js";
import { installSettingsSection, settingsNamespace } from "@nuaagent/settings";
import z from "schemastery";
import { Service } from "@nuaagent/cordis";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
//#region src/event-projection.ts
/** Fresh projection runtime for a newly seen session. */
function emptyProjectionRuntime() {
	return {
		activeTools: /* @__PURE__ */ new Set(),
		officialEventsSeen: false,
		stepHadFailure: false
	};
}
/** Keep tool names readable inside the compact status bubble. */
function displayToolName(name) {
	const compact = name.replace(/\s+/g, " ").trim() || "工具";
	return compact.length <= 24 ? compact : `${compact.slice(0, 21)}...`;
}
/** Whether a legacy phase is part of the pet's supported vocabulary. */
function isActivityPhase(phase) {
	return [
		"idle",
		"waiting",
		"thinking",
		"tool",
		"review",
		"done",
		"failed"
	].includes(phase);
}
/**
* Project the durable DSH session vocabulary into the pet's visual phases.
* Unknown and log-only events do not disturb the last meaningful activity.
*/
function projectOfficialEvent(event, runtime) {
	switch (event.type) {
		case "turn/start":
			runtime.activeTools.clear();
			runtime.stepHadFailure = false;
			return { input: {
				phase: "waiting",
				line: "准备开始"
			} };
		case "step/start":
			runtime.activeTools.clear();
			runtime.stepHadFailure = false;
			return { input: {
				phase: "waiting",
				line: "等待模型响应"
			} };
		case "assistant/chunk": {
			const { chunk } = event.data;
			if (chunk.type === "reasoning-delta" && chunk.text.length > 0) return { input: {
				phase: "thinking",
				line: "正在思考"
			} };
			if (chunk.type === "text-delta" && chunk.text.length > 0) return { input: {
				phase: "review",
				line: "整理回复中"
			} };
			return;
		}
		case "assistant/message": return { input: {
			phase: "review",
			line: "整理回复中"
		} };
		case "tool/call":
			runtime.activeTools.add(String(event.data.callId));
			return { input: {
				phase: "tool",
				line: `正在使用 ${displayToolName(event.data.name)}`
			} };
		case "tool/result": {
			const block = event.data.message.content[0];
			runtime.activeTools.delete(String(event.data.message.source.callId));
			runtime.stepHadFailure ||= event.data.error !== void 0 || block.isError === true;
			if (runtime.activeTools.size > 0) return { input: {
				phase: "tool",
				line: `还有 ${runtime.activeTools.size} 个工具运行中`
			} };
			return runtime.stepHadFailure ? { input: {
				phase: "failed",
				line: "工具执行失败"
			} } : { input: {
				phase: "thinking",
				line: "处理工具结果"
			} };
		}
		case "turn/end":
			runtime.activeTools.clear();
			switch (event.data.reason.kind) {
				case "completed": return {
					input: {
						phase: "done",
						line: "完成啦"
					},
					completedTurn: event.data.turn
				};
				case "error": return { input: {
					phase: "failed",
					line: "执行失败"
				} };
				case "max-tokens": return { input: {
					phase: "failed",
					line: "达到输出上限"
				} };
				case "interrupted": return { input: {
					phase: "failed",
					line: "执行意外中断"
				} };
				case "blocked": return { input: {
					phase: "waiting",
					line: "等待继续"
				} };
				case "aborted": return { input: {
					phase: "idle",
					line: "已停止"
				} };
				default: return { input: { phase: "idle" } };
			}
		default: return;
	}
}
//#endregion
//#region src/treats.ts
const defaultTreatConfig = {
	turnsPerTreat: 3,
	timeTreatMs: 30 * 6e4,
	maxTreats: 20
};
function emptyTreatLedger() {
	return {
		treats: 0,
		lastTreatGrantAt: 0,
		turnsAtLastTreatGrant: 0
	};
}
function cap(treats, max) {
	return Math.min(max, Math.max(0, treats));
}
/**
* Settle treat grants from both sources against one ledger snapshot.
* Work output counts whole periods since the last work settlement
* (turnsDelta / turnsPerTreat) and advances only the work anchor;
* time output counts whole periods since the time anchor
* (`lastTreatGrantAt`) and advances only the time anchor. The two sources
* are independent so a continuously working user still earns time treats.
* 0 time history never backfills — the clock starts at the first settlement,
* and even a zero-gain first settlement writes the time anchor so the next
* elapsed period can accrue (anchor deadlock fix). Both sources are clamped
* by the stock cap. When the anchor is already set and nothing is due, the
* input ledger is returned unchanged (same object), so callers can skip
* persistence cheaply.
*/
function settleTreatGrants(ledger, turns, nowMs, config = defaultTreatConfig) {
	const turnDelta = Math.max(0, turns - ledger.turnsAtLastTreatGrant);
	const workGrants = Math.floor(turnDelta / config.turnsPerTreat);
	const timeAnchor = ledger.lastTreatGrantAt === 0 ? nowMs : ledger.lastTreatGrantAt;
	const timeGrants = Math.floor(Math.max(0, nowMs - timeAnchor) / config.timeTreatMs);
	const gained = workGrants + timeGrants;
	if (gained <= 0) {
		if (ledger.lastTreatGrantAt === 0) return {
			ledger: {
				...ledger,
				lastTreatGrantAt: nowMs
			},
			gained: 0
		};
		return {
			ledger,
			gained: 0
		};
	}
	return {
		ledger: {
			treats: cap(ledger.treats + gained, config.maxTreats),
			lastTreatGrantAt: timeGrants > 0 ? timeAnchor + timeGrants * config.timeTreatMs : timeAnchor,
			turnsAtLastTreatGrant: workGrants > 0 ? turns - turnDelta % config.turnsPerTreat : ledger.turnsAtLastTreatGrant
		},
		gained
	};
}
/**
* Consume one treat for a feed. Returns the outcome; a feed with no stocked
* treats is refused.
*/
function consumeTreat(ledger) {
	if (ledger.treats <= 0) return { ok: false };
	return {
		ok: true,
		ledger: {
			...ledger,
			treats: ledger.treats - 1
		}
	};
}
//#endregion
//#region src/ledger.ts
/**
* Pet affinity economy (ledger) — composes the pure affinity and treats
* modules with the cooldown/dedup bookkeeping and emits updated persistence
* snapshots, marking dirty so the owning facade decides when to flush. Read
* paths (view) no longer settle the economy; settlements happen on explicit
* economic events: completed-turn rewards (official or legacy) and feeds.
* @module @linxin666/dsh-pet/ledger
*/
/**
* Holds the current persistence snapshot and all economy bookkeeping. Every
* mutating call flags takeDirty so the facade persists exactly once per
* batch of changes; read methods (snapshot, affinityView) never write.
*/
var PetLedger = class {
	affinityConfig;
	treatConfig;
	current;
	/** Completed turns already rewarded, per session (turn numbers are per-session). */
	rewardedTurns = /* @__PURE__ */ new Map();
	lastLegacyTurnRewardAt = 0;
	dirty = false;
	constructor(persist, config = {}) {
		this.affinityConfig = {
			...defaultAffinityConfig,
			...config.affinity ?? {}
		};
		this.treatConfig = {
			...defaultTreatConfig,
			...config.treats ?? {}
		};
		this.current = persist;
	}
	/** Affinity cooldown/rank tuning (read-only). */
	get affinity() {
		return this.affinityConfig;
	}
	/** The current persistence snapshot (trade a copy when mutating). */
	get snapshot() {
		return this.current;
	}
	/** Stock cap reported to clients. */
	get treatMax() {
		return this.treatConfig.maxTreats;
	}
	/** Consume the pending-write flag if any mutation occurred. */
	takeDirty() {
		const was = this.dirty;
		this.dirty = false;
		return was;
	}
	/** Replace the display block (clamping stays a caller concern). */
	setDisplay(display) {
		this.current = {
			...this.current,
			display
		};
		this.dirty = true;
	}
	/** Replace the selected pet id (validation stays a caller concern). */
	setPetId(petId) {
		if (this.current.petId === petId) return;
		this.current = {
			...this.current,
			petId
		};
		this.dirty = true;
	}
	/** Replace one pet's display name (validation stays a caller concern). */
	setPetName(petId, name) {
		this.current = {
			...this.current,
			names: {
				...this.current.names,
				[petId]: name
			}
		};
		this.dirty = true;
	}
	/**
	* Settle the treat economy (work + time output since the last settlement).
	* A zero-gain first settlement still starts the time clock (anchor write),
	* which is how the 30-minute time output can ever accrue. Returns true when
	* the in-memory ledger changed and should be persisted.
	*/
	settleTreats(nowMs) {
		const settlement = settleTreatGrants(this.current.treats, this.current.affinity.turns, nowMs, this.treatConfig);
		if (settlement.ledger === this.current.treats) return false;
		this.current = {
			...this.current,
			treats: settlement.ledger
		};
		this.dirty = true;
		return true;
	}
	/**
	* Award the completed-turn reward once per session+turn (idempotent) and
	* run the treat settlement that work output feeds. Returns true when the
	* snapshot changed.
	*/
	rewardTurn(sessionId, turn, nowMs) {
		if (turn <= (this.rewardedTurns.get(sessionId) ?? 0)) return false;
		this.rewardedTurns.set(sessionId, turn);
		let changed = this.applyTurnReward();
		if (this.settleTreats(nowMs)) changed = true;
		return changed;
	}
	/** Preserve turn rewards for installations that only emit legacy activity. */
	rewardLegacyTurn(nowMs) {
		if (nowMs - this.lastLegacyTurnRewardAt < 5e3) return false;
		this.lastLegacyTurnRewardAt = nowMs;
		let changed = this.applyTurnReward();
		if (this.settleTreats(nowMs)) changed = true;
		return changed;
	}
	applyTurnReward() {
		this.current = {
			...this.current,
			affinity: applyTurnReward(this.current.affinity, this.affinityConfig)
		};
		this.dirty = true;
		return true;
	}
	/**
	* Pet or feed the pet. Feeding settles first, then gates on the feed
	* cooldown before spending stock — a feed inside the cooldown must not burn
	* a treat for nothing.
	*/
	interact(kind, nowMs) {
		if (kind === "feed") this.settleTreats(nowMs);
		const outcome = applyInteraction(this.current.affinity, kind, nowMs, this.affinityConfig);
		if (kind === "feed" && !outcome.accepted) return {
			reaction: outcome.reaction,
			delta: 0,
			affinity: this.affinityView(nowMs)
		};
		if (kind === "feed") {
			const consume = consumeTreat(this.current.treats);
			if (!consume.ok) return {
				reaction: "没有小鱼干了，多陪我工作一会儿吧～",
				delta: 0,
				affinity: this.affinityView(nowMs)
			};
			this.current = {
				...this.current,
				treats: consume.ledger
			};
			this.dirty = true;
		}
		if (outcome.accepted) {
			this.current = {
				...this.current,
				affinity: outcome.affinity
			};
			this.dirty = true;
		}
		return {
			reaction: outcome.reaction,
			delta: outcome.delta,
			affinity: this.affinityView(nowMs)
		};
	}
	/** Current affinity view for the RPC snapshot. */
	affinityView(nowMs) {
		return affinityViewOf(this.current.affinity, nowMs, this.affinityConfig);
	}
};
//#endregion
//#region src/dsh-home.ts
/**
* DSH_HOME resolution shared by the plugin family's Host halves: the
* environment override wins, the platform home fallback follows. Mirrors
* what dsh-pet and dsh-liangshen each used to implement locally.
*/
/** Expand a leading ~ (or ~user) in a path, platform-style. */
function expandHome(path, home = homedir()) {
	if (path === "~") return home;
	if (path.startsWith("~/") || path.startsWith("~\\")) return join(home, path.slice(2));
	return path;
}
/**
* Resolve the DSH home directory.
* @param env - process environment to read DSH_HOME from.
* @param home - platform home directory fallback (test seam).
* @returns the absolute DSH home path.
*/
function resolveDshHome(env = process.env, home = homedir()) {
	const raw = env.DSH_HOME;
	if (raw !== void 0 && raw.trim() !== "") {
		const expanded = expandHome(raw.trim(), home);
		return isAbsolute(expanded) ? expanded : join(process.cwd(), expanded);
	}
	return join(home, ".dsh");
}
/** Resolve the DSH home directory from the live environment. */
function dshHome() {
	return resolveDshHome();
}
//#endregion
//#region src/persist.ts
/**
* Pet persistence — tiny JSON store for affinity + display config, written
* under $DSH_HOME (defaults to ~/.dsh) as `pet.json`. Deliberately minimal:
* one file, atomic rename write, tolerant read (corrupt file → defaults).
* @module @linxin666/dsh-pet/persist
*/
const defaultDisplayConfig = {
	visible: true,
	size: 160,
	right: 24,
	bottom: 20
};
const DISPLAY_INSET_MAX = 1e4;
/** Pet id the legacy single-pet installs resolve to on migration. */
const DEFAULT_PET_ID = "whale-girl";
/** Default pet name (used only when a manifest carries no displayName). */
const DEFAULT_PET_NAME = "鲸鱼娘";
/** Name constraints. */
const PET_NAME_MAX_LENGTH = 20;
function emptyPersist() {
	return {
		petId: DEFAULT_PET_ID,
		names: {},
		affinity: emptyAffinity(),
		treats: emptyTreatLedger(),
		display: { ...defaultDisplayConfig }
	};
}
/**
* Resolve the persistence directory ($DSH_HOME or ~/.dsh). Delegates to the
* shared {@link dshHome} resolution so the plugin family keeps one DSH_HOME
* definition (env override, ~ expansion, cwd-joined relative values).
*/
function petHomeDir() {
	return dshHome();
}
/** Numeric field guard: finite numbers only, else the fallback. */
function finiteNum(value, fallback) {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
/** Sanitize the per-pet names map (string keys, non-empty trimmed values). */
function loadPetNames(parsed) {
	const names = {};
	if (typeof parsed.names !== "object" || parsed.names === null) return names;
	for (const [id, value] of Object.entries(parsed.names)) {
		if (id === "" || typeof value !== "string") continue;
		const name = value.trim();
		if (name === "") continue;
		names[id] = name.slice(0, 20);
	}
	return names;
}
/** Clamp one count/score into [0, max]. */
function clamp(value, max) {
	return Math.min(max, Math.max(0, value));
}
/** Load persisted state; missing or corrupt files fall back to defaults. */
function loadPetPersist(dir = petHomeDir()) {
	try {
		const raw = readFileSync(join(dir, "pet.json"), "utf8");
		const parsed = JSON.parse(raw);
		const base = emptyPersist();
		const rawAffinity = parsed.affinity ?? {};
		const affinity = {
			points: clamp(finiteNum(rawAffinity.points, 0), 100),
			lastPetAt: clamp(finiteNum(rawAffinity.lastPetAt, 0), Number.MAX_SAFE_INTEGER),
			lastFeedAt: clamp(finiteNum(rawAffinity.lastFeedAt, 0), Number.MAX_SAFE_INTEGER),
			pets: clamp(finiteNum(rawAffinity.pets, 0), Number.MAX_SAFE_INTEGER),
			feeds: clamp(finiteNum(rawAffinity.feeds, 0), Number.MAX_SAFE_INTEGER),
			turns: clamp(finiteNum(rawAffinity.turns, 0), Number.MAX_SAFE_INTEGER)
		};
		const rawTreats = parsed.treats ?? {};
		const treats = {
			treats: clamp(finiteNum(rawTreats.treats, 0), defaultTreatConfig.maxTreats),
			lastTreatGrantAt: clamp(finiteNum(rawTreats.lastTreatGrantAt, 0), Number.MAX_SAFE_INTEGER),
			turnsAtLastTreatGrant: clamp(finiteNum(rawTreats.turnsAtLastTreatGrant, 0), Number.MAX_SAFE_INTEGER)
		};
		const rawDisplay = parsed.display ?? {};
		const display = {
			visible: typeof rawDisplay.visible === "boolean" ? rawDisplay.visible : base.display.visible,
			size: Math.round(Math.min(512, Math.max(32, finiteNum(rawDisplay.size, base.display.size)))),
			right: Math.round(clamp(finiteNum(rawDisplay.right, base.display.right), DISPLAY_INSET_MAX)),
			bottom: Math.round(clamp(finiteNum(rawDisplay.bottom, base.display.bottom), DISPLAY_INSET_MAX))
		};
		const petId = typeof parsed.petId === "string" && parsed.petId.trim() !== "" ? parsed.petId.trim() : base.petId;
		const names = loadPetNames(parsed);
		if (typeof parsed.name === "string" && parsed.name.trim() !== "" && names[petId] === void 0) names[petId] = parsed.name.trim().slice(0, 20);
		return {
			petId,
			names,
			affinity,
			treats,
			display
		};
	} catch {
		return emptyPersist();
	}
}
/** Atomically persist state (write temp + rename). */
function savePetPersist(data, dir = petHomeDir()) {
	mkdirSync(dir, { recursive: true });
	const target = join(dir, "pet.json");
	const tmp = `${target}.tmp`;
	writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
	renameSync(tmp, target);
}
//#endregion
//#region src/registry.ts
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
/** Fixed row order of the 9-state animation contract. */
const PET_ROW_ORDER = [
	"idle",
	"running-right",
	"running-left",
	"waving",
	"jumping",
	"failed",
	"waiting",
	"running",
	"review"
];
/** Atlas cell size in px (Codex/hatch-pet contract). */
const DEFAULT_PET_CELL = {
	width: 192,
	height: 208
};
/** Columns per row (max frames per track). */
const DEFAULT_PET_COLUMNS = 8;
/** Rows in the atlas (fixed by the animation contract). */
const DEFAULT_PET_ROW_COUNT = 9;
/**
* Per-row used-column counts from the hatch-pet contract table. Manifests
* that carry no 'frames' field (the Codex custom-pet shape) resolve here.
*/
const DEFAULT_FRAME_COUNTS = [
	6,
	8,
	8,
	4,
	5,
	8,
	6,
	6,
	6
];
/** Absolute package root, resolved from a module URL (lib/ or src/). */
function petPackageRoot(importMetaUrl) {
	return fileURLToPath(new URL("../", importMetaUrl));
}
/** Resolve the hatch-pet custom pets directory (CODEX_HOME or ~/.codex). */
function codexPetsDir(env = process.env, home = homedir()) {
	const raw = env.CODEX_HOME !== void 0 && env.CODEX_HOME.trim() !== "" ? env.CODEX_HOME.trim() : join(home, ".codex");
	return join(raw === "~" ? home : raw.startsWith("~/") || raw.startsWith("~\\") ? join(home, raw.slice(2)) : raw, "pets");
}
/** Finite non-negative integer guard, else the fallback. */
function finiteInt(value, fallback, max) {
	return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= max ? value : fallback;
}
/** Build the browser URL of one pet asset. */
function assetUrl(prefix, id, file) {
	const path = file.split("/").filter((segment) => segment !== "").join("/");
	return prefix + "/" + encodeURIComponent(id) + "/" + path;
}
/** Default per-track rhythm (hatch-pet contract table). */
const DEFAULT_TRACK_PATTERNS = {
	idle: {
		durations: [
			280,
			110,
			110,
			140,
			140,
			320
		],
		loop: true
	},
	"running-right": {
		durations: [
			120,
			120,
			120,
			120,
			120,
			120,
			120,
			220
		],
		loop: true
	},
	"running-left": {
		durations: [
			120,
			120,
			120,
			120,
			120,
			120,
			120,
			220
		],
		loop: true
	},
	waving: {
		durations: [
			140,
			140,
			140,
			280
		],
		loop: true
	},
	jumping: {
		durations: [
			140,
			140,
			140,
			140,
			280
		],
		loop: false,
		fallback: "idle"
	},
	failed: {
		durations: [
			140,
			140,
			140,
			140,
			140,
			140,
			140,
			240
		],
		loop: false,
		fallback: "idle"
	},
	waiting: {
		durations: [
			150,
			150,
			150,
			150,
			150,
			260
		],
		loop: true
	},
	running: {
		durations: [
			120,
			120,
			120,
			120,
			120,
			220
		],
		loop: true
	},
	review: {
		durations: [
			150,
			150,
			150,
			150,
			150,
			280
		],
		loop: true
	}
};
/** Stable id charset: keeps asset URLs plain and filesystem-safe. */
const PET_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
/** Safe path-segment charset for atlas files. */
const PATH_SEGMENT_PATTERN = /^[A-Za-z0-9._-]+$/;
const PET_NAME_MAX_LENGTH$1 = 80;
/**
* Normalize one parsed manifest into a renderable pet entry, or undefined
* (with a warning recorded) when the manifest violates the contract.
*/
function resolvePetManifest(raw, dir, options = {}) {
	const { assetPrefix = "/pet", warnings = [] } = options;
	const warn = (message) => {
		warnings.push(message);
	};
	if (typeof raw !== "object" || raw === null) {
		warn("manifest is not an object");
		return;
	}
	const source = raw;
	const id = typeof source.id === "string" ? source.id.trim() : "";
	if (!PET_ID_PATTERN.test(id)) {
		warn("manifest id " + JSON.stringify(String(source.id)) + " is not a lowercase kebab id");
		return;
	}
	const displayName = typeof source.displayName === "string" && source.displayName.trim() !== "" ? source.displayName.trim().slice(0, PET_NAME_MAX_LENGTH$1) : id;
	const description = typeof source.description === "string" ? source.description.trim() : "";
	const spritesheet = typeof source.spritesheetPath === "string" && source.spritesheetPath.trim() !== "" ? source.spritesheetPath.trim() : "spritesheet.webp";
	const spritesheetPath = spritesheet.split("/").filter((segment) => segment !== "");
	if (spritesheetPath.length === 0 || isAbsolute(spritesheet) || spritesheet.includes("\\") || spritesheetPath.some((segment) => segment === ".." || !PATH_SEGMENT_PATTERN.test(segment))) {
		warn("manifest spritesheetPath " + JSON.stringify(spritesheet) + " is not a safe relative path");
		return;
	}
	const rawCell = typeof source.cell === "object" && source.cell !== null ? source.cell : {};
	const cell = {
		width: finiteInt(rawCell.width, DEFAULT_PET_CELL.width, 2048),
		height: finiteInt(rawCell.height, DEFAULT_PET_CELL.height, 2048)
	};
	const columns = finiteInt(source.columns, 8, 32);
	const rows = DEFAULT_FRAME_COUNTS.map((fallback, index) => {
		return finiteInt(Array.isArray(source.frames) ? source.frames[index] : void 0, fallback, columns);
	});
	const trackOverrides = typeof source.tracks === "object" && source.tracks !== null ? source.tracks : {};
	const tracks = {};
	for (const [row, animation] of PET_ROW_ORDER.entries()) {
		const pattern = DEFAULT_TRACK_PATTERNS[animation];
		const override = trackOverrides[animation];
		const durations = Array.isArray(override?.durations) && override.durations.length > 0 ? override.durations.filter((value) => typeof value === "number" && Number.isFinite(value) && value > 0) : pattern.durations;
		if (durations.length === 0) {
			warn("manifest " + id + ": track " + animation + " carries no usable durations");
			return;
		}
		const frameCount = Math.max(1, Math.min(rows[row], columns));
		const sized = durations.length >= frameCount ? durations.slice(0, frameCount) : Array.from({ length: frameCount }, (_, index) => durations[index % durations.length]);
		tracks[animation] = {
			frames: Array.from({ length: frameCount }, (_, index) => index),
			durations: sized,
			loop: typeof override?.loop === "boolean" ? override.loop : pattern.loop,
			...override?.fallback === void 0 ? pattern.fallback === void 0 ? {} : { fallback: pattern.fallback } : PET_ROW_ORDER.includes(override.fallback) ? { fallback: override.fallback } : pattern.fallback === void 0 ? {} : { fallback: pattern.fallback }
		};
	}
	return {
		id,
		displayName,
		description,
		cell,
		columns,
		rows,
		tracks,
		atlasUrl: assetUrl(assetPrefix, id, spritesheet),
		manifestUrl: assetUrl(assetPrefix, id, "pet.json"),
		dir,
		spritesheetPath: spritesheetPath.join("/")
	};
}
/** Scan one directory of pet folders; entries come back in name order. */
function scanPetDir(dir, options) {
	if (!existsSync(dir)) return [];
	let names = [];
	try {
		names = readdirSync(dir).filter((name) => !name.startsWith("."));
	} catch {
		return [];
	}
	names.sort();
	const entries = [];
	for (const name of names) {
		const manifestFile = join(dir, name, "pet.json");
		if (!existsSync(manifestFile)) continue;
		const parsed = readPetJson(manifestFile, options.warnings);
		if (parsed === void 0) continue;
		const entry = resolvePetManifest(parsed, join(dir, name), options);
		if (entry !== void 0) entries.push(entry);
	}
	return entries;
}
/** Read and parse one manifest file; undefined (warning recorded) on failure. */
function readPetJson(file, warnings) {
	try {
		return JSON.parse(readFileSync(file, "utf8"));
	} catch (error) {
		warnings?.push("skipping " + file + ": " + (error instanceof Error ? error.message : String(error)));
		return;
	}
}
/**
* Load the pet registry: built-in 'assets/*' first, then the hatch-pet
* custom pets directory, then composed 'extra' manifests (each later source
* overrides an earlier one on id collision). The registry never throws on a
* bad manifest: it skips it and records a warning.
*/
function loadPetRegistry(options) {
	const { packageRoot, assetPrefix = "/pet" } = options;
	const warnings = [];
	const byId = /* @__PURE__ */ new Map();
	const builtinIds = /* @__PURE__ */ new Set();
	for (const entry of scanPetDir(join(packageRoot, "assets"), {
		assetPrefix,
		warnings
	})) {
		if (byId.has(entry.id)) {
			warnings.push("duplicate built-in pet id " + entry.id + "; the first one wins");
			continue;
		}
		byId.set(entry.id, entry);
		builtinIds.add(entry.id);
	}
	const petsDir = options.petsDir ?? codexPetsDir();
	if (petsDir !== "") for (const entry of scanPetDir(petsDir, {
		assetPrefix,
		warnings
	})) {
		if (byId.has(entry.id)) warnings.push("custom pet " + entry.id + " overrides the built-in one");
		byId.set(entry.id, entry);
	}
	for (const manifest of options.extra ?? []) {
		const entry = resolvePetManifest(manifest, manifest.spritesheetPath === void 0 || isAbsolute(manifest.spritesheetPath) ? join(packageRoot, "assets", "extra") : dirname(resolve(packageRoot, manifest.spritesheetPath)), {
			assetPrefix,
			warnings
		});
		if (entry === void 0) continue;
		if (byId.has(entry.id)) warnings.push("composed pet " + entry.id + " overrides an earlier registration");
		byId.set(entry.id, entry);
	}
	const entries = [...byId.values()];
	return {
		entries,
		warnings,
		byId: (id) => byId.get(id),
		defaultEntry: () => entries.find((entry) => builtinIds.has(entry.id)) ?? entries[0]
	};
}
/** Strip host-only fields, leaving the client-visible definition. */
function petEntryView(entry) {
	return {
		id: entry.id,
		displayName: entry.displayName,
		description: entry.description,
		cell: entry.cell,
		columns: entry.columns,
		rows: entry.rows,
		tracks: entry.tracks,
		atlasUrl: entry.atlasUrl,
		manifestUrl: entry.manifestUrl
	};
}
/**
* Cordis service exposing the pet RPC domain. Lazy: nothing is scanned or
* written until an economic event or interaction arrives; event listeners
* update only in-memory state, and persistence happens on economic changes
* (turn rewards, feeds, config/name changes) — never on a read.
*/
var PetService = class extends Service {
	static inject = [];
	machine;
	ledger;
	registry;
	persistDir;
	enabled;
	disposeActivity;
	/** Session whose most recent meaningful event currently drives the global pet. */
	displaySession;
	sessionActivity = /* @__PURE__ */ new WeakMap();
	constructor(ctx, config = {}) {
		super(ctx, "pet");
		this.persistDir = config.persistDir ?? petHomeDir();
		this.registry = config.registry ?? loadPetRegistry({
			packageRoot: petPackageRoot(import.meta.url),
			...config.pets === void 0 ? {} : { extra: config.pets }
		});
		if (this.registry.entries.length === 0) throw new Error("[dsh-pet] no valid pet manifests found; nothing to render");
		let persist = loadPetPersist(this.persistDir);
		if (this.registry.byId(persist.petId) === void 0) persist = {
			...persist,
			petId: this.registry.defaultEntry().id
		};
		const ledgerConfig = {
			affinity: config.affinity,
			treats: config.treats
		};
		this.ledger = new PetLedger(persist, ledgerConfig);
		this.machine = new PetStateMachine({
			...defaultPetStateConfig,
			...config.state ?? {}
		});
		this.enabled = config.enabled ?? true;
		this.syncActivity();
	}
	/** Whether the pet service consumes session activity while enabled. */
	isEnabled() {
		return this.enabled;
	}
	/** RPC: current pet state snapshot. */
	async state() {
		return this.view();
	}
	/** Current persisted display config (read-only view). */
	display() {
		return { ...this.ledger.snapshot.display };
	}
	/** RPC: the registry entries the browser half renders and selects from. */
	async pets() {
		return this.registry.entries.map(petEntryView);
	}
	/** The loaded registry (the asset routes serve its entries). */
	registrySnapshot() {
		return this.registry;
	}
	/** The selected pet's registry entry. */
	activeEntry() {
		return this.registry.byId(this.selectedPetId()) ?? this.registry.defaultEntry();
	}
	/** Currently selected pet id (persisted). */
	selectedPetId() {
		return this.ledger.snapshot.petId;
	}
	/** The display name of one pet (user rename or manifest displayName). */
	petName(petId = this.selectedPetId()) {
		const stored = this.ledger.snapshot.names[petId];
		if (stored !== void 0 && stored.trim() !== "") return stored;
		return this.registry.byId(petId)?.displayName ?? "鲸鱼娘";
	}
	/** RPC: switch the selected pet (persisted, settings document mirrored). */
	async setPetId(petId) {
		const entry = this.registry.byId(petId);
		if (entry === void 0) return {
			ok: false,
			error: "unknown-pet"
		};
		this.ledger.setPetId(entry.id);
		this.flush();
		this.syncSettingsFromPet();
		return {
			ok: true,
			petId: entry.id
		};
	}
	/** Start or stop the session-activity listeners that drive the pet. */
	setEnabled(enabled) {
		this.enabled = enabled;
		this.syncActivity();
	}
	syncActivity() {
		if (this.disposeActivity !== void 0) {
			this.disposeActivity();
			this.disposeActivity = void 0;
		}
		if (!this.enabled) return;
		this.disposeActivity = (() => {
			const disposers = [this.ctx.on("session/event", (session, event) => {
				const runtime = this.activityRuntime(session);
				if (event.type === "activity/status") {
					const payload = event.data ?? {};
					if (typeof payload.phase !== "string" || !isActivityPhase(payload.phase)) return;
					this.applyActivity(session, {
						phase: payload.phase,
						...typeof payload.line === "string" ? { line: payload.line } : {},
						...typeof payload.phrase === "string" ? { phrase: payload.phrase } : {}
					});
					if (payload.phase === "done" && !runtime.officialEventsSeen) this.rewardLegacyTurn();
					return;
				}
				const transition = projectOfficialEvent(event, runtime);
				if (transition === void 0) return;
				runtime.officialEventsSeen = true;
				this.applyActivity(session, transition.input);
				if (transition.completedTurn !== void 0) this.rewardTurn(String(session.id), transition.completedTurn);
			}), this.ctx.on("session/disposed", (session) => {
				if (session !== this.displaySession) return;
				this.displaySession = void 0;
				this.machine.onSessionDisposed();
			})];
			return () => {
				for (const dispose of disposers) dispose();
			};
		})();
	}
	/** Return the projection state associated with one live session. */
	activityRuntime(session) {
		let runtime = this.sessionActivity.get(session);
		if (runtime === void 0) {
			runtime = emptyProjectionRuntime();
			this.sessionActivity.set(session, runtime);
		}
		return runtime;
	}
	/** Commit one activity as the host-global pet's most recent display state. */
	applyActivity(session, input) {
		this.displaySession = session;
		this.machine.onActivityStatus(input);
		this.machine.onSessionActive();
	}
	/** RPC: pet or feed the pet. */
	async interact(kind) {
		const nowMs = Date.now();
		const result = this.ledger.interact(kind, nowMs);
		if (this.ledger.takeDirty()) this.flush();
		return result;
	}
	/** RPC: show or hide the pet. */
	async setVisible(visible) {
		this.ledger.setDisplay({
			...this.ledger.snapshot.display,
			visible
		});
		this.flush();
		this.syncSettingsFromPet();
		return {
			ok: true,
			display: this.ledger.snapshot.display
		};
	}
	/** RPC: update display config (size / position). Values are clamped to whole pixels. */
	async setConfig(patch) {
		const next = {
			...this.ledger.snapshot.display,
			...patch
		};
		next.size = Math.round(Math.min(512, Math.max(32, next.size)));
		next.right = Math.round(Math.min(DISPLAY_INSET_MAX, Math.max(0, next.right)));
		next.bottom = Math.round(Math.min(DISPLAY_INSET_MAX, Math.max(0, next.bottom)));
		this.ledger.setDisplay(next);
		this.flush();
		this.syncSettingsFromPet();
		return {
			ok: true,
			display: this.ledger.snapshot.display
		};
	}
	/** RPC: rename the selected pet (trimmed, 1–20 chars, per-pet storage). */
	async setName(name) {
		const trimmed = name.trim();
		if (trimmed === "") return {
			ok: false,
			error: "name-empty"
		};
		if (trimmed.length > 20) return {
			ok: false,
			error: "name-too-long"
		};
		this.ledger.setPetName(this.selectedPetId(), trimmed);
		this.flush();
		return {
			ok: true,
			name: trimmed
		};
	}
	/**
	* Apply a committed settings section to the persisted selection and display
	* config. Called by the settings surface on every change; values are
	* clamped exactly like the setConfig RPC so both write paths converge.
	* @param section - the resolved settings section.
	*/
	applySettingsSection(section) {
		if (typeof section.petId === "string" && this.registry.byId(section.petId) !== void 0) this.ledger.setPetId(section.petId);
		else if (section.petId !== void 0) this.syncSettingsFromPet();
		const next = { ...this.ledger.snapshot.display };
		next.visible = section.visible && (section.enabled ?? true);
		next.size = Math.round(Math.min(512, Math.max(32, section.size)));
		next.right = Math.round(Math.min(DISPLAY_INSET_MAX, Math.max(0, section.right)));
		next.bottom = Math.round(Math.min(DISPLAY_INSET_MAX, Math.max(0, section.bottom)));
		this.ledger.setDisplay(next);
		this.flush();
	}
	/** Mirror the persisted display config into the settings document (best-effort). */
	syncSettingsFromPet() {
		const settings = this.ctx.get("settings", false);
		if (settings === void 0) return;
		const snapshot = this.ledger.snapshot;
		settings.update("pet", {
			visible: snapshot.display.visible,
			size: snapshot.display.size,
			right: snapshot.display.right,
			bottom: snapshot.display.bottom,
			petId: snapshot.petId
		}).catch(() => {});
	}
	/** Award the turn reward once per completed turn (idempotent per session + turn). */
	rewardTurn(sessionId, turn) {
		if (this.ledger.rewardTurn(sessionId, turn, Date.now())) this.flush();
	}
	/** Preserve turn rewards for installations that only emit legacy activity. */
	rewardLegacyTurn() {
		if (this.ledger.rewardLegacyTurn(Date.now())) this.flush();
	}
	view() {
		const snapshot = this.machine.render();
		const entry = this.activeEntry();
		return {
			animation: snapshot.animation,
			...snapshot.bubble === void 0 ? {} : { bubble: snapshot.bubble },
			phase: snapshot.phase,
			sessionActive: snapshot.sessionActive,
			affinity: this.ledger.affinityView(Date.now()),
			display: { ...this.ledger.snapshot.display },
			pet: {
				id: entry.id,
				displayName: entry.displayName,
				description: entry.description
			},
			name: this.petName(),
			treats: {
				stocked: this.ledger.snapshot.treats.treats,
				max: this.ledger.treatMax
			}
		};
	}
	flush() {
		try {
			savePetPersist(this.ledger.snapshot, this.persistDir);
		} catch {}
	}
};
//#endregion
//#region src/routes.ts
/**
* Pet HTTP routes — the browser half talks to the host through plain
* same-origin JSON endpoints ('/api/pet/*') and loads pet assets from
* '/pet/<id>/*'. The '/plugins/' endpoint only serves client bundles and RPC
* domains are platform-registered, so the pet serves its own API and media —
* the same pattern as dsh-remote-web-ui's '/api/pair' family. The asset route
* is one prefix registration serving every registry entry (manifest, atlas,
* optional previews), so adding a pet never touches route wiring.
* @module @linxin666/dsh-pet/routes
*/
/** Browser-facing base path of the pet API. */
const PET_API_PREFIX = "/api/pet";
/** Browser-facing base path of the pet asset routes ('/pet/<id>/...'). */
const PET_ASSET_PREFIX = "/pet";
const MANIFEST_FILE = "pet.json";
const PREVIEW_DIR = "previews";
const PREVIEW_PATTERN = /^[A-Za-z0-9._-]+$/;
const MIME_BY_EXT = {
	".webp": "image/webp",
	".png": "image/png",
	".gif": "image/gif",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".json": "application/json"
};
/** Content type by file extension (safe fallback: octet-stream). */
function mimeFor(file) {
	const dot = file.lastIndexOf(".");
	if (dot < 0) return "application/octet-stream";
	return MIME_BY_EXT[file.slice(dot).toLowerCase()] ?? "application/octet-stream";
}
/** Write one JSON response. */
function json(res, status, body) {
	res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
	res.end(JSON.stringify(body));
}
/** Require the method or answer 405. */
function requireMethod(req, res, method) {
	if (req.method === method) return true;
	json(res, 405, {
		ok: false,
		error: "method-not-allowed"
	});
	return false;
}
/** Read a JSON request body (bounded). */
function readJsonBody(req) {
	return new Promise((resolve, reject) => {
		let size = 0;
		const chunks = [];
		req.on("data", (chunk) => {
			size += chunk.length;
			if (size > 64 * 1024) {
				reject(/* @__PURE__ */ new Error("body-too-large"));
				queueMicrotask(() => req.destroy());
				return;
			}
			chunks.push(chunk);
		});
		req.on("end", () => {
			if (chunks.length === 0) {
				resolve({});
				return;
			}
			try {
				resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
			} catch {
				reject(/* @__PURE__ */ new Error("invalid-json"));
			}
		});
		req.on("error", reject);
	});
}
/** Wrap one async service call as a GET JSON route. */
function getRoute(path, run) {
	return {
		kind: "exact",
		path,
		handler: (req, res) => {
			if (!requireMethod(req, res, "GET")) return;
			run().then((value) => json(res, 200, value), (error) => {
				json(res, 500, {
					ok: false,
					error: error instanceof Error ? error.message : String(error)
				});
			});
		}
	};
}
/** Wrap one async service call as a POST JSON route (body passed through). */
function postRoute(path, run) {
	return {
		kind: "exact",
		path,
		handler: (req, res) => {
			if (!requireMethod(req, res, "POST")) return Promise.resolve();
			return readJsonBody(req).then((body) => {
				return run(typeof body === "object" && body !== null ? body : {}).then((value) => json(res, 200, value), (error) => {
					json(res, 400, {
						ok: false,
						error: error instanceof Error ? error.message : String(error)
					});
				});
			}, (error) => {
				json(res, 400, {
					ok: false,
					error: error instanceof Error ? error.message : String(error)
				});
			});
		}
	};
}
/** Legacy URL aliases: each entry's directory basename (e.g. 'whale'). */
function dirAliases(registry) {
	const aliases = /* @__PURE__ */ new Map();
	for (const entry of registry.entries) {
		const alias = entry.dir.split(/[\\/]/).pop() ?? "";
		if (alias !== "" && !aliases.has(alias)) aliases.set(alias, entry);
	}
	return aliases;
}
/**
* The one asset handler behind the '/pet' prefix. Resolves the pet by id (or
* legacy directory alias), then serves exactly the files a manifest declares:
* pet.json, the declared spritesheet path, and optional 'previews/<name>'
* media. Composed pets without a manifest file get a synthesized pet.json.
*/
function assetHandler(registry) {
	const aliases = dirAliases(registry);
	return (req, res) => {
		if (req.method !== "GET" && req.method !== "HEAD") {
			res.writeHead(405);
			res.end();
			return;
		}
		let pathname;
		try {
			pathname = new URL(req.url ?? "/", "http://pet.local").pathname;
		} catch {
			res.writeHead(400);
			res.end();
			return;
		}
		const segments = pathname.split("/").filter((segment) => segment !== "");
		if (segments[0] !== "pet" || segments[1] === void 0) {
			res.writeHead(404);
			res.end();
			return;
		}
		let id;
		try {
			id = decodeURIComponent(segments[1]);
		} catch {
			res.writeHead(400);
			res.end();
			return;
		}
		const entry = registry.byId(id) ?? aliases.get(id);
		if (entry === void 0) {
			res.writeHead(404);
			res.end();
			return;
		}
		const rest = [];
		for (const segment of segments.slice(2)) {
			let decoded;
			try {
				decoded = decodeURIComponent(segment);
			} catch {
				res.writeHead(400);
				res.end();
				return;
			}
			rest.push(decoded);
		}
		const rel = rest.join("/");
		let file;
		let synthesized = false;
		if (rest.length === 1 && rest[0] === MANIFEST_FILE) {
			const manifestFile = join(entry.dir, MANIFEST_FILE);
			file = existsSync(manifestFile) ? manifestFile : void 0;
			if (file === void 0) synthesized = true;
		} else if (rest.length > 0 && rel === entry.spritesheetPath) file = join(entry.dir, entry.spritesheetPath);
		else if (rest.length === 2 && rest[0] === PREVIEW_DIR && PREVIEW_PATTERN.test(rest[1])) {
			const preview = join(entry.dir, PREVIEW_DIR, rest[1]);
			file = existsSync(preview) ? preview : void 0;
		}
		if (synthesized) {
			const body = Buffer.from(JSON.stringify(petEntryView(entry), null, 2), "utf8");
			res.writeHead(200, {
				"content-type": "application/json; charset=utf-8",
				"content-length": String(body.byteLength),
				"cache-control": "no-cache"
			});
			if (req.method === "HEAD") {
				res.end();
				return;
			}
			res.end(body);
			return;
		}
		if (file === void 0) {
			res.writeHead(404);
			res.end();
			return;
		}
		const resolved = file;
		readFile(resolved).then((body) => {
			res.writeHead(200, {
				"content-type": mimeFor(resolved),
				"content-length": String(body.byteLength),
				"cache-control": "no-cache"
			});
			if (req.method === "HEAD") {
				res.end();
				return;
			}
			res.end(body);
		}, () => {
			res.writeHead(404);
			res.end();
		});
	};
}
/** Build the full route family (API + assets) for one service. */
function makePetRoutes(deps) {
	const { service } = deps;
	const apiRoutes = [
		getRoute("/api/pet/state", () => service.state()),
		getRoute("/api/pet/pets", () => service.pets()),
		postRoute("/api/pet/interact", (body) => {
			const kind = body.kind;
			if (kind !== "pet" && kind !== "feed") return Promise.reject(/* @__PURE__ */ new Error("invalid-kind"));
			return service.interact(kind);
		}),
		postRoute("/api/pet/set-visible", (body) => {
			const visible = body.visible;
			if (typeof visible !== "boolean") return Promise.reject(/* @__PURE__ */ new Error("invalid-visible"));
			return service.setVisible(visible);
		}),
		postRoute("/api/pet/set-config", (body) => service.setConfig({
			...typeof body.size === "number" ? { size: body.size } : {},
			...typeof body.right === "number" ? { right: body.right } : {},
			...typeof body.bottom === "number" ? { bottom: body.bottom } : {},
			...typeof body.visible === "boolean" ? { visible: body.visible } : {}
		})),
		postRoute("/api/pet/set-name", (body) => {
			const name = body.name;
			if (typeof name !== "string") return Promise.reject(/* @__PURE__ */ new Error("invalid-name"));
			return service.setName(name);
		}),
		postRoute("/api/pet/set-pet", (body) => {
			const petId = body.petId;
			if (typeof petId !== "string") return Promise.reject(/* @__PURE__ */ new Error("invalid-pet"));
			return service.setPetId(petId);
		})
	];
	const assetRoute = {
		kind: "prefix",
		path: PET_ASSET_PREFIX,
		handler: assetHandler(service.registrySnapshot())
	};
	return [...apiRoutes, assetRoute];
}
//#endregion
//#region src/index.ts
/** Stable cordis plugin name (matches cordis.patch.yml insert id). */
const name = "pet";
/** Services required before the pet can mount its surfaces. */
const inject = ["webServer"];
/**
* Settings section schema: pet selection and display fields the web settings
* surface edits. petId is a plain string on purpose: the service clamps the
* resolved value against the registry, so a stored selection that points at
* a removed pet cannot invalidate the section (a strict union would refuse
* the whole registration). The settings card renders the actual registry
* choices itself from '/api/pet/pets'.
*/
function makePetSettingsSchema(fallbackPetId) {
	return z.object({
		visible: z.boolean().default(true),
		size: z.number().step(1).min(32).max(512).default(160),
		right: z.number().step(1).min(0).max(DISPLAY_INSET_MAX).default(24),
		bottom: z.number().step(1).min(0).max(DISPLAY_INSET_MAX).default(20),
		petId: z.string().default(fallbackPetId),
		enabled: z.boolean().default(true)
	});
}
/** Register the pet service and its API + asset routes on the context. */
function apply(ctx, config = {}) {
	const registry = config.registry ?? loadPetRegistry({
		packageRoot: petPackageRoot(import.meta.url),
		...config.pets === void 0 ? {} : { extra: config.pets }
	});
	const service = new PetService(ctx, {
		...config,
		registry
	});
	let current = () => base;
	const base = {
		visible: service.display().visible,
		size: service.display().size,
		right: service.display().right,
		bottom: service.display().bottom,
		petId: service.selectedPetId(),
		enabled: config.enabled ?? true
	};
	const routes = makePetRoutes({ service });
	let disposeRoutes;
	const syncRoutes = () => {
		const enabled = current().enabled ?? true;
		if (disposeRoutes === void 0 && enabled) disposeRoutes = ctx.effect(() => {
			const disposers = routes.map((route) => ctx.webServer.register(route));
			return () => {
				for (const dispose of disposers) dispose();
			};
		}, "pet: routes");
		else if (disposeRoutes !== void 0 && !enabled) {
			disposeRoutes();
			disposeRoutes = void 0;
		}
	};
	installSettingsSection(ctx, settingsNamespace("pet"), makePetSettingsSchema(service.selectedPetId()), base, {
		setSource: (source) => {
			current = source;
		},
		onChange: () => {
			const section = current();
			service.applySettingsSection(section);
			service.setEnabled(section.enabled ?? true);
			syncRoutes();
		}
	});
	syncRoutes();
}
//#endregion
export { AFFINITY_MAX, AFFINITY_RANKS, DEFAULT_FRAME_COUNTS, DEFAULT_PET_CELL, DEFAULT_PET_COLUMNS, DEFAULT_PET_ID, DEFAULT_PET_NAME, DEFAULT_PET_ROW_COUNT, DEFAULT_TRACK_PATTERNS, PET_API_PREFIX, PET_ASSET_PREFIX, PET_NAME_MAX_LENGTH, PET_ROW_ORDER, PetService, PetStateMachine, animationForPhase, apply, applyInteraction, applyTurnReward, codexPetsDir, consumeTreat, defaultDisplayConfig, defaultTreatConfig, emptyAffinity, emptyPersist, emptyTreatLedger, inject, loadPetPersist, loadPetRegistry, makePetRoutes, makePetSettingsSchema, name, petEntryView, petHomeDir, petPackageRoot, rankOf, resolvePetManifest, rowOf, savePetPersist, settleTreatGrants };
