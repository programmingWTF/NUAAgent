/**
 * Keyboard input parser - converts terminal input to key events
 *
 * Uses the termio tokenizer for escape sequence boundary detection,
 * then interprets sequences as keypresses.
 */
import { Buffer } from 'buffer';
import { type Tokenizer } from './termio/tokenize.js';
/** DECRPM status values (response to DECRQM) */
export declare const DECRPM_STATUS: {
    readonly NOT_RECOGNIZED: 0;
    readonly SET: 1;
    readonly RESET: 2;
    readonly PERMANENTLY_SET: 3;
    readonly PERMANENTLY_RESET: 4;
};
/**
 * A response sequence received from the terminal (not a keypress).
 * Emitted in answer to queries like DECRQM, DA1, OSC 11, etc.
 */
export type TerminalResponse = 
/** DECRPM: answer to DECRQM (request DEC private mode status) */
{
    type: 'decrpm';
    mode: number;
    status: number;
}
/** DA1: primary device attributes (used as a universal sentinel) */
 | {
    type: 'da1';
    params: number[];
}
/** DA2: secondary device attributes (terminal version info) */
 | {
    type: 'da2';
    params: number[];
}
/** Kitty keyboard protocol: current flags (answer to CSI ? u) */
 | {
    type: 'kittyKeyboard';
    flags: number;
}
/** DSR: cursor position report (answer to CSI 6 n) */
 | {
    type: 'cursorPosition';
    row: number;
    col: number;
}
/** OSC response: generic operating-system-command reply (e.g. OSC 11 bg color) */
 | {
    type: 'osc';
    code: number;
    data: string;
}
/** XTVERSION: terminal name/version string (answer to CSI > 0 q).
 *  Example values: "xterm.js(5.5.0)", "ghostty 1.2.0", "iTerm2 3.6". */
 | {
    type: 'xtversion';
    name: string;
};
/** Mutable cross-call state for the decomposed-paste matcher. */
export type Win32PasteState = {
    /** true between the decomposed start and end markers */
    active: boolean;
    /** progress into the marker pattern currently being matched */
    matched: number;
    /** keys held while a marker prefix match is in flight */
    held: ParsedKey[];
    /** collected paste content while active */
    buffer: string;
};
/**
 * Parser state carried between parseMultipleKeypresses calls: paste mode,
 * buffered incomplete input, and the internal tokenizer instance.
 */
export type KeyParseState = {
    mode: 'NORMAL' | 'IN_PASTE';
    incomplete: string;
    pasteBuffer: string;
    /**
     * Pending high surrogate from a win32-input-mode record. Uc is a UTF-16
     * code unit, so supplementary-plane characters (emoji, CJK ext-B) arrive
     * as two consecutive records; the high half waits here for its low half.
     */
    win32HighSurrogate?: number;
    /**
     * Pending high surrogate for the Alt+numpad synthesis path — separate
     * from win32HighSurrogate because the two Alt rounds of one supplementary
     * char interleave with keydown records (Alt-down, numpad digits) that
     * would settle the regular slot before the low half arrives.
     */
    win32AltHighSurrogate?: number;
    /**
     * Decomposed bracketed-paste tracking for win32-input-mode. Classic
     * conhost synthesizes pastes as per-char KEY_EVENT_RECORDs — including
     * the ESC[200~ / ESC[201~ markers themselves — so under W32IM the markers
     * arrive as ordinary key records and must be reassembled here (issue #147).
     */
    win32Paste?: Win32PasteState;
    _tokenizer?: Tokenizer;
};
/** Initial `KeyParseState` for a fresh parser. */
export declare const INITIAL_STATE: KeyParseState;
/**
 * Tokenize and parse a chunk of terminal input into parsed keys, mouse
 * events, and terminal responses, maintaining paste-mode state.
 * @param prevState - the state returned by the previous call, or INITIAL_STATE.
 * @param input - the input chunk; null flushes the tokenizer's pending input.
 * @returns the parsed inputs plus the state to pass to the next call.
 */
export declare function parseMultipleKeypresses(prevState: KeyParseState, input?: Buffer | string | null): [ParsedInput[], KeyParseState];
/**
 * Key names that never produce printable input (function keys, navigation,
 * modifiers, mouse), used to filter parsed keypresses.
 */
export declare const nonAlphanumericKeys: string[];
/**
 * A parsed user keypress or paste: the key name, modifier flags, the raw
 * escape sequence, and whether the input arrived via bracketed paste.
 */
export type ParsedKey = {
    kind: 'key';
    fn: boolean;
    name: string | undefined;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
    option: boolean;
    super: boolean;
    sequence: string | undefined;
    raw: string | undefined;
    code?: string;
    isPasted: boolean;
};
/** A terminal response sequence (DECRPM, DA1, OSC reply, etc.) parsed
 *  out of the input stream. Not user input — consumers should dispatch
 *  to a response handler. */
export type ParsedResponse = {
    kind: 'response';
    /** Raw escape sequence bytes, for debugging/logging */
    sequence: string;
    response: TerminalResponse;
};
/** SGR mouse event with coordinates. Emitted for clicks, drags, and
 *  releases (wheel events remain ParsedKey). col/row are 1-indexed
 *  from the terminal sequence (CSI < btn;col;row M/m). */
export type ParsedMouse = {
    kind: 'mouse';
    /** Raw SGR button code. Low 2 bits = button (0=left,1=mid,2=right),
     *  bit 5 (0x20) = drag/motion, bit 6 (0x40) = wheel. */
    button: number;
    /** 'press' for M terminator, 'release' for m terminator */
    action: 'press' | 'release';
    /** 1-indexed column (from terminal) */
    col: number;
    /** 1-indexed row (from terminal) */
    row: number;
    sequence: string;
};
/** Everything that can come out of the input parser: a user keypress/paste,
 *  a mouse click/drag event, or a terminal response to a query we sent. */
export type ParsedInput = ParsedKey | ParsedMouse | ParsedResponse;
//# sourceMappingURL=parse-keypress.d.ts.map