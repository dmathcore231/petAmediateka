import { BadgeCard } from "./BadgeCard"

export type CardData = {
  link: string
  imgBg: string
  title?: {
    type: "img" | "text"
    value: string
  }
  ageRestriction?: number
  description?: string
  badge?: BadgeCard
}
