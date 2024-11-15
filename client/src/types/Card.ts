import { BadgeCard } from "./BadgeCard"
import { Size } from "./Scaffold"
import { Flex } from "./Scaffold"

export type CardLink = {
  linkType: 'allCard' | 'title'
}

export type CardTitle = {
  titleType: "img" | "text"
  titleValue: string
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

export type CardSetting = {
  title: {
    titleValue: string | null
    titleOutside: boolean
    titleLogoImg: boolean
  }
  link: CardLink
  descriptionVisible: boolean
  tags: TagsCard | null
}

