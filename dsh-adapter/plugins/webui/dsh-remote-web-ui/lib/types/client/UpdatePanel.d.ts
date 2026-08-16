/**
 * The update panel body: check progress, version comparison, the
 * auto-update in-flight state, and the outcome (restart hint on success,
 * translated failure on error). Pure presentation — all state arrives
 * through props from the entry behavior component.
 */
import type { TranslateNS } from '@nuaagent/client-ui-slots';
import type { UpdateRunResult, UpdateStatus } from '../update.ts';
/** The panel view state, owned by the entry component. */
export type UpdateView = {
    kind: 'checking';
} | {
    kind: 'result';
    status: UpdateStatus;
} | {
    kind: 'updating';
    status: UpdateStatus;
} | {
    kind: 'done';
    result: UpdateRunResult;
} | {
    kind: 'error';
    message: string;
    detail?: string;
};
/** Full panel props: copy + view state + actions. */
export interface UpdatePanelProps {
    t: TranslateNS<'remote'>;
    view: UpdateView;
    onClose(): void;
    /** Re-run the check from a terminal state. */
    onRecheck(): void;
}
/**
 * Render the update panel.
 * @param props - copy, view state, and actions.
 * @returns the panel element tree.
 */
export declare function UpdatePanel({ t, view, onClose, onRecheck }: UpdatePanelProps): import("react").JSX.Element;
//# sourceMappingURL=UpdatePanel.d.ts.map