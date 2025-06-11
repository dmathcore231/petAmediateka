import { JSX } from "react"
import { Size } from "../../../types/Scaffold"

export interface SkeletonsProps {
  type: Size
}

export function SkeletonCard({ type }: SkeletonsProps): JSX.Element {
  const baseClass = "skeleton-card"
  const itemClass = `${baseClass}__item`
  const sizeCardClass = `${baseClass}_size_${type}`
  const CLASSES = {
    badge: `${baseClass}__badge`,
    wrapper: `${baseClass}__wrapper`,
    item: {
      width: {
        md: `${itemClass}_width_md`,
        sm: `${itemClass}_width_sm`,
      },
      color: {
        bg: {
          secondary: `${itemClass}_color-bg_secondary`,
        },
      },
    }
  }

  return (
    <div className={`${baseClass} ${sizeCardClass}`}>
      {type !== 'md' && (<div className={CLASSES.badge} />)}
      <div className={CLASSES.wrapper}>
        <div className={`${itemClass} ${CLASSES.item.color.bg.secondary}`} />
        <div className={`${itemClass} ${CLASSES.item.width.md}`} />
        {type !== 'md' && (<div className={`${itemClass} ${CLASSES.item.width.sm}`} />)}
      </div>
    </div>
  )
}
