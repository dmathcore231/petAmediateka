import { Document } from "mongoose"
import { Bg } from "../Bg"
import { EpisodesSeries } from "../EpisodesSeries"
import { Badge } from "../Badge"
import { TrailerSrc } from "../TrailerSrc"

export interface MediaContent extends Document {
  type: 'movie' | 'series'
  seasons: Season[] | null
  data: {
    title: {
      value: string
      originalTitle: string
      linkTitle: string
    }
    badge: Badge | null
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
  rating: {
    raitingAmediateka: number | 'N/A'
    ratingImdb: number | 'N/A'
    ratingKinopoisk: number | 'N/A'
  }
  actionsData: {
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
