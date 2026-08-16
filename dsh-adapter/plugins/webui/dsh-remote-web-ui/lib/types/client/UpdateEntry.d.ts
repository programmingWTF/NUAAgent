import type { TranslateNS } from '@nuaagent/client-ui-slots';
/** Entry props: the sidebar column state + the standard locale seat. */
export interface UpdateEntryProps {
    /** Whether the sidebar renders wide content (false = 56px rail). */
    wide: boolean;
    t: TranslateNS<'remote'>;
}
/**
 * Render the update trigger and panel.
 * @param props - column state and locale seat.
 * @returns the entry element tree.
 */
export declare function UpdateEntry({ wide, t }: UpdateEntryProps): import("react").JSX.Element;
//# sourceMappingURL=UpdateEntry.d.ts.map