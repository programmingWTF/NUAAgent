import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PluginSettingsCard, ValueField, BooleanField, ChoiceField } from "./PluginSettingsCard.js";
import { CardForm, booleanField, choiceField, numberField } from "./settings-form.js";
import sectionCss from './settings-section.module.css';
/** Fetch the registry list (the same data the sprite renders from). */
async function fetchPetChoices() {
    const response = await fetch('/api/pet/pets');
    if (!response.ok)
        throw new Error('pet pets failed: ' + response.status);
    return (await response.json());
}
/** Bridges the 'pet' scope onto the card's staged form. */
export class PetSettingsCardController {
    form;
    store;
    // The choice list rides a mutable array shared with the choiceField spec,
    // so loading the registry re-validates and re-formats the petId field
    // without rebuilding the form.
    petChoices = [];
    petLabels = new Map();
    loaded = false;
    attempts = 0;
    /** @param scope - the bound settings scope for the 'pet' namespace. */
    constructor(scope) {
        this.form = new CardForm(scope, [
            booleanField('enabled'),
            booleanField('visible'),
            numberField('size'),
            numberField('right'),
            numberField('bottom'),
            choiceField('petId', this.petChoices),
        ]);
        this.store = this.form.bind(() => this.projection());
        void this.loadPets();
    }
    /** Resolve the registry choices once (retried a few times on failure). */
    async loadPets() {
        if (this.loaded)
            return;
        try {
            const list = await fetchPetChoices();
            this.petChoices.splice(0, this.petChoices.length, ...list.map(choice => choice.id));
            for (const choice of list)
                this.petLabels.set(choice.id, choice.displayName);
            this.loaded = true;
            this.store.set(this.projection());
        }
        catch {
            this.attempts += 1;
            if (this.attempts < 3) {
                window.setTimeout(() => { void this.loadPets(); }, 3000);
            }
        }
    }
    projection() {
        return {
            ...this.form.shell(),
            enabled: this.form.field('enabled'),
            visible: this.form.field('visible'),
            size: this.form.field('size'),
            right: this.form.field('right'),
            bottom: this.form.field('bottom'),
            petId: this.form.field('petId'),
            petChoices: this.petChoices.map(id => ({ value: id, label: this.petLabels.get(id) ?? id })),
        };
    }
    /**
     * Build the face the card's slot registration injects.
     * @returns the card's snapshot and its form actions.
     */
    inject() {
        return { hooks: { petSettingsCard: this.store }, ...this.form.actions() };
    }
}
/**
 * Render the pet settings card.
 * @param props - locale copy, the card snapshot, and its form actions.
 * @returns the card.
 */
export function PetSettingsCard(props) {
    const { t } = props;
    const state = props.usePetSettingsCard(snapshot => snapshot);
    const disabled = !state.writable;
    const fieldProps = {
        overriddenLabel: t('settings.overridden'),
        resetLabel: t('settings.reset'),
        invalidLabel: t('settings.invalidNumber'),
        disabled,
    };
    return (_jsxs(PluginSettingsCard, { t: t, titleKey: "settings.title", descriptionKey: "settings.description", state: state, onSave: props.save, onDiscard: props.discard, alwaysOpen: true, children: [_jsx(BooleanField, { id: "settings-pet-enabled", label: t('settings.enabled'), hint: t('settings.enabledHint'), inheritLabel: t('settings.inherit'), onLabel: t('settings.on'), offLabel: t('settings.off'), ...fieldProps, ...state.enabled, onEdit: (text) => { props.edit('enabled', text); }, onReset: () => { props.resetField('enabled'); } }), _jsx(ChoiceField, { id: "settings-pet-pet", label: t('settings.pet'), hint: t('settings.petHint'), inheritLabel: t('settings.inherit'), ...fieldProps, ...state.petId, choices: state.petChoices, onEdit: (text) => { props.edit('petId', text); }, onReset: () => { props.resetField('petId'); } }), _jsx(BooleanField, { id: "settings-pet-visible", label: t('settings.visible'), hint: t('settings.visibleHint'), inheritLabel: t('settings.inherit'), onLabel: t('settings.on'), offLabel: t('settings.off'), ...fieldProps, ...state.visible, onEdit: (text) => { props.edit('visible', text); }, onReset: () => { props.resetField('visible'); } }), _jsx(ValueField, { id: "settings-pet-size", label: t('settings.size'), hint: t('settings.sizeHint'), numeric: true, ...fieldProps, ...state.size, onEdit: (text) => { props.edit('size', text); }, onReset: () => { props.resetField('size'); } }), _jsx(ValueField, { id: "settings-pet-right", label: t('settings.right'), hint: t('settings.rightHint'), numeric: true, ...fieldProps, ...state.right, onEdit: (text) => { props.edit('right', text); }, onReset: () => { props.resetField('right'); } }), _jsx(ValueField, { id: "settings-pet-bottom", label: t('settings.bottom'), hint: t('settings.bottomHint'), numeric: true, ...fieldProps, ...state.bottom, onEdit: (text) => { props.edit('bottom', text); }, onReset: () => { props.resetField('bottom'); } })] }));
}
/** Render the pet settings card as a first-level settings page. */
export function PetSettingsSection(props) {
    const { t, usePetSettingsCard, save, discard, edit, resetField } = props;
    return (_jsx("ul", { className: sectionCss.sectionList, children: _jsx(PetSettingsCard, { t: t, usePetSettingsCard: usePetSettingsCard, save: save, discard: discard, edit: edit, resetField: resetField }) }));
}
