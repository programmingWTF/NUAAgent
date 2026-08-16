import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { framePosition, rowOfTrack, trimTrack } from "./spritesheet.js";
import styles from './pet.module.css';
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
export function PetSprite(props) {
    const { snapshot, definition, display, feedback } = props;
    const spriteRef = useRef(null);
    const floatRef = useRef(null);
    const [imageReady, setImageReady] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [nameDraft, setNameDraft] = useState('');
    const [dragPos, setDragPos] = useState(null);
    const dragRef = useRef(null);
    const hideTimerRef = useRef(null);
    const frameRef = useRef({
        track: null,
        index: 0,
        elapsed: 0,
    });
    const cell = definition.cell;
    const columns = definition.columns;
    const rows = definition.rows;
    const tracks = definition.tracks;
    // Load the atlas once; the definition carries the authoritative per-row
    // frame counts and per-track durations, so nothing else is fetched.
    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.onload = () => {
            if (!cancelled)
                setImageReady(true);
        };
        img.src = definition.atlasUrl;
        return () => {
            cancelled = true;
            img.onload = null;
        };
    }, [definition.atlasUrl]);
    // Frame loop: advance the current track and write background-position.
    // Offsets must be in SCALED coordinates (background-position applies to the
    // scaled background image), so the current sprite scale rides a ref that
    // the loop reads every tick. Under prefers-reduced-motion the sprite holds
    // its track's first frame instead of animating (presentation-only; the
    // animation state machine is untouched).
    const spriteScale = display.size / cell.height;
    const animation = snapshot?.animation ?? 'idle';
    const scaleRef = useRef(spriteScale);
    scaleRef.current = spriteScale;
    useEffect(() => {
        const reduceMotion = typeof window !== 'undefined'
            && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
        const row = rowOfTrack(animation);
        const track = trimTrack(tracks[animation], rows[row] ?? tracks[animation].frames.length);
        // Paint one static sprite frame up front either way, so the pet is never
        // blank while the loop heat-up runs.
        const leadCol = track.frames[0];
        const lead = framePosition(cell, columns, row, leadCol, scaleRef.current);
        if (spriteRef.current !== null) {
            spriteRef.current.style.backgroundPosition = lead.x + 'px ' + lead.y + 'px';
        }
        if (reduceMotion)
            return;
        let raf = 0;
        let last = performance.now();
        const tick = (ts) => {
            const delta = ts - last;
            last = ts;
            // Trim the track to the row's real frame count (transparent cells
            // would render as a vanishing pet).
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
            if (st.elapsed >= (track.durations[st.index] ?? 0)) {
                if (track.loop) {
                    st.elapsed = 0;
                    st.index = 0;
                }
                else {
                    st.index = maxIndex; // hold the final frame; the host switches tracks
                }
            }
            const col = track.frames[st.index];
            const pos = framePosition(cell, columns, row, col, scaleRef.current);
            if (spriteRef.current !== null) {
                spriteRef.current.style.backgroundPosition = pos.x + 'px ' + pos.y + 'px';
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [animation, cell, columns, rows, tracks]);
    // Auto-clear the feedback bubble after its CSS animation. The callback
    // rides a ref so re-renders never reset the timer: the 2s poll rebuilds
    // `props` every tick, and depending on it would starve the timeout.
    const feedbackDoneRef = useRef(props.onFeedbackDone);
    feedbackDoneRef.current = props.onFeedbackDone;
    useEffect(() => {
        if (feedback === null)
            return;
        const timer = window.setTimeout(() => feedbackDoneRef.current(), 2600);
        return () => window.clearTimeout(timer);
    }, [feedback]);
    // Dragging: pointer events on the sprite; position is right/bottom based.
    // `draggedRef` records whether the pointer actually moved, so the browser's
    // trailing click (fired after pointerup) does not pet the sprite.
    const draggedRef = useRef(false);
    const clearHideTimer = () => {
        if (hideTimerRef.current !== null) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };
    const onPointerDown = (e) => {
        e.preventDefault();
        e.target.setPointerCapture?.(e.pointerId);
        const current = dragPos ?? { right: display.right, bottom: display.bottom };
        dragRef.current = { startX: e.clientX, startY: e.clientY, ...current };
        draggedRef.current = false;
        setHovered(false);
    };
    const onPointerMove = (e) => {
        const drag = dragRef.current;
        if (drag === null)
            return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4)
            draggedRef.current = true;
        const right = clampOffset(drag.right - dx, window.innerWidth - 40);
        const bottom = clampOffset(drag.bottom - dy, window.innerHeight - 40);
        setDragPos({ right, bottom });
    };
    const onPointerUp = () => {
        if (dragRef.current === null)
            return;
        dragRef.current = null;
        if (dragPos !== null)
            props.onDragEnd(dragPos.right, dragPos.bottom);
    };
    const pos = dragPos ?? { right: display.right, bottom: display.bottom };
    const spriteWidth = Math.round(cell.width * spriteScale);
    const spriteHeight = Math.round(cell.height * spriteScale);
    const statusBubble = feedback === null && !hovered ? snapshot?.bubble : undefined;
    const displayName = snapshot?.name ?? definition.displayName;
    const float = (_jsxs("div", { ref: floatRef, className: styles.float, style: { right: pos.right, bottom: pos.bottom, zIndex: 2147483000 }, onPointerEnter: () => {
            clearHideTimer();
            setHovered(true);
        }, onPointerLeave: (e) => {
            // The panel and bubble render OUTSIDE the container's box (absolute,
            // above the sprite), so moving onto them fires pointerleave on the
            // container. Treat a target still inside the container's DOM (the
            // overflowed panel) as "still hovering"; otherwise give the pointer a
            // short grace period to reach the panel across the gap above it. The
            // bridge ('.panel::after') keeps the pointer inside the hit area, and
            // the grace period covers a slow mouse crossing the remaining sliver.
            const next = e.relatedTarget;
            if (next instanceof Node && floatRef.current?.contains(next))
                return;
            clearHideTimer();
            hideTimerRef.current = window.setTimeout(() => setHovered(false), 300);
        }, children: [_jsx("div", { ref: spriteRef, className: styles.sprite, style: {
                    width: spriteWidth,
                    height: spriteHeight,
                    backgroundImage: imageReady ? 'url(' + definition.atlasUrl + ')' : undefined,
                    backgroundSize: (cell.width * columns * spriteScale) + 'px ' + (cell.height * rows.length * spriteScale) + 'px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0 0',
                    cursor: dragRef.current === null ? 'grab' : 'grabbing',
                }, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp, onClick: () => {
                    // A pointer sequence that moved (dragged) still fires a trailing
                    // click; skip the pet when that happened.
                    if (draggedRef.current)
                        return;
                    props.onPet();
                }, role: "button", "aria-label": definition.displayName }), feedback !== null && (_jsx("div", { className: clsx(styles.bubble, feedback.kind === 'feed' ? styles.bubbleFeed : styles.bubblePet), children: feedback.text }, feedback.at)), statusBubble !== undefined && (_jsx("div", { className: clsx(styles.bubble, styles.bubbleStatus), role: "status", "aria-live": "polite", children: statusBubble })), hovered && dragRef.current === null && (_jsx("div", { className: styles.panel, onPointerEnter: () => {
                    // Reaching the panel (or its bridge) must cancel any hide timer
                    // the container's pointerleave may have armed while the pointer
                    // crossed the sliver between the sprite and the panel.
                    clearHideTimer();
                }, children: renaming ? (_jsxs("div", { className: styles.renameRow, children: [_jsx("input", { className: styles.nameInput, value: nameDraft, maxLength: 20, placeholder: props.t('pet.namePlaceholder'), autoFocus: true, onChange: (e) => setNameDraft(e.target.value), onKeyDown: (e) => {
                                // While an IME composition is active (e.g. selecting a
                                // Chinese candidate), Enter/Escape keydowns belong to the
                                // input method: ignore them so candidate selection can
                                // neither submit the draft nor close the rename box.
                                if (e.nativeEvent.isComposing)
                                    return;
                                if (e.key === 'Enter') {
                                    const trimmed = nameDraft.trim();
                                    if (trimmed !== '') {
                                        props.onRename(trimmed);
                                        setRenaming(false);
                                    }
                                }
                                else if (e.key === 'Escape') {
                                    setRenaming(false);
                                }
                            } }), _jsx("button", { type: "button", className: styles.action, onClick: () => {
                                const trimmed = nameDraft.trim();
                                if (trimmed !== '') {
                                    props.onRename(trimmed);
                                    setRenaming(false);
                                }
                            }, children: props.t('pet.confirm') })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.rankRow, children: [_jsx("span", { className: styles.nameCell, children: displayName }), _jsx("span", { children: props.t('pet.rank', { rank: snapshot?.affinity.rank ?? '?' }) })] }), _jsxs("div", { className: styles.rankRow, children: [_jsx("span", { children: props.t('pet.treats', { n: snapshot?.treats.stocked ?? 0 }) }), _jsx("span", { children: props.t('pet.points', { points: snapshot?.affinity.points ?? 0 }) })] }), _jsxs("div", { className: styles.actions, children: [_jsx("button", { type: "button", className: styles.action, onClick: props.onFeed, children: props.t('pet.feed') }), _jsx("button", { type: "button", className: styles.action, onClick: () => {
                                        setNameDraft(displayName);
                                        setRenaming(true);
                                    }, children: props.t('pet.rename') }), _jsx("button", { type: "button", className: styles.action, onClick: props.onHide, children: props.t('pet.hide') })] })] })) }))] }));
    return createPortal(float, document.body);
}
