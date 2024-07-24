import { BadgeCard } from "./BadgeCard"

export type CardData = {
  link: string
  title: string
  imgBg?: string
  ageRestriction?: number
  description?: string
  badge?: BadgeCard
}
