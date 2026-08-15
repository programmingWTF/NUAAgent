// NUAAgent logo mark: a rounded square plate with an "N" letterform.
// Native 23.16x17.04 to keep the original component's aspect-ratio contract
// (rendered 24x18 by default; hero usage scales to 34x25).
// Ink rides currentColor (wordmark ink).

import type { IconProps } from './icons/props.ts'

/**
 * Render the NUAAgent logo mark.
 * @param props.size - width in px (default 24; height keeps the 23.16:17.04 ratio).
 * @param props.className - extra class for layout placement.
 * @returns the logo svg (aria-hidden; pair with the wordmark for accessibility).
 */
export function FishLogo({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={(size * 17.04) / 23.16}
      className={className}
      viewBox="0 0 23.16 17.04"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0.6" y="0.6" width="21.96" height="15.84" rx="3.4" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <text
        x="11.58"
        y="12.1"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="bold"
        fontSize="12.5"
        fill="currentColor"
      >N</text>
    </svg>
  )
}
