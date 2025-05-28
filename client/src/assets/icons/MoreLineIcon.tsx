import { JSX } from "react"
import { IconProps } from "../../types/interfaces/IconProps"

export function MoreLineIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 18 4" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M1.5.5C.675.5 0 1.175 0 2s.675 1.5 1.5 1.5S3 2.825 3 2 2.325.5 1.5.5Zm15 0C15.675.5 15 1.175 15 2s.675 1.5 1.5 1.5S18 2.825 18 2 17.325.5 16.5.5ZM9 .5c-.825 0-1.5.675-1.5 1.5S8.175 3.5 9 3.5s1.5-.675 1.5-1.5S9.825.5 9 .5Z" />
    </svg>
  )
}
