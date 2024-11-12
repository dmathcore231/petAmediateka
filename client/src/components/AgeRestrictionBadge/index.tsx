import { AgeRestrictionBadgeProps } from "../../types/interfaces/AgeRestrictionBadgeProps"

export function AgeRestrictionBadge({ size, data, loading }: AgeRestrictionBadgeProps): JSX.Element {
  return (
    <div className={`age-restriction-badge age-restriction-badge_size_${size}` + (loading ? ' age-restriction-badge_loading' : '')}>
      {data && (
        `${data}+`
      )}
    </div>
  )
}
