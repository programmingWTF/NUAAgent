import { installSettingsSection, settingsNamespace } from "@nuaagent/settings";
import z from "schemastery";
//#region src/index.ts
/** Stable cordis plugin name (matches cordis.patch.yml insert id). */
const name = "ui-community-plugins";
/** Services the settings registration needs (the settings seam is optional). */
const inject = [];
/**
* Settings namespace of the card's enable switch — the section the web
* settings surface edits. Spelled here rather than imported: the browser half
* spells the same value and must not depend on a Host package.
*/
const COMMUNITY_PLUGINS_SETTINGS_NAMESPACE = settingsNamespace("community-plugins");
const Config = z.object({ enabled: z.boolean().default(true) });
/**
* Register the community-plugins settings namespace. The application of the
* value is browser-side (the card hides its list while off), so the hooks
* only keep the source reachable; installSettingsSection is a no-op when no
* settings service is mounted (pure community-card installs skip it).
* @param ctx - cordis context.
*/
function apply(ctx) {
	installSettingsSection(ctx, COMMUNITY_PLUGINS_SETTINGS_NAMESPACE, Config, {}, {
		setSource: () => {},
		onChange: () => {}
	});
}
//#endregion
export { COMMUNITY_PLUGINS_SETTINGS_NAMESPACE, Config, apply, inject, name };
