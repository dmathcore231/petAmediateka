import { Bg } from "../Bg"
import { EpisodesSeries } from "../EpisodesSeries"
import { BadgeCard } from "../BadgeCard"
import { TrailerSrc } from "../TrailerSrc"
import { Ratings } from "../Ratings"

export type MediaContentData = {
  title: {
    value: string
    originalTitle: string
    linkTitle: string
  }
  badge: BadgeCard | null
  description: {
    mainDescription: string
    prewiewDescription: string
  }
  about: {
    title: string
    description: string
  } | null
  ageRestriction: number
  dateRelease: string | 'N/A'
  genres: string[]
  actors: string[]
  directors: string[]
  country: string | 'N/A'
  production: string | 'N/A'
}

export interface MediaContent {
  _id: string
  __v: number
  type: 'movie' | 'series'
  seasons: Season[] | null
  data: MediaContentData
  rating: Ratings
  actionsData: {
    favorites: string[] | []
    liked: string[] | []
    disliked: string[] | []
  }
  bg: Bg
  trailer: TrailerSrc | null
  logoImg: string
}

export interface Season {
  numberOfSeasons: number
  episodes: EpisodesSeries[]
  bg: Bg | null
  trailer: TrailerSrc | null
  description: string | null
}
