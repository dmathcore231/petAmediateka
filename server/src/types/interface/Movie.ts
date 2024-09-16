import { Document } from "mongoose";

export interface Movie extends Document {
  movieData: {
    title: string
    discription: string
    ageRestriction: number
    dateRelease: string | 'N/A'
    genres: string[]
    actors: string[]
    directors: string[]
    country: string | 'N/A'
  }
  movieRating: {
    raitingAmediateka: number | 'N/A'
    ratingImdb: number | 'N/A'
  }
  movieActionsData: {
    favorites: string[] | []
    liked: string[] | []
    disliked: string[] | []
  }
  imgBg: string
  trailer: string | null
}
