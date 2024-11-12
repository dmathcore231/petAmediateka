import { Bg } from "../Bg"
import { EpisodesSeries } from "../EpisodesSeries"
import { BadgeCard } from "../BadgeCard"

export interface MediaContent {
  _id: string
  __v: number
  type: 'movie' | 'series'
  seasons: Season[] | null
  data: {
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
    about: boolean
    ageRestriction: number
    dateRelease: string | 'N/A'
    genres: string[]
    actors: string[]
    directors: string[]
    country: string | 'N/A'
    production: string | 'N/A'
  }
  rating: {
    raitingAmediateka: number | 'N/A'
    ratingImdb: number | 'N/A'
    ratingKinopoisk: number | 'N/A'
  }
  actionsData: {
    favorites: string[] | []
    liked: string[] | []
    disliked: string[] | []
  }
  bg: Bg | null
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
