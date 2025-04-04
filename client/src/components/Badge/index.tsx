import { JSX } from "react"
import { BadgeProps } from "../../types/interfaces/BadgeProps"

export function Badge({ type, title }: BadgeProps): JSX.Element {
  const baseClass: string = 'badge'
  const typeClass: string = `badge_${type}`

  return (
    <span className={`${baseClass} ${typeClass}`}>
      {title}
    </span>
  )
}
