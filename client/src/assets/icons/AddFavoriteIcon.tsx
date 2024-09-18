import { IconProps } from "../../types/interfaces/IconProps"

export function AddFavoriteIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8.074 0 0 8.074 0 18s8.074 18 18 18 18-8.076 18-18S27.926 0 18 0zm1.5 16.5v-6a1.5 1.5 0 00-3 0v6h-6a1.5 1.5 0 000 3h6v6a1.5 1.5 0 003 0v-6h6a1.5 1.5 0 000-3h-6zM18 33.211C9.613 33.211 2.789 26.388 2.789 18S9.613 2.789 18 2.789c8.388 0 15.211 6.823 15.211 15.211S26.387 33.211 18 33.211z" fill="white" />
    </svg>
  )
}
