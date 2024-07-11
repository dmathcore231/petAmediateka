import { IconProps } from "../../types/interfaces/IconProps"

export function SearchIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 20 22" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 13.996A6 6 0 108 2a6 6 0 100 11.997zm5.526-.215l6.168 6.384a1.089 1.089 0 01-.013 1.527 1.052 1.052 0 01-1.501-.013l-6.404-6.629A7.966 7.966 0 018 15.996 7.999 7.999 0 118 0a7.999 7.999 0 015.526 13.78z" fill="inherit" fillRule="evenodd" />
    </svg>
  )
}
