// NUAAgent brand wordmark: the "NUAAgent" letterforms in one svg.
// Native 182x24 to keep the original component's aspect-ratio contract.
// Ink rides currentColor.

import type { IconProps } from './icons/props.ts'

/**
 * Render the full NUAAgent brand wordmark.
 * @param props.size - height in px (default 24; width keeps the 182:24 ratio).
 * @param props.className - extra class for layout placement.
 * @returns the wordmark svg (aria-hidden decorative brand art).
 */
export function BrandWordmark({ size = 24, className }: IconProps) {
  return (
    <svg
      width={(size * 182) / 24}
      height={size}
      className={className}
      viewBox="0 0 182 24"
      fill="none"
      aria-hidden="true"
    >
      <text
        x="2"
        y="17.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="19"
        fill="currentColor"
      >NUAAgent</text>
    </svg>
  )
}
