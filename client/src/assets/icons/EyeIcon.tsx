import { IconProps } from "../../types/interfaces/IconProps"

export function EyeIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 22 15" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11 14c4.348 0 8.211-2.594 9.917-6.5A10.824 10.824 0 0011 1a10.824 10.824 0 00-9.917 6.5A10.824 10.824 0 0011 14zm0-14c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S1.73 11.89 0 7.5C1.73 3.11 6 0 11 0zm0 4.5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0-1c-2.212 0-4 1.788-4 4 0 2.212 1.788 4 4 4 2.212 0 4-1.788 4-4 0-2.212-1.788-4-4-4z" fill="#565C67" />
    </svg>
  )
}
