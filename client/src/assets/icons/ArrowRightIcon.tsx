import { IconProps } from "../../types/interfaces/IconProps"

export function ArrowRightIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke="inherit" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
