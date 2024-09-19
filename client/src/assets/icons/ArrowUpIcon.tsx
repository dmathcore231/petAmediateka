import { IconProps } from "../../types/interfaces/IconProps"

export function ArrowUpIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 15.75l7.5-7.5 7.5 7.5" stroke="in" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
