import { jsx as _jsx } from "react/jsx-runtime";
// @vitest-environment jsdom
/** SessionListView: owned-row filtering, incremental pages, session creation. */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SessionListView } from "./SessionListView.js";
// The api module is fully mocked; the view's App.tsx helpers stay real.
vi.mock('../api.ts', () => ({
    listSessions: vi.fn(),
    listWorkspaces: vi.fn(),
    createSession: vi.fn(),
}));
import { createSession, listSessions, listWorkspaces } from "../api.js";
const listSessionsMock = vi.mocked(listSessions);
const listWorkspacesMock = vi.mocked(listWorkspaces);
const createSessionMock = vi.mocked(createSession);
const workspace = {
    workspaceId: 'w-1',
    path: '/tmp/demo',
    title: '演示项目',
    sessionIds: ['s-1'],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
};
/** A session.list summary row. */
function summary(sessionId, updatedAt, extra = {}) {
    return { sessionId, updatedAt, running: false, blank: false, ...extra };
}
let picked;
function renderList(props = {}) {
    picked = undefined;
    render(_jsx(SessionListView, { workspace: workspace, onBack: () => { }, onPick: (session) => { picked = session; }, ...props }));
}
beforeEach(() => {
    listSessionsMock.mockResolvedValue({ items: [], hasMore: false });
    listWorkspacesMock.mockResolvedValue([workspace]);
    createSessionMock.mockResolvedValue({ sessionId: 's-new' });
});
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});
describe('SessionListView roster', () => {
    it('renders the sessions owned by the workspace', async () => {
        listSessionsMock.mockResolvedValue({
            items: [
                summary('s-1', 1_700_000_000_000, { projections: { values: { title: '改造移动端' } } }),
                summary('s-other', 1_600_000_000_000, { cwd: '/tmp/foreign' }),
            ],
            hasMore: false,
        });
        renderList();
        expect(await screen.findByText('改造移动端')).toBeTruthy();
        // The foreign session (not in workspace.sessionIds) stays hidden.
        expect(screen.queryByText(/foreign/)).toBeNull();
    });
    it('shows the empty state when the workspace owns no sessions', async () => {
        renderList();
        expect(await screen.findByText(/还没有会话/)).toBeTruthy();
    });
    it('refreshes the owned-id set from workspace.list on mount', async () => {
        listSessionsMock.mockResolvedValue({
            items: [summary('s-2', 1_700_000_000_000, { cwd: '/tmp/other' })],
            hasMore: false,
        });
        listWorkspacesMock.mockResolvedValue([
            { ...workspace, sessionIds: ['s-2'] },
        ]);
        renderList();
        // s-2 is absent from the stale row but present in the fresh roster.
        expect(await screen.findByText(/other/)).toBeTruthy();
    });
});
describe('SessionListView creation', () => {
    it('creates a blank session in the workspace and opens it immediately', async () => {
        renderList();
        await screen.findByText(/还没有会话/);
        fireEvent.click(screen.getByRole('button', { name: '+ 新建会话' }));
        await waitFor(() => {
            expect(createSessionMock).toHaveBeenCalledWith({ workspaceId: 'w-1' });
        });
        await waitFor(() => {
            expect(picked).toBeDefined();
        });
        expect(picked?.sessionId).toBe('s-new');
        expect(picked?.blank).toBe(true);
        // The fresh row is prepended without waiting for a refetch.
        expect(await screen.findByText('新会话')).toBeTruthy();
    });
    it('keeps the button disabled while a creation is in flight', async () => {
        let resolveCreate = () => { };
        createSessionMock.mockReturnValue(new Promise(resolve => { resolveCreate = resolve; }));
        renderList();
        await screen.findByText(/还没有会话/);
        fireEvent.click(screen.getByRole('button', { name: '+ 新建会话' }));
        const button = await screen.findByRole('button', { name: '创建中…' });
        expect(button.hasAttribute('disabled')).toBe(true);
        resolveCreate({ sessionId: 's-new' });
        await waitFor(() => { expect(picked).toBeDefined(); });
    });
    it('shows the stale-host hint when creation is refused with HTTP 403', async () => {
        createSessionMock.mockRejectedValue(new Error('HTTP 403'));
        renderList();
        await screen.findByText(/还没有会话/);
        fireEvent.click(screen.getByRole('button', { name: '+ 新建会话' }));
        expect(await screen.findByText(/HTTP 403/)).toBeTruthy();
        expect(await screen.findByText(/重启 dsh web/)).toBeTruthy();
        expect(picked).toBeUndefined();
    });
});
