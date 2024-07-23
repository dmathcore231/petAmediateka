import { IconProps } from "../../types/interfaces/IconProps"

export function PlayIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 18 22" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M1.952 2.795v16.41L15.132 11 1.952 2.795zm-.473 19.06a.958.958 0 01-1.34-.344 1.049 1.049 0 01-.139-.52V1.009C0 .452.437 0 .976 0c.177 0 .351.05.503.145l16.048 9.99a1.028 1.028 0 010 1.729L1.48 21.855z" />
    </svg>
  )
}
