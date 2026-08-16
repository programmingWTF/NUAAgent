import type { PropsRuntime } from '@nuaagent/client-ui-slots';
/** Full props of the dock entry: the input-zone runtime share (session standard kit). */
export type WorkingLineProps = PropsRuntime<'conversation.input.dock'>;
/**
 * Working-line dock entry: reads the latest activity snapshot off the
 * conversation snapshot and renders the row, or nothing when idle/absent.
 */
export declare function WorkingLine({ useSession }: WorkingLineProps): import("react").JSX.Element | null;
//# sourceMappingURL=WorkingLine.d.ts.map