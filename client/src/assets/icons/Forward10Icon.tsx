import { IconProps } from "../../types/interfaces/IconProps"

export function Forward10Icon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10h-2a8 8 0 11-1.865-5.135l-1.997 1.997A2.5 2.5 0 0012 10.75v2.5a2.5 2.5 0 005 0v-2.5c0-.681-.273-1.3-.715-1.75H22V3l-2.447 2.446A9.977 9.977 0 0012 2zm3.5 8.75v2.5a1 1 0 11-2 0v-2.5a1 1 0 112 0zM10 8.5H8.5v7H10v-7z" fill="inherit" />
    </svg>
  )
}