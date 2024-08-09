import { BadgeCard } from "./BadgeCard"
import { Size } from "./Scaffold"
import { Flex } from "./Scaffold"

export type CardLink = {
  type: 'allCard' | 'title'
  value: string
}

export type CardTitle = {
  type: "img" | "text"
  value: string
}

export type TagsCard = {
  raiting: number
  ageRestriction: number
  dateRelease: string
  genres?: string[]
}

export type CardData = {
  link: CardLink,
  imgBg: string
  title?: CardTitle
  ageRestriction?: number
  description?: string
  badge?: BadgeCard
  tags?: TagsCard
}

export type CardStyles = {
  cardSize: Size
  flex: {
    body: {
      justifyContent: Flex
    }
  }
  clipPath: boolean
  boxShadow: boolean
  btnGroup: boolean
  ageRestrictionBadge?: {
    position: 'right' | 'left'
    size: Size
  }
  hover?: {
    scale: boolean
    playBack: {
      value: boolean
      type: "bottom-more" | "default" | null
    }
    shadow: boolean
  }
}

