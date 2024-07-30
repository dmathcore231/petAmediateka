import { AgeRestrictionBadgeProps } from "../../types/interfaces/AgeRestrictionBadgeProps"

export function AgeRestrictionBadge({ size, data }: AgeRestrictionBadgeProps): JSX.Element {
  return (
    <div className={`age-restriction-badge age-restriction-badge_size_${size}`}>
      {`${data}+`}
    </div>
  )
}
