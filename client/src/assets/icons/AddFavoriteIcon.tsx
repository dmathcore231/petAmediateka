import { IconProps } from "../../types/interfaces/IconProps"

export function AddFavoriteIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M.125 11C.125 5.043 5.003.2 11 .2S21.875 5.044 21.875 11c0 5.954-4.878 10.8-10.875 10.8S.125 16.954.125 11zm1.685 0c0 5.032 4.123 9.126 9.19 9.126 5.067 0 9.19-4.094 9.19-9.127S16.068 1.872 11 1.872c-5.067 0-9.19 4.094-9.19 9.127z" fill="#fff" /><path d="M10.094 6.5c0-.498.405-.9.906-.9.5 0 .906.402.906.9v9c0 .496-.405.9-.906.9a.903.903 0 01-.906-.9v-9z" fill="#fff" /><path d="M6.469 11.9a.903.903 0 01-.907-.9c0-.498.406-.9.907-.9h9.062c.5 0 .906.402.906.9 0 .496-.405.9-.906.9H6.47z" fill="#fff" />
    </svg>
  )
}
