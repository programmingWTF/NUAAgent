/**
 * dsh-pet browser half — mounts the selected pet as a global floating
 * surface and drives it from the host's same-origin '/api/pet/*' JSON
 * endpoints: fetch the registry list once, poll the host snapshot (~2 s),
 * forward interactions, persist drag positions. The pet is host-global (no
 * session dimension), so it mounts directly onto 'document.body' via a
 * single React root rather than a session-scoped slot — on the
 * new-conversation screen no session exists, and a dock-mounted pet would
 * vanish there (issue #48). When the pet is hidden the entry becomes a
 * fixed-position summon button.
 * @module @linxin666/dsh-pet/client
 */
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createPetStore } from "./pet-store.js";
import { PetDockEntry } from "./PetDockEntry.js";
import { PetSettingsSection, PetSettingsCardController } from "./PetSettingsCard.js";
import { NS, en, zh, t } from "./locales.js";
/** Same-origin JSON fetch helper (GET without body, POST with JSON body). */
async function petFetch(path, body) {
    const response = await fetch(path, body === undefined
        ? {}
        : {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        });
    if (!response.ok) {
        throw new Error('pet ' + path + ' failed: ' + response.status);
    }
    return (await response.json());
}
/** The live host API instance (always defined; failures surface per call). */
const petApi = {
    state: () => petFetch('/api/pet/state'),
    pets: () => petFetch('/api/pet/pets'),
    interact: (kind) => petFetch('/api/pet/interact', { kind }),
    setVisible: (visible) => petFetch('/api/pet/set-visible', { visible }),
    setConfig: (patch) => petFetch('/api/pet/set-config', patch),
    setName: (name) => petFetch('/api/pet/set-name', { name }),
    setPet: (petId) => petFetch('/api/pet/set-pet', { petId }),
};
/** Poll interval for the host snapshot. */
const POLL_MS = 2000;
/** Settings namespace the pet settings card edits (the Host plugin registers it). */
const PET_SETTINGS_NS = 'pet';
/** Required services. */
export const inject = ['slots', 'locale', 'connection', 'settingsScope', 'remote'];
/**
 * Client plugin body: register dictionaries, mount the global pet entry and
 * poll loop while the plugin is enabled, and seat the settings card as a
 * first-level settings section.
 * @param ctx - client root context.
 */
export function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'pet: dictionaries');
    const binder = ctx.get('webUiSettings') ?? ctx.settingsScope;
    const settingsScope = binder.bind({ namespace: PET_SETTINGS_NS });
    const enabled = () => {
        const snapshot = settingsScope.getSnapshot();
        return snapshot.status === 'ready'
            ? snapshot.value?.enabled ?? true
            : snapshot.status === 'unavailable';
    };
    // First-level settings section: one staged form over the 'pet' settings
    // namespace, registered as a top-level settings page. The controller loads
    // the petId choices from the registry endpoint itself.
    const petSettings = new PetSettingsCardController(settingsScope);
    ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: 'pet',
        order: 130,
        label: () => ctx.locale.bind('pet')('settings.title'),
        locale: 'pet',
        inject: () => petSettings.inject(),
    }, PetSettingsSection));
    // The global pet entry, its store, and the poll loop live while the plugin
    // is enabled; toggling the setting off hides the pet and stops polling.
    let disposeUi;
    const syncUi = () => {
        if (enabled() && disposeUi === undefined) {
            // ONE store instance for the whole app, owned by this apply body. The
            // pet is host-global (state/display/interactions are /api/pet/*
            // endpoints with no session dimension), so the slot system's per-session
            // store scoping would only reset the pet on session switches and leave
            // it stateless on the new-conversation screen (no session to scope by).
            const petStore = createPetStore().create();
            const setSnapshot = petStore.actions.setSnapshot;
            const setPets = petStore.actions.setPets;
            const setState = petStore.actions.setState;
            const setFeedback = petStore.actions.setFeedback;
            // The registry list is fetched lazily with retries baked into the poll
            // cycle: until it lands, the dock entry renders nothing and every 2s
            // tick tries again. After it lands, one list feeds both the sprite and
            // the settings card's choices.
            let petsLoaded = false;
            const pollNow = () => {
                if (!petsLoaded) {
                    petApi.pets().then((list) => {
                        petsLoaded = true;
                        setPets(list);
                    }, () => {
                        // Retry on the next poll tick.
                    });
                }
                petApi.state().then((snapshot) => {
                    setSnapshot(snapshot);
                }, () => {
                    setState('error', 'pet.state transport error');
                });
            };
            const disposePoll = ctx.effect(() => {
                // Poll only while the tab is visible: the host snapshot does not
                // change while the page is hidden, so a background interval would
                // only burn RPCs (browser throttling is an unreliable backstop).
                // Coming back to the tab refreshes the pet immediately instead of
                // waiting out the next 2 s cycle.
                let timer;
                const stop = () => {
                    if (timer !== undefined) {
                        window.clearInterval(timer);
                        timer = undefined;
                    }
                };
                const start = () => {
                    if (timer === undefined && document.visibilityState === 'visible') {
                        timer = window.setInterval(pollNow, POLL_MS);
                    }
                };
                const onVisibility = () => {
                    if (document.visibilityState === 'visible') {
                        pollNow();
                        start();
                    }
                    else {
                        stop();
                    }
                };
                start();
                document.addEventListener('visibilitychange', onVisibility);
                return () => {
                    stop();
                    document.removeEventListener('visibilitychange', onVisibility);
                };
            }, 'pet: poll');
            const injected = () => ({
                store: petStore,
                ensure: pollNow,
                pet: () => {
                    petApi.interact('pet').then((result) => {
                        setFeedback({
                            text: result.reaction,
                            kind: 'pet',
                            at: Date.now(),
                        });
                    }, () => {
                        // Ignore transport errors on interactions; the next poll resyncs.
                    });
                },
                feed: () => {
                    petApi.interact('feed').then((result) => {
                        setFeedback({
                            text: result.reaction,
                            kind: 'feed',
                            at: Date.now(),
                        });
                    }, () => {
                        // Ignore transport errors on interactions; the next poll resyncs.
                    });
                },
                hide: () => {
                    petApi.setVisible(false).then(() => {
                        pollNow();
                    }, () => {
                        // Ignore; next poll resyncs.
                    });
                },
                summon: () => {
                    petApi.setVisible(true).then(() => {
                        pollNow();
                    }, () => {
                        // Ignore; next poll resyncs.
                    });
                },
                dragEnd: (right, bottom) => {
                    petApi.setConfig({ right, bottom }).then(() => {
                        pollNow();
                    }, () => {
                        // Ignore; next poll resyncs.
                    });
                },
                rename: (name) => {
                    petApi.setName(name).then((result) => {
                        if (result.ok)
                            pollNow();
                    }, () => {
                        // Ignore; next poll resyncs.
                    });
                },
                feedbackDone: () => {
                    setFeedback(null);
                },
            });
            // The pet is host-global (its state/display/interactions have no session
            // dimension), and the official rc.6 shell declares no root-scoped slot
            // for a global floating surface — the dock is session-scoped, so a pet
            // mounted there would vanish on the new-conversation screen (issue #48).
            // The entry therefore mounts straight onto document.body via a single
            // React root for the page lifetime: PetSprite portals itself to body
            // when visible, and the hidden-state summon button is fixed-positioned.
            const container = document.createElement('div');
            container.dataset.dshPetRoot = '';
            document.body.appendChild(container);
            const petRoot = createRoot(container);
            petRoot.render(createElement(PetDockEntry, { ...injected(), t }));
            disposeUi = () => {
                petRoot.unmount();
                container.remove();
                disposePoll();
                disposeUi = undefined;
            };
        }
        else if (!enabled() && disposeUi !== undefined) {
            disposeUi();
            disposeUi = undefined;
        }
    };
    settingsScope.subscribe(syncUi);
    syncUi();
}
