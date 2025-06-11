import { JSX } from "react"

export function SkeletonBanner(): JSX.Element {
  const baseClass = "skeleton-banner"
  const itemClass = `${baseClass}__item`
  const widthMdItemClass = `${itemClass}_width_md`
  const widthSMItemClass = `${itemClass}_width_sm`
  const colorSecondaryItemClass = `${itemClass}_color-bg_secondary`

  return (
    <div className={baseClass}>
      <div className={`${itemClass} ${colorSecondaryItemClass}`} />
      <div className={`${itemClass} ${widthMdItemClass}`} />
      <div className={`${itemClass} ${widthSMItemClass}`} />
    </div>
  )
}
