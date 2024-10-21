import { Document } from "mongoose"
import { Bg } from "../Bg"

export interface Movie extends Document {
  data: {
    title: string
    originalTitle?: string
    discription: string
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
  bg: Bg
  trailer: {
    quality360: string | null
    quality720: string | null
    quality1080: string | null
    quality2160: string | null
    img: string
  } | null
  titleImg: string
}
