import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from '../ui.js';
import { t } from '../i18n.js';
/**
 * The dim "interrupted" row shown when the user stops a turn, mirroring
 * Claude Code's `InterruptedByUser.tsx`.
 */
export function InterruptedByUser() {
    return (_jsxs(_Fragment, { children: [_jsx(Text, { dimColor: true, children: t('interrupted-by-user') }), _jsx(Text, { dimColor: true, children: t('interrupted-ask-next') })] }));
}
