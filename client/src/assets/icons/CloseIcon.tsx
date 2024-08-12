import { IconProps } from "../../types/interfaces/IconProps"

export function CloseIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 13.95L29.33.62a1.45 1.45 0 1 1 2.05 2.05L18.05 16l13.33 13.33a1.45 1.45 0 0 1-2.05 2.05L16 18.05 2.67 31.38a1.45 1.45 0 0 1-2.05-2.05L13.95 16 .62 2.67A1.45 1.45 0 0 1 2.67.62L16 13.95z" fill="inherit" fillRule="nonzero"></path>
    </svg>
  )
}
