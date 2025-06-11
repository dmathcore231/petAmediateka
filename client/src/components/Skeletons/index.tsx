import { JSX } from "react"
import { SkeletonBanner } from "./Banner/index"
import { SkeletonCard } from "./Card/index"
import { Size } from "../../types/Scaffold"

export type TypeSkeleton = "banner" | "card"

export interface SkeletonsProps {
  type: TypeSkeleton
  cardType?: Size
}

export function Skeletons({ type, cardType }: SkeletonsProps): JSX.Element {
  const config = {
    banner: (<SkeletonBanner />),
    card: cardType ? (<SkeletonCard type={cardType} />) : null,
  }

  return (
    <div className="skeletons">
      {config[type]}
    </div>
  )
}
