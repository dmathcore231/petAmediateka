import { JSX } from "react"
import { IconProps } from "../../types/interfaces/IconProps"

export function SelectIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.657-5.657 1.414 1.414L11.003 16Z" />
    </svg>
  )
}
