import { JSX } from "react"
import { AgeRestrictionBadgeProps } from "../../types/interfaces/AgeRestrictionBadgeProps"

export function AgeRestrictionBadge({ size, data, loading }: AgeRestrictionBadgeProps): JSX.Element {
  const baseClass: string = 'age-restriction-badge'
  const sizeClass: string = `age-restriction-badge_size_${size}`
  const loadingClass: string = loading ? ` ${baseClass}_loading` : ''
  const badgeContent: string = data ? `${data}+` : ''

  return (
    <div className={`${baseClass} ${sizeClass}${loadingClass}`}>
      {badgeContent}
    </div>
  )
}
