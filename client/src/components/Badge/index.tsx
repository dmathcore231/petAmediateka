import { BadgeProps } from "../../types/interfaces/BadgeProps"

export function Badge({ type, title }: BadgeProps): JSX.Element {
  return (
    <span className={`badge badge_${type}`}>
      {title}
    </span>
  )
}
