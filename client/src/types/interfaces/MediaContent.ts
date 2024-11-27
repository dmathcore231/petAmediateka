import { Bg } from "../Bg"
import { EpisodesSeries } from "../EpisodesSeries"
import { BadgeCard } from "../BadgeCard"

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
  rating: {
    amediateka: number | 'N/A'
    imdb: number | 'N/A'
    kinopoisk: number | 'N/A'
  }
  actionsData: {
    favorites: string[] | []
    liked: string[] | []
    disliked: string[] | []
  }
  bg: Bg
  trailer: {
    quality360: string | null
    quality720: string | null
    quality1080: string | null
    quality2160: string | null
    img: string
  } | null
  logoImg: string
}

export interface Season {
  numberOfSeasons: number
  episodes: EpisodesSeries[]
  bg: Bg | null
  trailer: {
    quality360: string | null
    quality720: string | null
    quality1080: string | null
    quality2160: string | null
    img: string
  } | null
  description: string | null
}
