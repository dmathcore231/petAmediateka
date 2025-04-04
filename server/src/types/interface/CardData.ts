import { Badge } from "../Badge"
import { Bg } from "../Bg"

export interface CardData {
  _id: string
  type: 'movie' | 'series'
  title: {
    value: string
    originalTitle: string
    linkTitle: string
  }
  badge: Badge | null
  ageRestriction: number
  description: string
  bg: Bg
  logoImg: string
  link: string
}
