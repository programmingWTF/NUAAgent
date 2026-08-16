/**
 * Mobile surface entry: the standalone phone UI served at /m. Boots its own
 * React tree (no main-UI module loader), talks to the host over the shared
 * /api transport with the paired-device cookie, and renders a deliberately
 * thin three-level surface:
 *   workspaces (landing, no new-session homepage) → sessions (paged) →
 *   chat (history paged on demand + live mux stream + prompt input).
 */
export {};
//# sourceMappingURL=index.d.ts.map