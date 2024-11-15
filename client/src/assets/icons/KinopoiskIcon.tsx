import { IconProps } from "../../types/interfaces/IconProps"

export function KinopoiskIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 29 29" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.185 28.37C6.351 28.37 0 22.02 0 14.186 0 6.351 6.351 0 14.185 0c7.835 0 14.186 6.351 14.186 14.185 0 7.835-6.351 14.186-14.186 14.186zm0-11.905a2.28 2.28 0 100-4.56 2.28 2.28 0 000 4.56zm5.447-4.306a3.42 3.42 0 100-6.84 3.42 3.42 0 000 6.84zm0 10.892a3.42 3.42 0 100-6.84 3.42 3.42 0 000 6.84zM8.739 12.16a3.42 3.42 0 100-6.84 3.42 3.42 0 000 6.84zm0 10.892a3.42 3.42 0 100-6.84 3.42 3.42 0 000 6.84z" fill="inherit" fillRule="evenodd" />
    </svg>
  )
}
