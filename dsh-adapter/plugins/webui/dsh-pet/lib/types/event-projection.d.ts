/**
 * Official session event projection — pure. Maps the durable DSH session
 * vocabulary onto the pet's visual phases and carries an optional completed-
 * turn reward for the ledger. Holds no state of its own; callers keep a
 * {@link ProjectionRuntime} per session and feed events in arrival order.
 * @module @linxin666/dsh-pet/event-projection
 */
import type { SessionEvent } from '@nuaagent/session';
import type { PetStateInput } from './state.ts';
/** Runtime shape of the optional legacy activity event. */
export interface ActivityStatusEventLike {
    phase?: string;
    line?: string;
    phrase?: string;
}
/** Per-session facts needed to project the official event stream. */
export interface ProjectionRuntime {
    activeTools: Set<string>;
    officialEventsSeen: boolean;
    stepHadFailure: boolean;
}
/** One official event projection, optionally carrying a completed turn reward. */
export interface PetActivityTransition {
    input: PetStateInput;
    completedTurn?: number;
}
/** Fresh projection runtime for a newly seen session. */
export declare function emptyProjectionRuntime(): ProjectionRuntime;
/** Whether a legacy phase is part of the pet's supported vocabulary. */
export declare function isActivityPhase(phase: string): phase is PetStateInput['phase'];
/**
 * Project the durable DSH session vocabulary into the pet's visual phases.
 * Unknown and log-only events do not disturb the last meaningful activity.
 */
export declare function projectOfficialEvent(event: SessionEvent, runtime: ProjectionRuntime): PetActivityTransition | undefined;
//# sourceMappingURL=event-projection.d.ts.map