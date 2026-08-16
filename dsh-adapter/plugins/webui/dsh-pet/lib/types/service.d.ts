/**
 * Pet host service — the `pet.*` RPC domain. A composition facade: it wires
 * the pure event projection (`event-projection`) onto the state machine,
 * delegates the affinity economy to the ledger (`ledger`), and routes
 * persistence through `persist`. The API gateway maps these methods onto
 * `pet.state` / `pet.pets` / `pet.interact` / `pet.setVisible` /
 * `pet.setConfig` / `pet.setName` / `pet.setPet` for browser consumers.
 * @module @linxin666/dsh-pet/service
 */
import { Context, Service } from '@nuaagent/cordis';
import type { AffinityConfig, PetAffinityView, PetInteraction } from './affinity.ts';
import type { TreatConfig } from './treats.ts';
import { type LedgerInteractionResult } from './ledger.ts';
import { type PetDisplayConfig } from './persist.ts';
import { type PetDefinition, type PetManifest, type PetRegistry } from './registry.ts';
import { type PetStateConfig, type PetStateSnapshot } from './state.ts';
/** Plugin configuration. */
export interface PetConfig {
    /** Affinity tuning. */
    affinity?: Partial<AffinityConfig>;
    /** State machine tuning. */
    state?: Partial<PetStateConfig>;
    /** Treat economy tuning. */
    treats?: Partial<TreatConfig>;
    /** Persistence directory override (defaults to $DSH_HOME). */
    persistDir?: string;
    /** Master switch for the plugin (browser half + host routes). */
    enabled?: boolean;
    /** Prebuilt registry (tests); defaults to scanning the package + user dirs. */
    registry?: PetRegistry;
    /** Extra manifest entries composed by the embedding application. */
    pets?: readonly PetManifest[];
}
/**
 * The pet's settings-namespace section: the pet selection and display fields
 * the web settings surface edits. `right`/`bottom` are also updated by drag
 * interactions, which keep the settings document in sync through the service.
 * Naming is per pet and lives outside the settings document (the hover-panel
 * rename targets the selected pet).
 */
export interface PetSettingsSection {
    /** Selected pet id (a registry entry; the service clamps stale values). */
    petId?: string;
    /** Master switch. */
    visible: boolean;
    /** Scale of the rendered pet in px (sprite cell height). */
    size: number;
    /** Horizontal inset from the viewport right edge, px. */
    right: number;
    /** Vertical inset from the viewport bottom edge, px. */
    bottom: number;
    /** Master switch for the plugin (browser half + host routes). */
    enabled?: boolean;
}
/** Settings namespace of the pet capability. Spelled here rather than imported: the browser half spells the same value. */
export declare const PET_SETTINGS_NAMESPACE = "pet";
/** Snapshot returned by `pet.state`. */
export interface PetStateView {
    animation: PetStateSnapshot['animation'];
    bubble?: string;
    phase: PetStateSnapshot['phase'];
    sessionActive: boolean;
    /** Affinity ledger snapshot. */
    affinity: PetAffinityView;
    /** Display configuration. */
    display: PetDisplayConfig;
    /** The selected pet's registry identity. */
    pet: {
        /** Registry id. */
        id: string;
        /** Manifest display name (unrenamed default). */
        displayName: string;
        /** Manifest description. */
        description: string;
    };
    /** The selected pet's display name (user rename or manifest default). */
    name: string;
    /** Treat (小鱼干) stock snapshot. */
    treats: {
        /** Stocked treats now. */
        stocked: number;
        /** Stock cap. */
        max: number;
    };
}
/** Result of `pet.interact`. */
export type PetInteractResult = LedgerInteractionResult;
declare module '@nuaagent/cordis' {
    interface Context {
        pet: PetService;
    }
}
/**
 * Cordis service exposing the pet RPC domain. Lazy: nothing is scanned or
 * written until an economic event or interaction arrives; event listeners
 * update only in-memory state, and persistence happens on economic changes
 * (turn rewards, feeds, config/name changes) — never on a read.
 */
export declare class PetService extends Service {
    static inject: string[];
    private readonly machine;
    private readonly ledger;
    private readonly registry;
    private readonly persistDir;
    private enabled;
    private disposeActivity;
    /** Session whose most recent meaningful event currently drives the global pet. */
    private displaySession;
    private readonly sessionActivity;
    constructor(ctx: Context, config?: PetConfig);
    /** Whether the pet service consumes session activity while enabled. */
    isEnabled(): boolean;
    /** RPC: current pet state snapshot. */
    state(): Promise<PetStateView>;
    /** Current persisted display config (read-only view). */
    display(): PetDisplayConfig;
    /** RPC: the registry entries the browser half renders and selects from. */
    pets(): Promise<PetDefinition[]>;
    /** The loaded registry (the asset routes serve its entries). */
    registrySnapshot(): PetRegistry;
    /** The selected pet's registry entry. */
    activeEntry(): NonNullable<PetRegistry['entries'][number]>;
    /** Currently selected pet id (persisted). */
    selectedPetId(): string;
    /** The display name of one pet (user rename or manifest displayName). */
    petName(petId?: string): string;
    /** RPC: switch the selected pet (persisted, settings document mirrored). */
    setPetId(petId: string): Promise<{
        ok: true;
        petId: string;
    } | {
        ok: false;
        error: string;
    }>;
    /** Start or stop the session-activity listeners that drive the pet. */
    setEnabled(enabled: boolean): void;
    private syncActivity;
    /** Return the projection state associated with one live session. */
    private activityRuntime;
    /** Commit one activity as the host-global pet's most recent display state. */
    private applyActivity;
    /** RPC: pet or feed the pet. */
    interact(kind: PetInteraction): Promise<PetInteractResult>;
    /** RPC: show or hide the pet. */
    setVisible(visible: boolean): Promise<{
        ok: true;
        display: PetDisplayConfig;
    }>;
    /** RPC: update display config (size / position). Values are clamped to whole pixels. */
    setConfig(patch: Partial<PetDisplayConfig>): Promise<{
        ok: true;
        display: PetDisplayConfig;
    }>;
    /** RPC: rename the selected pet (trimmed, 1–20 chars, per-pet storage). */
    setName(name: string): Promise<{
        ok: true;
        name: string;
    } | {
        ok: false;
        error: string;
    }>;
    /**
     * Apply a committed settings section to the persisted selection and display
     * config. Called by the settings surface on every change; values are
     * clamped exactly like the setConfig RPC so both write paths converge.
     * @param section - the resolved settings section.
     */
    applySettingsSection(section: PetSettingsSection): void;
    /** Mirror the persisted display config into the settings document (best-effort). */
    private syncSettingsFromPet;
    /** Award the turn reward once per completed turn (idempotent per session + turn). */
    private rewardTurn;
    /** Preserve turn rewards for installations that only emit legacy activity. */
    private rewardLegacyTurn;
    private view;
    private flush;
}
//# sourceMappingURL=service.d.ts.map