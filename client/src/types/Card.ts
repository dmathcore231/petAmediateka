import { BadgeCard } from "./BadgeCard"
import { Bg } from "./Bg"
import { Size } from "./Scaffold"
import { Flex } from "./Scaffold"
import { SrcMediaPlaer } from "./SrcMediaPlaer"

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
  _id: string
  type: 'movie' | 'series'
  title: {
    value: string
    originalTitle: string
    linkTitle: string
  }
  badge: BadgeCard | null
  ageRestriction: number
  description: string
  bg: Bg
  logoImg: string
  link: string
  src?: SrcMediaPlaer
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
  } | null
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
    titleOutside: boolean
    titleLogoImg: boolean
    titleLogoImgIndex: number | null
  }
  badgeVisible: boolean
  link: CardLink
  descriptionVisible: boolean
  tags: TagsCard | null
  cardSeries: boolean
}

