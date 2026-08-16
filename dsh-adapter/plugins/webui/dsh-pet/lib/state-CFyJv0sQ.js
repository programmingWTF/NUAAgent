//#region src/affinity.ts
const AFFINITY_MAX = 100;
/** Affinity ranks by points; the pet visibly grows with its rank.
*  Marker glyphs are plain ASCII (the repo bans all emoji characters);
*  they read as a growing star trail alongside the rank name. */
const AFFINITY_RANKS = [
	{
		min: 0,
		name: "幼鲸",
		emoji: "*"
	},
	{
		min: 25,
		name: "伙伴",
		emoji: "**"
	},
	{
		min: 50,
		name: "挚友",
		emoji: "***"
	},
	{
		min: 80,
		name: "深海羁绊",
		emoji: "****"
	}
];
const defaultAffinityConfig = {
	turnReward: 1,
	petReward: 1,
	petCooldownMs: 1e4,
	feedReward: 5,
	feedCooldownMs: 3e4
};
function emptyAffinity() {
	return {
		points: 0,
		lastPetAt: 0,
		lastFeedAt: 0,
		pets: 0,
		feeds: 0,
		turns: 0
	};
}
/** Rank for a point total. */
function rankOf(points) {
	let rank = AFFINITY_RANKS[0];
	for (const candidate of AFFINITY_RANKS) if (points >= candidate.min) rank = candidate;
	return rank;
}
/** Derive the read-only view of one affinity state at a wall-clock instant. */
function affinityViewOf(state, nowMs, config = defaultAffinityConfig) {
	const rank = rankOf(state.points);
	return {
		points: state.points,
		rank: rank.name,
		rankEmoji: rank.emoji,
		pets: state.pets,
		feeds: state.feeds,
		turns: state.turns,
		petCooldown: nowMs - state.lastPetAt < config.petCooldownMs,
		feedCooldown: nowMs - state.lastFeedAt < config.feedCooldownMs
	};
}
function clamp(points) {
	return Math.min(100, Math.max(0, points));
}
/**
* Apply one interaction to a copy of the state (immutable style: returns a
* new object; the caller replaces the persisted state). Cooldowns only
* apply once the pet has been interacted with at least once (last*At === 0
* means "never", so the first pet/feed always lands).
*/
function applyInteraction(state, kind, nowMs, config = defaultAffinityConfig) {
	const next = { ...state };
	if (kind === "pet") {
		if (state.lastPetAt !== 0 && nowMs - state.lastPetAt < config.petCooldownMs) return {
			affinity: state,
			delta: 0,
			reaction: "摸过头啦，让鲸鱼娘歇口气～",
			accepted: false
		};
		next.lastPetAt = nowMs;
		next.pets += 1;
		next.points = clamp(state.points + config.petReward);
		return {
			affinity: next,
			delta: config.petReward,
			reaction: "咕噜咕噜～被摸摸好舒服！",
			accepted: true
		};
	}
	if (kind === "feed") {
		if (state.lastFeedAt !== 0 && nowMs - state.lastFeedAt < config.feedCooldownMs) return {
			affinity: state,
			delta: 0,
			reaction: "吃饱啦，晚点再喂～",
			accepted: false
		};
		next.lastFeedAt = nowMs;
		next.feeds += 1;
		next.points = clamp(state.points + config.feedReward);
		return {
			affinity: next,
			delta: config.feedReward,
			reaction: "呜哇！小鱼干好好吃！",
			accepted: true
		};
	}
	return {
		affinity: state,
		delta: 0,
		reaction: "",
		accepted: false
	};
}
/** Reward one completed turn (called by the host on `done`). */
function applyTurnReward(state, config = defaultAffinityConfig) {
	const next = { ...state };
	next.turns += 1;
	next.points = clamp(state.points + config.turnReward);
	return next;
}
//#endregion
//#region src/state.ts
const defaultPetStateConfig = { celebrateMs: 2400 };
/**
* Map one activity phase onto the animation contract.
* - thinking → `running` and tool → `running-right` (focused work).
* - review → `review` while answer text is streaming.
* - waiting → `waiting` (expectant pose, needs user input).
* - done → `jumping` (celebration), then back to `idle` after the window.
* - failed → `failed` until another activity event arrives.
* - idle → `idle` (calm breathing loop).
*/
function animationForPhase(phase) {
	switch (phase) {
		case "thinking": return "running";
		case "tool": return "running-right";
		case "review": return "review";
		case "waiting": return "waiting";
		case "done": return "jumping";
		case "failed": return "failed";
		case "idle": return "idle";
	}
}
/** The spritesheet row index for one animation track. */
function rowOf(animation) {
	return {
		"idle": 0,
		"running-right": 1,
		"running-left": 2,
		"waving": 3,
		"jumping": 4,
		"failed": 5,
		"waiting": 6,
		"running": 7,
		"review": 8
	}[animation];
}
/**
* PetStateMachine — one instance per host process. Holds only the latest
* input snapshot and the celebration timing; no storage, no side effects.
*/
var PetStateMachine = class {
	config;
	now;
	phase = "idle";
	line;
	phrase;
	sessionActive = false;
	doneAt;
	constructor(config = defaultPetStateConfig, now = Date.now) {
		this.config = config;
		this.now = now;
	}
	/** Consume one projected activity update. */
	onActivityStatus(input) {
		this.phase = input.phase;
		this.line = input.line;
		this.phrase = input.phrase;
		if (input.phase === "done") this.doneAt = this.now();
	}
	/** A session became the active one (or a fresh session started). */
	onSessionActive() {
		this.sessionActive = true;
	}
	/** The active session was disposed (or none left). */
	onSessionDisposed() {
		this.sessionActive = false;
		this.phase = "idle";
		this.line = void 0;
		this.phrase = void 0;
		this.doneAt = void 0;
	}
	/** Render the current animation decision. */
	render() {
		const nowMs = this.now();
		let animation = animationForPhase(this.phase);
		if (this.phase === "done" && this.doneAt !== void 0) if (nowMs - this.doneAt < this.config.celebrateMs) animation = "jumping";
		else animation = "idle";
		const bubble = this.phase === "done" && this.doneAt !== void 0 && nowMs - this.doneAt >= this.config.celebrateMs ? void 0 : this.phrase ?? this.line;
		return {
			animation,
			...bubble === void 0 ? {} : { bubble },
			animationStartedAt: nowMs,
			phase: this.phase,
			sessionActive: this.sessionActive
		};
	}
};
//#endregion
export { AFFINITY_MAX as a, applyInteraction as c, emptyAffinity as d, rankOf as f, rowOf as i, applyTurnReward as l, animationForPhase as n, AFFINITY_RANKS as o, defaultPetStateConfig as r, affinityViewOf as s, PetStateMachine as t, defaultAffinityConfig as u };
