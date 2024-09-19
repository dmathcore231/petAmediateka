import { IconProps } from "../../types/interfaces/IconProps"

export function MediaPlayIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 120 120" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd"><circle fillOpacity=".2" fill="#111113" fillRule="nonzero" cx="60" cy="60" r="60" /><circle stroke="#FFF" strokeWidth="4" cx="60" cy="60" r="58" /><path d="M86.394 60.868l-39.9 22.658a1 1 0 01-1.494-.87V37.343a1 1 0 011.494-.87l39.9 22.656a1 1 0 010 1.74z" fill="#FEB52B" fillRule="nonzero" /></g>
    </svg>
  )
}
