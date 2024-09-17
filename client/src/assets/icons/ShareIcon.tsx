import { IconProps } from "../../types/interfaces/IconProps"

export function ShareIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 24a3 3 0 110-6 3 3 0 010 6zM5 16a3 3 0 110-6 3 3 0 010 6zM19 2a3 3 0 110 6 3 3 0 010-6zm0 14c-1.77 0-3.315.925-4.204 2.312l-5.355-3.06c.346-.68.559-1.438.559-2.252 0-.503-.097-.979-.235-1.437l5.571-3.183A4.97 4.97 0 0019 10a5 5 0 005-5 5 5 0 00-5-5 5 5 0 00-5 5c0 .503.097.979.235 1.438L8.664 9.62A4.973 4.973 0 005 8a5 5 0 00-5 5 5 5 0 005 5c1.14 0 2.179-.396 3.02-1.038L8 17l6.055 3.46c-.02.18-.055.354-.055.54a5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5z" fill="inherit" fillRule="evenodd" />
    </svg>
  )
}
