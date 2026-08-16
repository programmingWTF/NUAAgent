import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Mobile surface entry: the standalone phone UI served at /m. Boots its own
 * React tree (no main-UI module loader), talks to the host over the shared
 * /api transport with the paired-device cookie, and renders a deliberately
 * thin three-level surface:
 *   workspaces (landing, no new-session homepage) → sessions (paged) →
 *   chat (history paged on demand + live mux stream + prompt input).
 */
import { createRoot } from 'react-dom/client';
import { App } from "./views/App.js";
import { mobileCss } from "./mobile-styles.js";
import { initMobileTheme } from "./mobile-theme.js";
// Apply the persisted (or default light) theme before first paint, so the
// page never flashes the wrong palette.
initMobileTheme();
// Inject the standalone stylesheet (the page has no shell to load it for us).
const style = document.createElement('style');
style.dataset.plugin = 'remote-web-ui/mobile';
style.textContent = mobileCss;
document.head.appendChild(style);
const root = document.getElementById('root');
if (root === null)
    throw new Error('mobile: #root missing');
createRoot(root).render(_jsx(App, {}));
