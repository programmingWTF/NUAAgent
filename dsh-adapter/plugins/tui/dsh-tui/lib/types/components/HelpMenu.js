import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '../ink/components/Box.js';
import Text from '../ink/components/Text.js';
import { localizedDescription } from '../commands.js';
import { t } from '../i18n.js';
import { modLabel } from '../utils/modifiers.js';
/**
 * The `?` help menu, mirroring Claude Code's `PromptInputHelpMenu.tsx`
 * (three-column shortcut layout, trimmed to the keys dsh-tui actually binds).
 * The command column lists the merged slash-command surface: built-in
 * commands plus plugin-registered ones from the DSH registry (plan/goal/…).
 * Skill entries (user-invocable skills merged for `/` completion, issue
 * #86) are hidden — a skills directory can hold dozens of entries and the
 * menu is for chrome commands. Modifier labels follow the platform
 * convention: ⌘ on macOS, ctrl elsewhere.
 */
export function HelpMenu({ commands, }) {
    const chrome = commands.filter(command => !command.skill);
    return (_jsxs(Box, { paddingX: 2, flexDirection: "row", gap: 4, children: [_jsxs(Box, { flexDirection: "column", width: 26, flexShrink: 0, children: [_jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-for-commands') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-this-help') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-verbose-output', { mod: modLabel }) }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-toggle-context', { mod: modLabel }) }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-search-history', { mod: modLabel }) }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-interrupt') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-exit') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-redraw', { mod: modLabel }) }) })] }), _jsxs(Box, { flexDirection: "column", width: 24, flexShrink: 0, children: [_jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-clear-input') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-history-nav') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-move-cursor') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-word-jumps', { mod: modLabel }) }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-complete-command') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-cycle-mode') }) }), _jsx(Box, { children: _jsx(Text, { dimColor: true, children: t('help-open-editor') }) })] }), _jsxs(Box, { flexDirection: "column", flexShrink: 1, children: [_jsx(Text, { dimColor: true, children: t('help-commands-title') }), chrome.map(command => (_jsx(Box, { children: _jsxs(Text, { dimColor: true, wrap: "truncate-end", children: ["/", command.name, " \u2014 ", localizedDescription(command)] }) }, command.name)))] })] }));
}
