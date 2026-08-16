/**
 * The pet settings card: pet selection plus display layout, bound to the
 * 'pet' settings namespace the host plugin registers. Rendered as an
 * always-open first-level settings page; the section wrapper below mounts it
 * as the content of the top-level 'settings.section' nav entry. The petId
 * choices come from the registry endpoint ('/api/pet/pets') — the same list
 * the sprite renders from — so the card carries no per-pet knowledge.
 */
import type { ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@nuaagent/client-ui-slots';
import type { SettingsScope, SnapshotStore } from '@nuaagent/client-runtime/client';
import { type CardActions, type CardShell, type FieldState as CardFieldState } from './settings-form.ts';
/** The pet's settings fields this card edits (the namespace's full schema). */
export interface PetSettings {
    /** Master switch for the plugin. */
    enabled?: boolean;
    /** Master switch. */
    visible?: boolean;
    /** Scale of the rendered pet in px (sprite cell height). */
    size?: number;
    /** Horizontal inset from the viewport right edge, px. */
    right?: number;
    /** Vertical inset from the viewport bottom edge, px. */
    bottom?: number;
    /** Selected pet id (a registry entry). */
    petId?: string;
}
/** What the pet settings card renders. */
export interface PetSettingsCardState extends CardShell {
    /** Plugin master switch. */
    enabled: CardFieldState;
    /** Master switch. */
    visible: CardFieldState;
    /** Pet scale. */
    size: CardFieldState;
    /** Right inset. */
    right: CardFieldState;
    /** Bottom inset. */
    bottom: CardFieldState;
    /** Selected pet. */
    petId: CardFieldState;
    /** Pet choices (registry ids + display names), loaded from the host. */
    petChoices: readonly {
        value: string;
        label: string;
    }[];
}
/** The registration-side face the card's slot entry injects. */
export interface PetSettingsCardFace extends CardActions {
    hooks: {
        /** Card snapshot bound by the renderer as usePetSettingsCard. */
        petSettingsCard: SnapshotStore<PetSettingsCardState>;
    };
}
/** Bridges the 'pet' scope onto the card's staged form. */
export declare class PetSettingsCardController {
    private readonly form;
    private readonly store;
    private readonly petChoices;
    private readonly petLabels;
    private loaded;
    private attempts;
    /** @param scope - the bound settings scope for the 'pet' namespace. */
    constructor(scope: SettingsScope<PetSettings>);
    /** Resolve the registry choices once (retried a few times on failure). */
    private loadPets;
    private projection;
    /**
     * Build the face the card's slot registration injects.
     * @returns the card's snapshot and its form actions.
     */
    inject(): PetSettingsCardFace;
}
/** Props the renderer binds for the pet settings card. */
export type PetSettingsCardProps = PropsLocale<'pet'> & InjectFace<PetSettingsCardFace>;
/**
 * Render the pet settings card.
 * @param props - locale copy, the card snapshot, and its form actions.
 * @returns the card.
 */
export declare function PetSettingsCard(props: PetSettingsCardProps): import("react").JSX.Element;
/** Props the settings section binds for the pet card page. */
export type PetSettingsSectionProps = PropsRuntime<'settings.section'> & PropsLocale<'pet'> & InjectFace<PetSettingsCardFace>;
/** Render the pet settings card as a first-level settings page. */
export declare function PetSettingsSection(props: PetSettingsSectionProps): ReactNode;
//# sourceMappingURL=PetSettingsCard.d.ts.map