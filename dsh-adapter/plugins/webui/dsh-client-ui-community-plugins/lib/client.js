window.__ModuleLoader__.load({
	id: "@linxin666/dsh-client-ui-community-plugins",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@nuaagent/client-runtime/client");
		//#region \0dsh-css:packages/dsh-community-plugins/src/client/settings-card.module.css.mjs
		const css$1 = ".hX6Abq_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.hX6Abq_card:hover{border-color:var(--dsw-alias-label-dimmed)}.hX6Abq_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.hX6Abq_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.hX6Abq_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.hX6Abq_headerStatic{border-radius:12px;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.hX6Abq_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.hX6Abq_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.hX6Abq_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.hX6Abq_pending{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.hX6Abq_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.hX6Abq_chevronOpen{transform:rotate(180deg)}.hX6Abq_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.hX6Abq_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.hX6Abq_notExposed{color:var(--dsw-alias-state-warn-primary);margin:12px 0 0;font-size:12px;line-height:1.5}.hX6Abq_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.hX6Abq_failed{min-width:0;color:var(--dsw-alias-label-error);text-overflow:ellipsis;white-space:nowrap;flex:1;margin:0;font-size:12px;line-height:1.5;overflow:hidden}.hX6Abq_discard,.hX6Abq_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.hX6Abq_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.hX6Abq_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.hX6Abq_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.hX6Abq_discard:disabled,.hX6Abq_save:disabled{opacity:.4;cursor:default}.hX6Abq_discard:focus-visible,.hX6Abq_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}.hX6Abq_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.hX6Abq_field+.hX6Abq_field{border-top:1px solid var(--dsw-alias-border-l2)}.hX6Abq_head{align-items:center;gap:8px;display:flex}.hX6Abq_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.hX6Abq_badges{align-items:center;gap:8px;display:inline-flex}.hX6Abq_badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.hX6Abq_reset{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.hX6Abq_reset:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.hX6Abq_reset:disabled{cursor:default}.hX6Abq_reset:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.hX6Abq_input,.hX6Abq_select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.hX6Abq_input:focus-visible,.hX6Abq_select:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.hX6Abq_input:disabled,.hX6Abq_select:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.hX6Abq_inputInvalid{border:1px solid var(--dsw-alias-label-error);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.hX6Abq_inputInvalid:focus-visible{outline:2px solid var(--dsw-alias-label-error);outline-offset:1px;border-color:var(--dsw-alias-label-error)}.hX6Abq_invalid{color:var(--dsw-alias-label-error);margin:0;font-size:12px;line-height:1.5}.hX6Abq_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}@media (prefers-reduced-motion:reduce){.hX6Abq_card,.hX6Abq_header,.hX6Abq_chevron,.hX6Abq_chevronOpen,.hX6Abq_discard,.hX6Abq_save{transition:none}}";
		const tagId$1 = "@linxin666/dsh-client-ui-community-plugins/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-client-ui-community-plugins";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"badge": "hX6Abq_badge",
			"badges": "hX6Abq_badges",
			"body": "hX6Abq_body",
			"card": "hX6Abq_card",
			"cardOpen": "hX6Abq_cardOpen",
			"chevron": "hX6Abq_chevron",
			"chevronOpen": "hX6Abq_chevronOpen",
			"description": "hX6Abq_description",
			"discard": "hX6Abq_discard",
			"failed": "hX6Abq_failed",
			"field": "hX6Abq_field",
			"footer": "hX6Abq_footer",
			"head": "hX6Abq_head",
			"headText": "hX6Abq_headText",
			"header": "hX6Abq_header",
			"headerStatic": "hX6Abq_headerStatic",
			"hint": "hX6Abq_hint",
			"input": "hX6Abq_input",
			"inputInvalid": "hX6Abq_inputInvalid",
			"invalid": "hX6Abq_invalid",
			"label": "hX6Abq_label",
			"name": "hX6Abq_name",
			"notExposed": "hX6Abq_notExposed",
			"pending": "hX6Abq_pending",
			"readOnly": "hX6Abq_readOnly",
			"reset": "hX6Abq_reset",
			"save": "hX6Abq_save",
			"select": "hX6Abq_select"
		};
		//#endregion
		//#region src/client/PluginSettingsCard.tsx
		/**
		* Family-shared chrome for plugin settings cards: a disclosure header naming
		* the plugin and what its settings govern, the controls inside, and the save
		* that writes them. Renders nothing while the namespace is unavailable — a
		* deployment that does not compose the owning plugin should show no trace of
		* it. Inlined into each consumer's client bundle; mirrors the official
		* ui-plugin-config PluginCard in a self-contained slice.
		*/
		/**
		* Render one plugin settings card.
		* @param props - the plugin's copy keys, its form state, and its controls.
		* @returns the card, or nothing while the namespace is still loading.
		*/
		function PluginSettingsCard(props) {
			const [open, setOpen] = (0, react.useState)(props.defaultOpen ?? true);
			const { state, alwaysOpen } = props;
			if (!state.available) return null;
			const title = props.t(props.titleKey);
			const description = props.t(props.descriptionKey);
			const blocked = !state.dirty || state.invalid || state.saving;
			const expanded = alwaysOpen === true || open;
			const cardClass = expanded ? `${settings_card_module_css_default.cardOpen} ${settings_card_module_css_default.card}` : settings_card_module_css_default.card;
			const header = alwaysOpen === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.headerStatic,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: settings_card_module_css_default.headText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.name,
						title,
						children: title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.description,
						title: description,
						children: description
					})]
				}), state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: settings_card_module_css_default.pending,
					title: props.t("settings.unsaved"),
					children: props.t("settings.unsaved")
				}) : null]
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: settings_card_module_css_default.header,
				"aria-expanded": open,
				"aria-label": `${props.t(open ? "settings.collapse" : "settings.expand")}: ${title}`,
				onClick: () => {
					setOpen(!open);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: settings_card_module_css_default.headText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.name,
							title,
							children: title
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.description,
							title: description,
							children: description
						})]
					}),
					state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.pending,
						title: props.t("settings.unsaved"),
						children: props.t("settings.unsaved")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						className: open ? `${settings_card_module_css_default.chevron} ${settings_card_module_css_default.chevronOpen}` : settings_card_module_css_default.chevron,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07728 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z",
							fill: "currentColor"
						})
					})
				]
			});
			if (!state.exposed) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: cardClass,
				children: [header, expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: settings_card_module_css_default.body,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.notExposed,
						role: "status",
						children: props.t("settings.notExposed")
					})
				}) : null]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: cardClass,
				children: [header, expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: settings_card_module_css_default.body,
					children: [
						!state.writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: settings_card_module_css_default.readOnly,
							role: "status",
							children: props.t("settings.readOnly")
						}) : null,
						props.children,
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: settings_card_module_css_default.footer,
							children: [
								state.failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: settings_card_module_css_default.failed,
									role: "status",
									children: [props.t("settings.saveFailed"), state.failedReason ? " - " + state.failedReason : ""]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: settings_card_module_css_default.discard,
									disabled: !state.dirty || state.saving,
									onClick: props.onDiscard,
									children: props.t("settings.discard")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: settings_card_module_css_default.save,
									disabled: blocked,
									onClick: props.onSave,
									children: props.t(!state.saving ? "settings.save" : "settings.saving")
								})
							]
						})
					]
				}) : null]
			});
		}
		/** A staged boolean field: 继承 / 开 / 关. */
		function BooleanField(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						id: props.id,
						className: settings_card_module_css_default.select,
						value: props.text,
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "",
								children: props.inheritLabel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "true",
								children: props.onLabel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "false",
								children: props.offLabel
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.hint,
						children: props.hint
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-form.ts
		/** A boolean field, edited through true/false draft text. */
		function booleanField(field) {
			return {
				field,
				format: (value) => typeof value === "boolean" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					if (trimmed === "true") return {
						kind: "set",
						value: true
					};
					if (trimmed === "false") return {
						kind: "set",
						value: false
					};
				}
			};
		}
		/**
		* Stages one card's edits over one settings namespace and writes them on save.
		*
		* The Host is the only authority on whether a value was accepted — its
		* validators own the constraints no schema can express — so the outcome is
		* read back from the section rather than predicted here. A save that did not
		* land keeps its drafts, so the user can correct them instead of retyping.
		*/
		var CardForm = class {
			scope;
			specs;
			staged = /* @__PURE__ */ new Map();
			listeners = /* @__PURE__ */ new Set();
			saving = false;
			failed = false;
			failedReason;
			/** @param scope - the bound settings scope for this card's namespace. */
			constructor(scope, specs) {
				this.scope = scope;
				this.specs = new Map(specs.map((spec) => [spec.field, spec]));
				scope.subscribe(() => {
					this.publish();
				});
			}
			/** Publish a projection of this form, rebuilt whenever the scope or a draft changes. */
			bind(project) {
				const store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(project());
				this.listeners.add(() => {
					store.set(project());
				});
				return store;
			}
			/** Read the card-level state: what the Host serves, and what a save would do. */
			shell() {
				const snapshot = this.scope.getSnapshot();
				const plan = this.plan();
				return {
					available: snapshot.status !== "loading",
					exposed: snapshot.status === "ready",
					writable: snapshot.writable,
					dirty: plan.length > 0,
					invalid: plan.some((item) => item.run === void 0),
					saving: this.saving,
					failed: this.failed,
					...this.failedReason === void 0 ? {} : { failedReason: this.failedReason }
				};
			}
			/** Read one field's state from the effective section and its staged draft. */
			field(field) {
				const spec = this.specOf(field);
				const staged = this.staged.get(field);
				if (staged === void 0) return {
					text: spec.format(this.sectionValue(field)),
					overridden: this.stored(field),
					invalid: false
				};
				const write = staged.clear ? { kind: "clear" } : spec.parse(staged.text);
				return {
					text: staged.text,
					overridden: write?.kind === "set",
					invalid: write === void 0
				};
			}
			/** The actions the card's slot registration injects. */
			actions() {
				return {
					edit: (field, text) => {
						this.stage(field, {
							text,
							clear: false
						});
					},
					resetField: (field) => {
						this.stage(field, {
							text: this.specOf(field).format(this.baseValue(field)),
							clear: true
						});
					},
					save: () => {
						this.save();
					},
					discard: () => {
						if (this.staged.size === 0 && !this.failed) return;
						this.staged.clear();
						this.failed = false;
						this.failedReason = void 0;
						this.publish();
					}
				};
			}
			/**
			* Write every staged edit, then re-seed from what the Host accepted.
			*
			* When the scope carries the optional batch surface (the dsh-web-ui
			* bridge scope), every planned write rides one mutation so cross-field
			* validate hooks (baseURL+model) judge the batch as a unit instead of
			* deadlocking on per-field writes. Otherwise the per-field loop runs.
			* A field lands only when the Host reports it held the staged value; a
			* landed field's draft is dropped, a failed one stays staged for the user.
			* @returns settlement after every write and the read-back.
			*/
			async save() {
				const plan = this.plan();
				const valid = plan.filter((item) => item.run !== void 0);
				if (plan.length === 0 || this.saving || valid.length !== plan.length) return;
				const plannedWrites = valid.map((item) => item.op);
				const fields = new Set(plan.map((item) => item.field));
				this.saving = true;
				this.failed = false;
				this.failedReason = void 0;
				this.publish();
				const landed = /* @__PURE__ */ new Set();
				const batch = this.batchedScope();
				if (batch !== void 0) {
					const result = await batch.mutate(plannedWrites);
					if (result.ok) {
						for (const field of result.fields) if (field.landed) landed.add(field.field);
					} else this.failedReason = result.message;
				} else for (const item of valid) if (await item.run()) landed.add(item.field);
				for (const field of fields) if (landed.has(field)) this.staged.delete(field);
				this.saving = false;
				this.failed = landed.size !== fields.size;
				this.publish();
			}
			/** The scope's batch surface when it supports one; undefined conservatively otherwise. */
			batchedScope() {
				const candidate = this.scope;
				return typeof candidate?.mutate === "function" ? candidate : void 0;
			}
			/**
			* Every staged edit a save would write. An entry whose draft is not a value
			* its field accepts carries no write: the form is still dirty, and the save
			* refuses rather than dropping the edit. A staged edit that matches the
			* effective section is not a write at all.
			* @returns the planned writes, in the order the fields were staged.
			*/
			plan() {
				const plan = [];
				for (const [field, staged] of this.staged) {
					const spec = this.specOf(field);
					if (staged.clear) {
						if (this.stored(field)) plan.push({
							field,
							op: {
								field,
								op: "unset"
							},
							run: () => this.clear(field)
						});
						continue;
					}
					if (staged.text === spec.format(this.sectionValue(field))) continue;
					const write = spec.parse(staged.text);
					if (write === void 0) plan.push({
						field,
						op: {
							field,
							op: "unset"
						},
						run: void 0
					});
					else if (write.kind === "clear") plan.push({
						field,
						op: {
							field,
							op: "unset"
						},
						run: () => this.clear(field)
					});
					else plan.push({
						field,
						op: {
							field,
							op: "set",
							value: write.value
						},
						run: () => this.store(field, write.value)
					});
				}
				return plan;
			}
			async clear(field) {
				await this.scope.unset(field);
				return !this.stored(field);
			}
			async store(field, value) {
				await this.scope.set(field, value);
				if (this.specOf(field).secret) return true;
				return this.userLayer()?.[field] === value;
			}
			stage(field, edit) {
				this.staged.set(field, edit);
				this.failed = false;
				this.failedReason = void 0;
				this.publish();
			}
			specOf(field) {
				const spec = this.specs.get(field);
				if (spec === void 0) throw new Error(`settings card has no field ${field}`);
				return spec;
			}
			snapshotOf() {
				return this.scope.getSnapshot();
			}
			sectionValue(field) {
				return this.snapshotOf().value?.[field];
			}
			baseValue(field) {
				return this.snapshotOf().base?.[field];
			}
			userLayer() {
				return this.snapshotOf().user;
			}
			stored(field) {
				const user = this.userLayer();
				return user !== void 0 && Object.hasOwn(user, field);
			}
			publish() {
				for (const listener of this.listeners) listener();
			}
		};
		//#endregion
		//#region src/client/generated/community.ts
		/** Every community plugin, in community.json order. */
		const COMMUNITY_PLUGINS = [
			{
				"id": "dsh-data-agent",
				"name": "Data Agent",
				"nameEn": "Data Agent",
				"author": "omdsh-dev",
				"repo": "https://github.com/omdsh-dev/dsh-data-agent",
				"description": "为 DSH 定义专用 Data Agent 预设，让 AI 帮你查询、更新、分析数据。",
				"descriptionEn": "Defines a dedicated Data Agent preset for DSH so the AI can query, update and analyze data."
			},
			{
				"id": "dsh-tui",
				"name": "dsh-TUI",
				"nameEn": "dsh-TUI",
				"author": "ccch1mneyyy",
				"repo": "https://github.com/ccch1mneyyy/dsh-TUI",
				"description": "Claude Code 风格全屏交互终端插件：像素鲸鱼顶栏、实时工作状态行、思考流式展开、双击 Esc 回滚、上下文进度条与 TPS 仪表。",
				"descriptionEn": "A Claude Code style fullscreen interactive terminal plugin: pixel-whale header, live working-state line, streaming reasoning expansion, double-Esc rollback, context progress bar and TPS gauges."
			},
			{
				"id": "dsh-tianshu-tui",
				"name": "天书 TUI",
				"nameEn": "Tianshu TUI",
				"author": "huiliyi37",
				"repo": "https://github.com/huiliyi37/dsh-tianshu-tui",
				"description": "基于官方 DeepSeek Harness 的交互式终端 UI 插件，在官方基础上增加 TDD 与证据门等工作流。",
				"descriptionEn": "An interactive terminal UI plugin for DeepSeek Harness that adds TDD and evidence-gate workflows on top of the official base."
			},
			{
				"id": "dsh-chat-summary",
				"name": "Chat Summary",
				"nameEn": "Chat Summary",
				"author": "v833",
				"repo": "https://github.com/v833/dsh-chat-summary",
				"description": "总结当前对话并导出为 Markdown / DOCX / PDF，可选 LLM 智能总结（用户自配 API Key）。",
				"descriptionEn": "Summarize the current conversation and export it as Markdown / DOCX / PDF, with optional LLM summarization using your own API key.",
				"npm": "@linxin666/dsh-client-ui-chat-summary"
			},
			{
				"id": "dsh-builtin-toggles",
				"name": "内置能力检查器",
				"nameEn": "Built-in Capability Inspector",
				"author": "Starfie1d1272",
				"repo": "https://github.com/Starfie1d1272/dsh-builtin-toggles",
				"description": "Evidence-backed 内置 capability Inspector：展示 DSH Web built-in capability 的 provenance、compatibility 与 structural drift；仅对 9 个经过审阅的 UI leaves 提供 fail-closed 开关。",
				"descriptionEn": "Evidence-backed built-in capability Inspector: surfaces provenance, compatibility and structural drift of DSH Web built-ins, with fail-closed toggles for only the nine reviewed UI leaves.",
				"npm": "dsh-builtin-toggles"
			},
			{
				"id": "dsh-pilot",
				"name": "Pilot 浏览器驾驶舱",
				"nameEn": "Pilot Browser Cockpit",
				"author": "guo6x",
				"repo": "https://github.com/guo6x/dsh-pilot",
				"description": "给 agent 一双会开车的手：零依赖 CDP 浏览器操控（8 个 pilot_* 工具：导航/点击/输入/按键/JS/截图）+ Web GUI 可拖拽驾驶舱面板，无需 Playwright、无需 API key。",
				"descriptionEn": "Give your agent hands: zero-dependency CDP browser control (8 pilot_* tools: navigate/click/type/keys/eval/screenshot) plus a draggable cockpit panel in the Web GUI - no Playwright, no API key."
			},
			{
				"id": "dsh-housekeeper",
				"name": "环境管家",
				"nameEn": "Environment Housekeeper",
				"author": "guo6x",
				"repo": "https://github.com/guo6x/dsh-housekeeper",
				"description": "管住 agent 的脏手：工具链台账（node/pnpm/git/gh/ffmpeg 等自动探测）、缓存与临时目录扫描 + 白名单安全一键清理、机器规则 AGENTS.md 查看编辑，全在设置面板完成。",
				"descriptionEn": "Keep your agent's hands clean: toolchain inventory, scratch/cache scan with whitelist-guarded one-click cleanup, and the machine rules file (AGENTS.md) view/edit - all in the settings panel."
			},
			{
				"id": "dsh-deepread",
				"name": "DeepRead 精读助手",
				"nameEn": "DeepRead Assistant",
				"author": "xiehuan123",
				"repo": "https://github.com/xiehuan123/dsh-deepread",
				"description": "五种模式精读插件（quick / deep / map / feynman / book），支持公众号链接与文件输入，导出 md / mm / html，Web UI 提供工具结果卡片与精读面板。",
				"descriptionEn": "A five-mode deep reading plugin (quick / deep / map / feynman / book) for links and files, with md / mm / html exports and Web UI tool-result cards plus a reading panel.",
				"npm": "dsh-deepread"
			},
			{
				"id": "dsh-mnemon",
				"name": "Mnemon 记忆系统",
				"nameEn": "Mnemon Memory",
				"author": "omdsh-dev",
				"repo": "https://github.com/omdsh-dev/dsh-mnemon",
				"description": "与 Mnemon CLI 集成的跨 Agent、本地优先持久记忆插件：用户画像 / 工作记忆 / 项目档案与长期 Memory Spaces，支持导入导出。",
				"descriptionEn": "A cross-agent, local-first persistent memory plugin integrating the Mnemon CLI: profiles, working memory, project documents and long-term Memory Spaces, with import and export.",
				"npm": "dsh-mnemon"
			}
		];
		//#endregion
		//#region src/client/community-guard.ts
		/** True when the value is a well-formed community plugin entry. */
		function isCommunityPluginEntry(value) {
			if (typeof value !== "object" || value === null) return false;
			const entry = value;
			if (typeof entry.id !== "string" || entry.id === "") return false;
			if (typeof entry.name !== "string" || typeof entry.nameEn !== "string") return false;
			if (typeof entry.author !== "string" || entry.author === "") return false;
			if (typeof entry.repo !== "string" || !entry.repo.startsWith("https://")) return false;
			if (entry.description !== void 0 && typeof entry.description !== "string") return false;
			if (entry.descriptionEn !== void 0 && typeof entry.descriptionEn !== "string") return false;
			if (entry.npm !== void 0 && typeof entry.npm !== "string") return false;
			return true;
		}
		//#endregion
		//#region \0dsh-css:packages/dsh-community-plugins/src/client/community.module.css.mjs
		const css = ".z0J_8a_sectionList{margin:0;padding:0;list-style:none}.z0J_8a_entries{flex-direction:column;gap:8px;margin:8px 0 0;padding:0;list-style:none;display:flex}.z0J_8a_entry{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:6px;flex-direction:column;gap:4px;padding:10px 12px;display:flex}.z0J_8a_entryHead{justify-content:space-between;align-items:baseline;gap:8px;min-width:0;display:flex}.z0J_8a_entryName{color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;font-weight:600;overflow:hidden}.z0J_8a_entryAuthor{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;flex:none;font-size:12px;overflow:hidden}.z0J_8a_entryDescription,.z0J_8a_entryDescriptionEn{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px;line-height:1.4}.z0J_8a_entryDescriptionEn{color:var(--dsw-alias-label-tertiary);font-size:12px}.z0J_8a_entryLinks{flex-wrap:wrap;align-items:center;gap:10px;margin-top:2px;display:flex}.z0J_8a_entryLink{color:var(--dsw-alias-link-primary,var(--dsw-alias-button-info-fill));font-size:13px;text-decoration:underline}.z0J_8a_entryLink:hover{text-decoration:none}.z0J_8a_entryNpm{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:12px;overflow:hidden}.z0J_8a_entryInstall{flex-wrap:wrap;align-items:center;gap:8px;margin-top:2px;display:flex}.z0J_8a_entryCommand{min-width:0;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);overflow-wrap:anywhere;border-radius:4px;flex:1;padding:2px 6px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px}.z0J_8a_copyButton{color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:4px;flex:none;padding:2px 10px;font-size:12px;line-height:1.5}.z0J_8a_copyButton:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}.z0J_8a_installNote{color:var(--dsw-alias-label-tertiary);margin:8px 2px 0;font-size:12px;line-height:1.4}.z0J_8a_empty{color:var(--dsw-alias-label-tertiary);margin:0;padding:8px 2px;font-size:13px}.z0J_8a_off{color:var(--dsw-alias-label-tertiary);margin:8px 2px 0;font-size:13px}.z0J_8a_notice{color:var(--dsw-alias-label-tertiary);margin:10px 2px 0;font-size:12px;line-height:1.4}";
		const tagId = "@linxin666/dsh-client-ui-community-plugins/community.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-client-ui-community-plugins";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var community_module_css_default = {
			"copyButton": "z0J_8a_copyButton",
			"empty": "z0J_8a_empty",
			"entries": "z0J_8a_entries",
			"entry": "z0J_8a_entry",
			"entryAuthor": "z0J_8a_entryAuthor",
			"entryCommand": "z0J_8a_entryCommand",
			"entryDescription": "z0J_8a_entryDescription",
			"entryDescriptionEn": "z0J_8a_entryDescriptionEn",
			"entryHead": "z0J_8a_entryHead",
			"entryInstall": "z0J_8a_entryInstall",
			"entryLink": "z0J_8a_entryLink",
			"entryLinks": "z0J_8a_entryLinks",
			"entryName": "z0J_8a_entryName",
			"entryNpm": "z0J_8a_entryNpm",
			"installNote": "z0J_8a_installNote",
			"notice": "z0J_8a_notice",
			"off": "z0J_8a_off",
			"sectionList": "z0J_8a_sectionList"
		};
		//#endregion
		//#region src/client/CommunityPluginsCard.tsx
		/**
		* The community plugin index card: a first-level settings section that is
		* always open (a static header with the index list directly visible). Its own
		* enable switch (backed by the community-plugins settings namespace) gates
		* the entry list; the list itself points at contributors' own repositories —
		* this package only indexes them, it never vendors their code.
		*/
		/** Bridges the community-plugins scope onto the card's staged form. */
		var CommunityPluginsCardController = class {
			form;
			store;
			/** @param scope - the bound settings scope for the community-plugins namespace. */
			constructor(scope) {
				this.form = new CardForm(scope, [booleanField("enabled")]);
				this.store = this.form.bind(() => this.projection());
			}
			projection() {
				return {
					...this.form.shell(),
					enabled: this.form.field("enabled")
				};
			}
			/**
			* Build the face the card's slot registration injects.
			* @returns the card's snapshot and its form actions.
			*/
			inject() {
				return {
					hooks: { communityPluginsCard: this.store },
					...this.form.actions()
				};
			}
		};
		/** The one-line install command for an entry: npm package when published, else the contributor repository URL. */
		function installCommand(entry) {
			return `dsh plugin --profile web add ${entry.npm ?? entry.repo}`;
		}
		/**
		* Render the community plugin index card.
		* @param props - locale copy, the card snapshot, its form actions, and the
		*   (default-generated) entry list.
		* @returns the card.
		*/
		function CommunityPluginsCard(props) {
			const { t } = props;
			const state = props.useCommunityPluginsCard((snapshot) => snapshot);
			const plugins = (props.plugins ?? COMMUNITY_PLUGINS).filter(isCommunityPluginEntry);
			const [copiedId, setCopiedId] = (0, react.useState)(null);
			const copyCommand = (id, command) => {
				const mark = () => {
					setCopiedId(id);
				};
				const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : void 0;
				if (clipboard?.writeText !== void 0) {
					clipboard.writeText(command).then(mark, mark);
					return;
				}
				try {
					const area = document.createElement("textarea");
					area.value = command;
					area.setAttribute("readonly", "");
					area.style.position = "fixed";
					area.style.opacity = "0";
					document.body.append(area);
					area.select();
					document.execCommand("copy");
					area.remove();
				} catch {}
				mark();
			};
			const disabled = !state.writable;
			const visible = state.enabled.text !== "false";
			const fieldProps = {
				overriddenLabel: t("settings.overridden"),
				resetLabel: t("settings.reset"),
				invalidLabel: t("settings.invalidNumber"),
				disabled
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PluginSettingsCard, {
				t,
				titleKey: "settings.title",
				descriptionKey: "settings.description",
				state,
				alwaysOpen: true,
				onSave: props.save,
				onDiscard: props.discard,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-community-enabled",
						label: t("settings.enabled"),
						hint: t("settings.enabledHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.enabled,
						onEdit: (text) => {
							props.edit("enabled", text);
						},
						onReset: () => {
							props.resetField("enabled");
						}
					}),
					visible ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
						className: community_module_css_default.entries,
						children: plugins.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
							className: community_module_css_default.empty,
							role: "status",
							children: t("empty")
						}) : plugins.map((plugin) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
							className: community_module_css_default.entry,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: community_module_css_default.entryHead,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: community_module_css_default.entryName,
										title: plugin.name,
										children: plugin.name
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: community_module_css_default.entryAuthor,
										title: plugin.author,
										children: [
											t("author"),
											": ",
											plugin.author
										]
									})]
								}),
								plugin.description ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: community_module_css_default.entryDescription,
									children: plugin.description
								}) : null,
								plugin.descriptionEn ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: community_module_css_default.entryDescriptionEn,
									children: plugin.descriptionEn
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: community_module_css_default.entryLinks,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
										className: community_module_css_default.entryLink,
										href: plugin.repo,
										target: "_blank",
										rel: "noreferrer",
										children: t("repository")
									}), plugin.npm ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
										className: community_module_css_default.entryNpm,
										children: plugin.npm
									}) : null]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: community_module_css_default.entryInstall,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
										className: community_module_css_default.entryCommand,
										children: installCommand(plugin)
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: community_module_css_default.copyButton,
										onClick: () => {
											copyCommand(plugin.id, installCommand(plugin));
										},
										children: copiedId === plugin.id ? t("copied") : t("copy")
									})]
								})
							]
						}, plugin.id))
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: community_module_css_default.off,
						role: "status",
						children: t("off")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: community_module_css_default.installNote,
						role: "note",
						children: t("installHint")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: community_module_css_default.notice,
						role: "note",
						children: t("notice")
					})
				]
			});
		}
		/** Render the community plugin index as a first-level settings page. */
		function CommunityPluginsSection(props) {
			const { t, useCommunityPluginsCard, save, discard, edit, resetField, plugins } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: community_module_css_default.sectionList,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CommunityPluginsCard, {
					t,
					useCommunityPluginsCard,
					save,
					discard,
					edit,
					resetField,
					plugins
				})
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/**
		* The community-plugins locale dictionaries for the index card.
		*/
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"settings.title": "社区插件",
			"settings.description": "社区贡献者开发与维护的插件，链接指向作者自己的仓库。",
			"settings.enabled": "启用社区插件索引",
			"settings.enabledHint": "此开关只控制索引列表的显示与否，关闭后在这里重新打开。",
			"settings.inherit": "继承",
			"settings.on": "开",
			"settings.off": "关",
			"settings.overridden": "已覆盖",
			"settings.reset": "恢复默认",
			"settings.notExposed": "当前 DSH 版本未向设置页暴露本插件的配置命名空间，表单不可用。可编辑 ~/.dsh/settings.yaml 直接配置，或为 dsh-host-apiproxy 的 WEB_SETTINGS_NAMESPACES 白名单补充本命名空间后重启。",
			"settings.readOnly": "当前部署的设置只读。",
			"settings.expand": "展开设置",
			"settings.collapse": "收起设置",
			"settings.save": "保存",
			"settings.saving": "保存中…",
			"settings.discard": "放弃",
			"settings.unsaved": "未保存",
			"settings.saveFailed": "部署未接受这些值，已保留供你修改。",
			"settings.invalidNumber": "请输入数字，留空则使用默认值。",
			"author": "作者",
			"repository": "仓库",
			"copy": "复制",
			"copied": "已复制",
			"installHint": "索引只登记、不安装代码。要运行某个插件，复制它的安装命令到终端执行；安装后，插件自带的开关与配置（若有）会出现在插件配置里。",
			"empty": "暂无社区插件登记。",
			"off": "社区插件索引已关闭。",
			"notice": "条目由贡献者自行登记，与 dsh-web-ui 的发布内容无关；使用前请自行评估。"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"settings.title": "Community Plugins",
			"settings.description": "Plugins developed and maintained by community contributors, linking to each author's own repository.",
			"settings.enabled": "Enable the community plugin index",
			"settings.enabledHint": "This switch only controls whether the index list is shown; turn it back on here.",
			"settings.inherit": "Inherit",
			"settings.on": "On",
			"settings.off": "Off",
			"settings.overridden": "Overridden",
			"settings.reset": "Reset to default",
			"settings.notExposed": "This DSH version does not expose this plugin's settings namespace to the configuration page, so the form is unavailable. Edit ~/.dsh/settings.yaml directly, or add the namespace to dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES allowlist and restart.",
			"settings.readOnly": "This deployment stores settings read-only.",
			"settings.expand": "Show settings",
			"settings.collapse": "Hide settings",
			"settings.save": "Save",
			"settings.saving": "Saving…",
			"settings.discard": "Discard",
			"settings.unsaved": "Unsaved",
			"settings.saveFailed": "The deployment did not accept these values; they were left for you to correct.",
			"settings.invalidNumber": "Enter a number, or leave blank to use the default.",
			"author": "Author",
			"repository": "Repository",
			"copy": "Copy",
			"copied": "Copied",
			"installHint": "The index only registers entries, it never installs code. To run a plugin, copy its install command into a terminal; once installed, the plugin provides its own switch and config (if any) in the plugin configuration section.",
			"empty": "No community plugins registered yet.",
			"off": "The community plugin index is turned off.",
			"notice": "Entries are contributed by their authors and are separate from dsh-web-ui releases; evaluate before use."
		};
		//#endregion
		//#region src/client/index.ts
		/** Settings namespace the card's enable switch edits (the Host plugin registers it). */
		const COMMUNITY_PLUGINS_NS = "community-plugins";
		/** Required services. */
		const inject = [
			"slots",
			"locale",
			"connection",
			"settingsScope",
			"remote"
		];
		/**
		* Register the community plugin index as a first-level settings section, with
		* its own enable switch over the community-plugins settings namespace.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register("community-plugins", {
				zh,
				en
			}), "community-plugins: dictionaries");
			const controller = new CommunityPluginsCardController((ctx.get("webUiSettings") ?? ctx.settingsScope).bind({ namespace: COMMUNITY_PLUGINS_NS }));
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "community-plugins",
				order: 140,
				label: () => ctx.locale.bind("community-plugins")("settings.title"),
				locale: "community-plugins",
				inject: () => controller.inject()
			}, CommunityPluginsSection));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map