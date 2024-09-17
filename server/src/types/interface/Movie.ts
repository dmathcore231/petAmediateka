import { Document } from "mongoose";

export interface Movie extends Document {
  data: {
    title: string
    originalTitle?: string
    discription: string
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
  }
  actionsData: {
    favorites: string[] | []
    liked: string[] | []
    disliked: string[] | []
  }
  imgBg: string
  trailer: string | null
  titleImg: string
}
