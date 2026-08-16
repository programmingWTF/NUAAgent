window.__ModuleLoader__.load({
	id: "@linxin666/dsh-pet",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_dom_client = require("react-dom/client");
		let _deepseek_ai_dsh_client_runtime_client = require("@nuaagent/client-runtime/client");
		let react_dom = require("react-dom");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/pet-store.ts
		/**
		* Browser-side pet store: the pet state snapshot plus transient UI feedback
		* (reaction bubbles), written only through the store's audit actions. The
		* RPC polling and interactions live in the plugin apply body; components
		* only ever read snapshots.
		* @module @linxin666/dsh-pet/client/pet-store
		*/
		/** Create the pet store handle (apply world only; never module-level). */
		function createPetStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					snapshot: null,
					pets: [],
					state: "loading",
					error: null,
					feedback: null
				}),
				actions: {
					setSnapshot: (draft, snapshot) => {
						draft.snapshot = snapshot;
						draft.state = "ready";
						draft.error = null;
					},
					setPets: (draft, pets) => {
						draft.pets = pets;
					},
					setState: (draft, state, error) => {
						draft.state = state;
						draft.error = error;
					},
					setFeedback: (draft, feedback) => {
						draft.feedback = feedback;
					}
				}
			});
		}
		//#endregion
		//#region ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region src/client/spritesheet.ts
		/** Row index of one animation track (the fixed 9-row contract). */
		function rowOfTrack(animation) {
			return {
				idle: 0,
				"running-right": 1,
				"running-left": 2,
				waving: 3,
				jumping: 4,
				failed: 5,
				waiting: 6,
				running: 7,
				review: 8
			}[animation];
		}
		/**
		* Background-position (px) of one frame cell within the scaled atlas.
		* The background image is scaled by `scale` (element size ÷ cell size), and
		* background-position offsets are applied in SCALED coordinates — using raw
		* atlas coordinates here would drift each frame by the scale factor and
		* render torn/overlapping frames.
		*/
		function framePosition(cell, columns, row, col, scale = 1) {
			return {
				x: -col * cell.width * scale,
				y: -row * cell.height * scale
			};
		}
		/**
		* Trim a track to the actual frame count of its row (the manifest's per-row
		* counts are authoritative; this is a last-line guard against a definition
		* whose row count disagrees with its track table). A row with 0 detected
		* frames degrades to the first frame so the pet never renders blank.
		*/
		function trimTrack(track, frameCount) {
			const n = Math.max(1, Math.min(frameCount, track.frames.length, track.durations.length));
			return {
				frames: track.frames.slice(0, n),
				durations: track.durations.slice(0, n),
				loop: track.loop,
				...track.fallback === void 0 ? {} : { fallback: track.fallback }
			};
		}
		//#endregion
		//#region \0dsh-css:packages/dsh-pet/src/client/pet.module.css.mjs
		const css$2 = ".kz2Bea_float{pointer-events:auto;-webkit-user-select:none;user-select:none;flex-direction:column;align-items:center;display:flex;position:fixed}.kz2Bea_sprite{image-rendering:auto;touch-action:none;position:relative}.kz2Bea_bubble{white-space:nowrap;color:#fff;pointer-events:none;border-radius:999px;margin-bottom:6px;padding:4px 10px;font-size:12px;line-height:1.4;animation:2.6s ease-out forwards kz2Bea_pet-bubble-pop;position:absolute;bottom:100%;box-shadow:0 2px 8px #00000040}.kz2Bea_bubblePet{background:#f472b6eb}.kz2Bea_bubbleFeed{background:#38bdf8eb}.kz2Bea_bubbleStatus{text-overflow:ellipsis;background:#0f172ae6;border:1px solid #7dd3fc80;max-width:min(280px,100vw - 24px);animation:none;overflow:hidden}@keyframes kz2Bea_pet-bubble-pop{0%{opacity:0;transform:translateY(6px)scale(.85)}15%{opacity:1;transform:translateY(0)scale(1.05)}25%{transform:translateY(0)scale(1)}75%{opacity:1}to{opacity:0;transform:translateY(-8px)scale(.95)}}.kz2Bea_panel{color:#e2e8f0;backdrop-filter:blur(6px);background:#0f172aeb;border:1px solid #94a3b859;border-radius:10px;flex-direction:column;gap:6px;min-width:132px;padding:8px 10px;font-size:12px;display:flex;position:absolute;bottom:100%;box-shadow:0 4px 16px #00000059}.kz2Bea_panel:after{content:\"\";height:14px;position:absolute;top:100%;left:0;right:0}.kz2Bea_rankRow{white-space:nowrap;justify-content:space-between;gap:10px;display:flex}.kz2Bea_nameCell{font-weight:600}.kz2Bea_renameRow{align-items:center;gap:6px;display:flex}.kz2Bea_nameInput{color:#e2e8f0;background:#1e293be6;border:1px solid #7dd3fc80;border-radius:6px;outline:none;flex:1;min-width:0;padding:3px 6px;font-size:12px}.kz2Bea_nameInput:focus{border-color:#38bdf8;box-shadow:0 0 0 2px #38bdf873}.kz2Bea_actions{gap:6px;display:flex}.kz2Bea_action{cursor:pointer;color:#0f172a;background:linear-gradient(#7dd3fc,#38bdf8);border:none;border-radius:6px;flex:1;padding:4px 8px;font-size:12px;transition:filter .12s,box-shadow .12s}.kz2Bea_action:hover{filter:brightness(1.08)}.kz2Bea_action:active{filter:brightness(.94)}.kz2Bea_action:focus-visible{outline:none;box-shadow:0 0 0 2px #38bdf8d9}.kz2Bea_summon{color:#7dd3fc;cursor:pointer;background:#0f172abf;border:1px dashed #7dd3fc99;border-radius:999px;padding:2px 10px;font-size:11px;transition:border-color .12s,color .12s,background .12s,box-shadow .12s}.kz2Bea_summon:hover{color:#bae6fd;background:#0f172ae6;border-color:#7dd3fcf2}.kz2Bea_summon:active{color:#7dd3fc;border-color:#7dd3fccc}.kz2Bea_summon:focus-visible{outline:none;box-shadow:0 0 0 2px #38bdf8d9}@media (prefers-reduced-motion:reduce){.kz2Bea_bubble{opacity:1;animation:none}.kz2Bea_action,.kz2Bea_summon{transition:none}}";
		const tagId$2 = "@linxin666/dsh-pet/pet.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-pet";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var pet_module_css_default = {
			"action": "kz2Bea_action",
			"actions": "kz2Bea_actions",
			"bubble": "kz2Bea_bubble",
			"bubbleFeed": "kz2Bea_bubbleFeed",
			"bubblePet": "kz2Bea_bubblePet",
			"bubbleStatus": "kz2Bea_bubbleStatus",
			"float": "kz2Bea_float",
			"nameCell": "kz2Bea_nameCell",
			"nameInput": "kz2Bea_nameInput",
			"panel": "kz2Bea_panel",
			"pet-bubble-pop": "kz2Bea_pet-bubble-pop",
			"rankRow": "kz2Bea_rankRow",
			"renameRow": "kz2Bea_renameRow",
			"sprite": "kz2Bea_sprite",
			"summon": "kz2Bea_summon"
		};
		//#endregion
		//#region src/client/PetSprite.tsx
		/**
		* Pet sprite companion component — the browser half's centerpiece. Renders a
		* fixed-position floating sprite (React portal onto document.body), plays
		* the track matching the host animation snapshot, and exposes the
		* interaction surface: click to pet, hover panel with feed/rename/hide, drag
		* to reposition (persisted via setConfig). Everything visual comes from the
		* pet definition the host serves ('/api/pet/pets' + the state snapshot's
		* pet id), so one component renders every registry entry.
		* @module @linxin666/dsh-pet/client/PetSprite
		*/
		/** Clamp a drag offset inside the viewport with a margin. */
		function clampOffset(value, max) {
			return Math.max(0, Math.min(max, value));
		}
		/**
		* The floating pet. The spritesheet frame advances on requestAnimationFrame
		* with per-frame durations from the definition's tracks; the atlas image is
		* loaded once and the background position is written straight to the sprite
		* element (no per-frame React state).
		*/
		function PetSprite(props) {
			const { snapshot, definition, display, feedback } = props;
			const spriteRef = (0, react.useRef)(null);
			const floatRef = (0, react.useRef)(null);
			const [imageReady, setImageReady] = (0, react.useState)(false);
			const [hovered, setHovered] = (0, react.useState)(false);
			const [renaming, setRenaming] = (0, react.useState)(false);
			const [nameDraft, setNameDraft] = (0, react.useState)("");
			const [dragPos, setDragPos] = (0, react.useState)(null);
			const dragRef = (0, react.useRef)(null);
			const hideTimerRef = (0, react.useRef)(null);
			const frameRef = (0, react.useRef)({
				track: null,
				index: 0,
				elapsed: 0
			});
			const cell = definition.cell;
			const columns = definition.columns;
			const rows = definition.rows;
			const tracks = definition.tracks;
			(0, react.useEffect)(() => {
				let cancelled = false;
				const img = new Image();
				img.onload = () => {
					if (!cancelled) setImageReady(true);
				};
				img.src = definition.atlasUrl;
				return () => {
					cancelled = true;
					img.onload = null;
				};
			}, [definition.atlasUrl]);
			const spriteScale = display.size / cell.height;
			const animation = snapshot?.animation ?? "idle";
			const scaleRef = (0, react.useRef)(spriteScale);
			scaleRef.current = spriteScale;
			(0, react.useEffect)(() => {
				const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
				const row = rowOfTrack(animation);
				const leadCol = trimTrack(tracks[animation], rows[row] ?? tracks[animation].frames.length).frames[0];
				const lead = framePosition(cell, columns, row, leadCol, scaleRef.current);
				if (spriteRef.current !== null) spriteRef.current.style.backgroundPosition = lead.x + "px " + lead.y + "px";
				if (reduceMotion) return;
				let raf = 0;
				let last = performance.now();
				const tick = (ts) => {
					const delta = ts - last;
					last = ts;
					const row = rowOfTrack(animation);
					const track = trimTrack(tracks[animation], rows[row] ?? tracks[animation].frames.length);
					const st = frameRef.current;
					if (st.track !== animation) {
						st.track = animation;
						st.index = 0;
						st.elapsed = 0;
					}
					st.elapsed += delta;
					const maxIndex = track.frames.length - 1;
					while (st.elapsed >= (track.durations[st.index] ?? 0) && st.index < maxIndex) {
						st.elapsed -= track.durations[st.index] ?? 0;
						st.index += 1;
					}
					if (st.elapsed >= (track.durations[st.index] ?? 0)) if (track.loop) {
						st.elapsed = 0;
						st.index = 0;
					} else st.index = maxIndex;
					const col = track.frames[st.index];
					const pos = framePosition(cell, columns, row, col, scaleRef.current);
					if (spriteRef.current !== null) spriteRef.current.style.backgroundPosition = pos.x + "px " + pos.y + "px";
					raf = requestAnimationFrame(tick);
				};
				raf = requestAnimationFrame(tick);
				return () => cancelAnimationFrame(raf);
			}, [
				animation,
				cell,
				columns,
				rows,
				tracks
			]);
			const feedbackDoneRef = (0, react.useRef)(props.onFeedbackDone);
			feedbackDoneRef.current = props.onFeedbackDone;
			(0, react.useEffect)(() => {
				if (feedback === null) return;
				const timer = window.setTimeout(() => feedbackDoneRef.current(), 2600);
				return () => window.clearTimeout(timer);
			}, [feedback]);
			const draggedRef = (0, react.useRef)(false);
			const clearHideTimer = () => {
				if (hideTimerRef.current !== null) {
					window.clearTimeout(hideTimerRef.current);
					hideTimerRef.current = null;
				}
			};
			const onPointerDown = (e) => {
				e.preventDefault();
				e.target.setPointerCapture?.(e.pointerId);
				const current = dragPos ?? {
					right: display.right,
					bottom: display.bottom
				};
				dragRef.current = {
					startX: e.clientX,
					startY: e.clientY,
					...current
				};
				draggedRef.current = false;
				setHovered(false);
			};
			const onPointerMove = (e) => {
				const drag = dragRef.current;
				if (drag === null) return;
				const dx = e.clientX - drag.startX;
				const dy = e.clientY - drag.startY;
				if (Math.abs(dx) > 4 || Math.abs(dy) > 4) draggedRef.current = true;
				const right = clampOffset(drag.right - dx, window.innerWidth - 40);
				const bottom = clampOffset(drag.bottom - dy, window.innerHeight - 40);
				setDragPos({
					right,
					bottom
				});
			};
			const onPointerUp = () => {
				if (dragRef.current === null) return;
				dragRef.current = null;
				if (dragPos !== null) props.onDragEnd(dragPos.right, dragPos.bottom);
			};
			const pos = dragPos ?? {
				right: display.right,
				bottom: display.bottom
			};
			const spriteWidth = Math.round(cell.width * spriteScale);
			const spriteHeight = Math.round(cell.height * spriteScale);
			const statusBubble = feedback === null && !hovered ? snapshot?.bubble : void 0;
			const displayName = snapshot?.name ?? definition.displayName;
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: floatRef,
				className: pet_module_css_default.float,
				style: {
					right: pos.right,
					bottom: pos.bottom,
					zIndex: 2147483e3
				},
				onPointerEnter: () => {
					clearHideTimer();
					setHovered(true);
				},
				onPointerLeave: (e) => {
					const next = e.relatedTarget;
					if (next instanceof Node && floatRef.current?.contains(next)) return;
					clearHideTimer();
					hideTimerRef.current = window.setTimeout(() => setHovered(false), 300);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: spriteRef,
						className: pet_module_css_default.sprite,
						style: {
							width: spriteWidth,
							height: spriteHeight,
							backgroundImage: imageReady ? "url(" + definition.atlasUrl + ")" : void 0,
							backgroundSize: cell.width * columns * spriteScale + "px " + cell.height * rows.length * spriteScale + "px",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "0 0",
							cursor: dragRef.current === null ? "grab" : "grabbing"
						},
						onPointerDown,
						onPointerMove,
						onPointerUp,
						onClick: () => {
							if (draggedRef.current) return;
							props.onPet();
						},
						role: "button",
						"aria-label": definition.displayName
					}),
					feedback !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: clsx(pet_module_css_default.bubble, feedback.kind === "feed" ? pet_module_css_default.bubbleFeed : pet_module_css_default.bubblePet),
						children: feedback.text
					}, feedback.at),
					statusBubble !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: clsx(pet_module_css_default.bubble, pet_module_css_default.bubbleStatus),
						role: "status",
						"aria-live": "polite",
						children: statusBubble
					}),
					hovered && dragRef.current === null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: pet_module_css_default.panel,
						onPointerEnter: () => {
							clearHideTimer();
						},
						children: renaming ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: pet_module_css_default.renameRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								className: pet_module_css_default.nameInput,
								value: nameDraft,
								maxLength: 20,
								placeholder: props.t("pet.namePlaceholder"),
								autoFocus: true,
								onChange: (e) => setNameDraft(e.target.value),
								onKeyDown: (e) => {
									if (e.nativeEvent.isComposing) return;
									if (e.key === "Enter") {
										const trimmed = nameDraft.trim();
										if (trimmed !== "") {
											props.onRename(trimmed);
											setRenaming(false);
										}
									} else if (e.key === "Escape") setRenaming(false);
								}
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: pet_module_css_default.action,
								onClick: () => {
									const trimmed = nameDraft.trim();
									if (trimmed !== "") {
										props.onRename(trimmed);
										setRenaming(false);
									}
								},
								children: props.t("pet.confirm")
							})]
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: pet_module_css_default.rankRow,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: pet_module_css_default.nameCell,
									children: displayName
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: props.t("pet.rank", { rank: snapshot?.affinity.rank ?? "?" }) })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: pet_module_css_default.rankRow,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: props.t("pet.treats", { n: snapshot?.treats.stocked ?? 0 }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: props.t("pet.points", { points: snapshot?.affinity.points ?? 0 }) })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: pet_module_css_default.actions,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: pet_module_css_default.action,
										onClick: props.onFeed,
										children: props.t("pet.feed")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: pet_module_css_default.action,
										onClick: () => {
											setNameDraft(displayName);
											setRenaming(true);
										},
										children: props.t("pet.rename")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: pet_module_css_default.action,
										onClick: props.onHide,
										children: props.t("pet.hide")
									})
								]
							})
						] })
					})
				]
			}), document.body);
		}
		//#endregion
		//#region src/client/PetDockEntry.tsx
		/**
		* Global floating pet entry. The pet is host-global (its state, display and
		* interactions live on '/api/pet/*' endpoints with no session dimension), so
		* it must not ride a session-scoped slot — on the new-conversation screen no
		* session exists to scope a slot by, and the pet would vanish (issue #48).
		* The client half therefore mounts this entry straight onto 'document.body'
		* (see index.ts): while visible it renders the floating PetSprite (a
		* portal), while hidden it renders a fixed-position summon button. Which
		* sprite renders is decided by the host snapshot's pet id resolved against
		* the registry list — no per-pet component exists.
		* @module @linxin666/dsh-pet/client/PetDockEntry
		*/
		const DEFAULT_DISPLAY = {
			visible: true,
			size: 160,
			right: 24,
			bottom: 20
		};
		/**
		* Dock entry: while the pet is visible, mount the floating PetSprite (it
		* portals itself onto document.body); while hidden, render the summon
		* button so the pet can always come back. The store is the plugin-owned
		* single instance — the slot system provides none because the pet is
		* host-global, not session-scoped.
		*/
		function PetDockEntry(props) {
			const { store, ensure } = props;
			const ui = (0, react.useSyncExternalStore)(store.subscribe, store.getSnapshot);
			const snapshot = ui.snapshot;
			const feedback = ui.feedback;
			const definition = ui.pets.find((entry) => entry.id === snapshot?.pet.id) ?? null;
			const visible = snapshot?.display.visible ?? true;
			(0, react.useEffect)(() => {
				ensure();
			}, [ensure]);
			if (visible) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				"data-pet-dock": true,
				"data-testid": "pet-dock",
				children: snapshot === null || definition === null ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PetSprite, {
					snapshot,
					definition,
					display: snapshot.display,
					feedback,
					onPet: props.pet,
					onFeed: props.feed,
					onHide: props.hide,
					onDragEnd: props.dragEnd,
					onRename: props.rename,
					onFeedbackDone: props.feedbackDone,
					t: props.t
				})
			});
			const display = snapshot?.display ?? DEFAULT_DISPLAY;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: pet_module_css_default.summon,
				style: {
					position: "fixed",
					right: display.right,
					bottom: display.bottom,
					zIndex: 2147483e3
				},
				onClick: props.summon,
				"data-testid": "pet-summon",
				children: props.t("pet.summon", { name: snapshot?.name ?? "" })
			});
		}
		//#endregion
		//#region \0dsh-css:packages/dsh-pet/src/client/settings-card.module.css.mjs
		const css$1 = ".kKk9aW_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.kKk9aW_card:hover{border-color:var(--dsw-alias-label-dimmed)}.kKk9aW_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.kKk9aW_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.kKk9aW_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.kKk9aW_headerStatic{border-radius:12px;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.kKk9aW_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.kKk9aW_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.kKk9aW_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.kKk9aW_pending{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.kKk9aW_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.kKk9aW_chevronOpen{transform:rotate(180deg)}.kKk9aW_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.kKk9aW_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.kKk9aW_notExposed{color:var(--dsw-alias-state-warn-primary);margin:12px 0 0;font-size:12px;line-height:1.5}.kKk9aW_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.kKk9aW_failed{min-width:0;color:var(--dsw-alias-label-error);text-overflow:ellipsis;white-space:nowrap;flex:1;margin:0;font-size:12px;line-height:1.5;overflow:hidden}.kKk9aW_discard,.kKk9aW_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.kKk9aW_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.kKk9aW_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.kKk9aW_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.kKk9aW_discard:disabled,.kKk9aW_save:disabled{opacity:.4;cursor:default}.kKk9aW_discard:focus-visible,.kKk9aW_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}.kKk9aW_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.kKk9aW_field+.kKk9aW_field{border-top:1px solid var(--dsw-alias-border-l2)}.kKk9aW_head{align-items:center;gap:8px;display:flex}.kKk9aW_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.kKk9aW_badges{align-items:center;gap:8px;display:inline-flex}.kKk9aW_badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.kKk9aW_reset{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.kKk9aW_reset:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.kKk9aW_reset:disabled{cursor:default}.kKk9aW_reset:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.kKk9aW_input,.kKk9aW_select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.kKk9aW_input:focus-visible,.kKk9aW_select:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.kKk9aW_input:disabled,.kKk9aW_select:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.kKk9aW_inputInvalid{border:1px solid var(--dsw-alias-label-error);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.kKk9aW_inputInvalid:focus-visible{outline:2px solid var(--dsw-alias-label-error);outline-offset:1px;border-color:var(--dsw-alias-label-error)}.kKk9aW_invalid{color:var(--dsw-alias-label-error);margin:0;font-size:12px;line-height:1.5}.kKk9aW_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}@media (prefers-reduced-motion:reduce){.kKk9aW_card,.kKk9aW_header,.kKk9aW_chevron,.kKk9aW_chevronOpen,.kKk9aW_discard,.kKk9aW_save{transition:none}}";
		const tagId$1 = "@linxin666/dsh-pet/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-pet";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"badge": "kKk9aW_badge",
			"badges": "kKk9aW_badges",
			"body": "kKk9aW_body",
			"card": "kKk9aW_card",
			"cardOpen": "kKk9aW_cardOpen",
			"chevron": "kKk9aW_chevron",
			"chevronOpen": "kKk9aW_chevronOpen",
			"description": "kKk9aW_description",
			"discard": "kKk9aW_discard",
			"failed": "kKk9aW_failed",
			"field": "kKk9aW_field",
			"footer": "kKk9aW_footer",
			"head": "kKk9aW_head",
			"headText": "kKk9aW_headText",
			"header": "kKk9aW_header",
			"headerStatic": "kKk9aW_headerStatic",
			"hint": "kKk9aW_hint",
			"input": "kKk9aW_input",
			"inputInvalid": "kKk9aW_inputInvalid",
			"invalid": "kKk9aW_invalid",
			"label": "kKk9aW_label",
			"name": "kKk9aW_name",
			"notExposed": "kKk9aW_notExposed",
			"pending": "kKk9aW_pending",
			"readOnly": "kKk9aW_readOnly",
			"reset": "kKk9aW_reset",
			"save": "kKk9aW_save",
			"select": "kKk9aW_select"
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
		/** A staged value field. `numeric` only hints the keypad: which drafts a field accepts is decided by its spec. */
		function ValueField(props) {
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
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						id: props.id,
						className: props.invalid ? settings_card_module_css_default.inputInvalid : settings_card_module_css_default.input,
						type: "text",
						...props.numeric === true ? { inputMode: "numeric" } : {},
						...props.invalid ? { "aria-invalid": true } : {},
						value: props.text,
						placeholder: props.placeholder ?? "",
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: props.invalid ? settings_card_module_css_default.invalid : settings_card_module_css_default.hint,
						children: props.invalid ? props.invalidLabel : props.hint
					})
				]
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
		/** A staged enumerated field rendered as a select. */
		function ChoiceField(props) {
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
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
							value: "",
							children: props.inheritLabel
						}), props.choices.map((choice) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
							value: choice.value,
							children: choice.label
						}, choice.value))]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: props.invalid ? settings_card_module_css_default.invalid : settings_card_module_css_default.hint,
						children: props.invalid ? props.invalidLabel : props.hint
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-form.ts
		/** A whole- or decimal-number field. An empty draft clears the field; any other draft that is not a finite number within the constraints blocks the save. */
		function numberField(field, constraints = {}) {
			const { integer = false, min } = constraints;
			return {
				field,
				format: (value) => typeof value === "number" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					const parsed = Number(trimmed);
					if (!Number.isFinite(parsed)) return void 0;
					if (integer && !Number.isInteger(parsed)) return void 0;
					if (min !== void 0 && parsed < min) return void 0;
					return {
						kind: "set",
						value: parsed
					};
				}
			};
		}
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
		/** An enumerated string field; only the listed choices are accepted. An empty draft clears the field. */
		function choiceField(field, choices) {
			return {
				field,
				format: (value) => typeof value === "string" && choices.includes(value) ? value : "",
				parse: (text) => {
					if (text === "") return { kind: "clear" };
					return choices.includes(text) ? {
						kind: "set",
						value: text
					} : void 0;
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
		//#region \0dsh-css:packages/dsh-pet/src/client/settings-section.module.css.mjs
		const css = ".t0P0pa_sectionList{margin:0;padding:0;list-style:none}";
		const tagId = "@linxin666/dsh-pet/settings-section.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-pet";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var settings_section_module_css_default = { "sectionList": "t0P0pa_sectionList" };
		//#endregion
		//#region src/client/PetSettingsCard.tsx
		/** Fetch the registry list (the same data the sprite renders from). */
		async function fetchPetChoices() {
			const response = await fetch("/api/pet/pets");
			if (!response.ok) throw new Error("pet pets failed: " + response.status);
			return await response.json();
		}
		/** Bridges the 'pet' scope onto the card's staged form. */
		var PetSettingsCardController = class {
			form;
			store;
			petChoices = [];
			petLabels = /* @__PURE__ */ new Map();
			loaded = false;
			attempts = 0;
			/** @param scope - the bound settings scope for the 'pet' namespace. */
			constructor(scope) {
				this.form = new CardForm(scope, [
					booleanField("enabled"),
					booleanField("visible"),
					numberField("size"),
					numberField("right"),
					numberField("bottom"),
					choiceField("petId", this.petChoices)
				]);
				this.store = this.form.bind(() => this.projection());
				this.loadPets();
			}
			/** Resolve the registry choices once (retried a few times on failure). */
			async loadPets() {
				if (this.loaded) return;
				try {
					const list = await fetchPetChoices();
					this.petChoices.splice(0, this.petChoices.length, ...list.map((choice) => choice.id));
					for (const choice of list) this.petLabels.set(choice.id, choice.displayName);
					this.loaded = true;
					this.store.set(this.projection());
				} catch {
					this.attempts += 1;
					if (this.attempts < 3) window.setTimeout(() => {
						this.loadPets();
					}, 3e3);
				}
			}
			projection() {
				return {
					...this.form.shell(),
					enabled: this.form.field("enabled"),
					visible: this.form.field("visible"),
					size: this.form.field("size"),
					right: this.form.field("right"),
					bottom: this.form.field("bottom"),
					petId: this.form.field("petId"),
					petChoices: this.petChoices.map((id) => ({
						value: id,
						label: this.petLabels.get(id) ?? id
					}))
				};
			}
			/**
			* Build the face the card's slot registration injects.
			* @returns the card's snapshot and its form actions.
			*/
			inject() {
				return {
					hooks: { petSettingsCard: this.store },
					...this.form.actions()
				};
			}
		};
		/**
		* Render the pet settings card.
		* @param props - locale copy, the card snapshot, and its form actions.
		* @returns the card.
		*/
		function PetSettingsCard(props) {
			const { t } = props;
			const state = props.usePetSettingsCard((snapshot) => snapshot);
			const disabled = !state.writable;
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
				onSave: props.save,
				onDiscard: props.discard,
				alwaysOpen: true,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-pet-enabled",
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
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChoiceField, {
						id: "settings-pet-pet",
						label: t("settings.pet"),
						hint: t("settings.petHint"),
						inheritLabel: t("settings.inherit"),
						...fieldProps,
						...state.petId,
						choices: state.petChoices,
						onEdit: (text) => {
							props.edit("petId", text);
						},
						onReset: () => {
							props.resetField("petId");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-pet-visible",
						label: t("settings.visible"),
						hint: t("settings.visibleHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.visible,
						onEdit: (text) => {
							props.edit("visible", text);
						},
						onReset: () => {
							props.resetField("visible");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-pet-size",
						label: t("settings.size"),
						hint: t("settings.sizeHint"),
						numeric: true,
						...fieldProps,
						...state.size,
						onEdit: (text) => {
							props.edit("size", text);
						},
						onReset: () => {
							props.resetField("size");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-pet-right",
						label: t("settings.right"),
						hint: t("settings.rightHint"),
						numeric: true,
						...fieldProps,
						...state.right,
						onEdit: (text) => {
							props.edit("right", text);
						},
						onReset: () => {
							props.resetField("right");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-pet-bottom",
						label: t("settings.bottom"),
						hint: t("settings.bottomHint"),
						numeric: true,
						...fieldProps,
						...state.bottom,
						onEdit: (text) => {
							props.edit("bottom", text);
						},
						onReset: () => {
							props.resetField("bottom");
						}
					})
				]
			});
		}
		/** Render the pet settings card as a first-level settings page. */
		function PetSettingsSection(props) {
			const { t, usePetSettingsCard, save, discard, edit, resetField } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: settings_section_module_css_default.sectionList,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PetSettingsCard, {
					t,
					usePetSettingsCard,
					save,
					discard,
					edit,
					resetField
				})
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** Chinese copy. */
		const zh = {
			"pet.feed": "喂食",
			"pet.hide": "隐藏",
			"pet.rename": "改名",
			"pet.confirm": "确定",
			"pet.namePlaceholder": "输入新名字",
			"pet.summon": "召唤{name}",
			"pet.rank": "亲密度 {rank}",
			"pet.points": "{points} 点",
			"pet.treats": "小鱼干 ×{n}",
			"pet.state.loading": "宠物正在赶来…",
			"pet.state.error": "宠物迷路了（连接失败）",
			"settings.title": "宠物",
			"settings.description": "选择宠物并调整它的显示布局。",
			"settings.pet": "宠物",
			"settings.petHint": "选择显示哪只宠物；每只宠物独立命名，可在宠物悬浮面板改名。",
			"settings.enabled": "启用宠物",
			"settings.enabledHint": "关闭后隐藏宠物并停止轮询，可在设置里重新启用。",
			"settings.visible": "显示宠物",
			"settings.visibleHint": "关闭后宠物隐藏，可从聊天输入区重新召唤。",
			"settings.size": "大小（px）",
			"settings.sizeHint": "精灵单元高度，范围 32–512。",
			"settings.right": "距右侧（px）",
			"settings.rightHint": "距视口右边缘的水平内缩距离。",
			"settings.bottom": "距底部（px）",
			"settings.bottomHint": "距视口底边的垂直内缩距离。",
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
			"settings.invalidNumber": "请输入数字，留空则使用默认值。"
		};
		/** English copy. */
		const en = {
			"pet.feed": "Feed",
			"pet.hide": "Hide",
			"pet.rename": "Rename",
			"pet.confirm": "OK",
			"pet.namePlaceholder": "Enter a new name",
			"pet.summon": "Summon {name}",
			"pet.rank": "Affinity {rank}",
			"pet.points": "{points} pts",
			"pet.treats": "Treats ×{n}",
			"pet.state.loading": "The pet is on its way…",
			"pet.state.error": "The pet is lost (connection failed)",
			"settings.title": "Pet",
			"settings.description": "Pick a pet and tune its display layout.",
			"settings.pet": "Pet",
			"settings.petHint": "Choose which pet shows. Names are stored per pet; rename from the pet hover panel.",
			"settings.enabled": "Enable the pet",
			"settings.enabledHint": "When off, the pet hides and polling stops; re-enable it here.",
			"settings.visible": "Show the pet",
			"settings.visibleHint": "When off, the pet hides; summon it again from the input row.",
			"settings.size": "Size (px)",
			"settings.sizeHint": "Sprite cell height, 32–512.",
			"settings.right": "Right inset (px)",
			"settings.rightHint": "Horizontal inset from the viewport right edge.",
			"settings.bottom": "Bottom inset (px)",
			"settings.bottomHint": "Vertical inset from the viewport bottom edge.",
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
			"settings.invalidNumber": "Enter a number, or leave blank to use the default."
		};
		/**
		* Active dictionary, picked by the document language at call time. The pet
		* mounts as a global floating surface (not a session-scoped slot), so it has
		* no framework locale seat and resolves its copy the same tiny way the
		* task-board's DOM-injected surface does.
		*/
		function dictionary() {
			return (typeof document !== "undefined" ? document.documentElement.lang : "zh").toLowerCase().startsWith("en") ? en : zh;
		}
		/**
		* Translate a key with optional `{name}` template params. Mirrors the slot
		* `Translate` contract `(key, params?) => string` so it can be handed to the
		* same components that used to receive the framework-injected `t` seat. The
		* key is typed loosely (`string`) so the function is assignable to the slot's
		* `TranslateNS<'pet'>` (whose key domain also spans the shared common
		* vocabulary); a missing key degrades to the key itself rather than throwing.
		*/
		function t(key, params) {
			let text = dictionary()[key] ?? key;
			if (params !== void 0) for (const [name, value] of Object.entries(params)) text = text.replaceAll(`{${name}}`, String(value));
			return text;
		}
		//#endregion
		//#region src/client/index.ts
		/** Same-origin JSON fetch helper (GET without body, POST with JSON body). */
		async function petFetch(path, body) {
			const response = await fetch(path, body === void 0 ? {} : {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			if (!response.ok) throw new Error("pet " + path + " failed: " + response.status);
			return await response.json();
		}
		/** The live host API instance (always defined; failures surface per call). */
		const petApi = {
			state: () => petFetch("/api/pet/state"),
			pets: () => petFetch("/api/pet/pets"),
			interact: (kind) => petFetch("/api/pet/interact", { kind }),
			setVisible: (visible) => petFetch("/api/pet/set-visible", { visible }),
			setConfig: (patch) => petFetch("/api/pet/set-config", patch),
			setName: (name) => petFetch("/api/pet/set-name", { name }),
			setPet: (petId) => petFetch("/api/pet/set-pet", { petId })
		};
		/** Poll interval for the host snapshot. */
		const POLL_MS = 2e3;
		/** Settings namespace the pet settings card edits (the Host plugin registers it). */
		const PET_SETTINGS_NS = "pet";
		/** Required services. */
		const inject = [
			"slots",
			"locale",
			"connection",
			"settingsScope",
			"remote"
		];
		/**
		* Client plugin body: register dictionaries, mount the global pet entry and
		* poll loop while the plugin is enabled, and seat the settings card as a
		* first-level settings section.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register("pet", {
				zh,
				en
			}), "pet: dictionaries");
			const settingsScope = (ctx.get("webUiSettings") ?? ctx.settingsScope).bind({ namespace: PET_SETTINGS_NS });
			const enabled = () => {
				const snapshot = settingsScope.getSnapshot();
				return snapshot.status === "ready" ? snapshot.value?.enabled ?? true : snapshot.status === "unavailable";
			};
			const petSettings = new PetSettingsCardController(settingsScope);
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "pet",
				order: 130,
				label: () => ctx.locale.bind("pet")("settings.title"),
				locale: "pet",
				inject: () => petSettings.inject()
			}, PetSettingsSection));
			let disposeUi;
			const syncUi = () => {
				if (enabled() && disposeUi === void 0) {
					const petStore = createPetStore().create();
					const setSnapshot = petStore.actions.setSnapshot;
					const setPets = petStore.actions.setPets;
					const setState = petStore.actions.setState;
					const setFeedback = petStore.actions.setFeedback;
					let petsLoaded = false;
					const pollNow = () => {
						if (!petsLoaded) petApi.pets().then((list) => {
							petsLoaded = true;
							setPets(list);
						}, () => {});
						petApi.state().then((snapshot) => {
							setSnapshot(snapshot);
						}, () => {
							setState("error", "pet.state transport error");
						});
					};
					const disposePoll = ctx.effect(() => {
						let timer;
						const stop = () => {
							if (timer !== void 0) {
								window.clearInterval(timer);
								timer = void 0;
							}
						};
						const start = () => {
							if (timer === void 0 && document.visibilityState === "visible") timer = window.setInterval(pollNow, POLL_MS);
						};
						const onVisibility = () => {
							if (document.visibilityState === "visible") {
								pollNow();
								start();
							} else stop();
						};
						start();
						document.addEventListener("visibilitychange", onVisibility);
						return () => {
							stop();
							document.removeEventListener("visibilitychange", onVisibility);
						};
					}, "pet: poll");
					const injected = () => ({
						store: petStore,
						ensure: pollNow,
						pet: () => {
							petApi.interact("pet").then((result) => {
								setFeedback({
									text: result.reaction,
									kind: "pet",
									at: Date.now()
								});
							}, () => {});
						},
						feed: () => {
							petApi.interact("feed").then((result) => {
								setFeedback({
									text: result.reaction,
									kind: "feed",
									at: Date.now()
								});
							}, () => {});
						},
						hide: () => {
							petApi.setVisible(false).then(() => {
								pollNow();
							}, () => {});
						},
						summon: () => {
							petApi.setVisible(true).then(() => {
								pollNow();
							}, () => {});
						},
						dragEnd: (right, bottom) => {
							petApi.setConfig({
								right,
								bottom
							}).then(() => {
								pollNow();
							}, () => {});
						},
						rename: (name) => {
							petApi.setName(name).then((result) => {
								if (result.ok) pollNow();
							}, () => {});
						},
						feedbackDone: () => {
							setFeedback(null);
						}
					});
					const container = document.createElement("div");
					container.dataset.dshPetRoot = "";
					document.body.appendChild(container);
					const petRoot = (0, react_dom_client.createRoot)(container);
					petRoot.render((0, react.createElement)(PetDockEntry, {
						...injected(),
						t
					}));
					disposeUi = () => {
						petRoot.unmount();
						container.remove();
						disposePoll();
						disposeUi = void 0;
					};
				} else if (!enabled() && disposeUi !== void 0) {
					disposeUi();
					disposeUi = void 0;
				}
			};
			settingsScope.subscribe(syncUi);
			syncUi();
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map