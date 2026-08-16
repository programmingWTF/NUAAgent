/**
 * Persisted "the user has seen the trajectory" flag, at
 * `~/.dsh-tui/trajectory.json`.
 *
 * It exists so the key hint beside the status-line wake can retire itself.
 * A permanent `ctrl+t` printed on every frame forever is the classic symptom
 * of an affordance that does not carry its own meaning — it is read once and
 * then becomes furniture. Showing it only until the feature has actually been
 * opened keeps the teaching where teaching belongs (the first minute) and
 * leaves the steady state clean.
 *
 * Best effort, like every other pref here: a missing, unreadable or corrupt
 * file simply means "not seen yet", which fails toward showing the hint.
 */
/**
 * Parse a persisted `{ seen }` value.
 *
 * @param text - Raw file contents.
 * @returns True only for an explicit `seen: true`.
 */
export declare function parseTrajectorySeen(text: string): boolean;
/**
 * Whether the trajectory scene has ever been opened on this machine.
 *
 * @param dir - Prefs directory (injectable for tests).
 * @returns True when the flag is set.
 */
export declare function readTrajectorySeen(dir?: string): boolean;
/**
 * Record that the trajectory has been opened (best effort).
 *
 * @param dir - Prefs directory (injectable for tests).
 * @returns True when the file was written.
 */
export declare function writeTrajectorySeen(dir?: string): boolean;
//# sourceMappingURL=trajectoryPrefs.d.ts.map