import { Ratings } from "../Ratings"

export interface MetaDataProps {
  type: 'mini' | 'full'
  rating: Ratings
  dateRelease: number | string
  ageRestriction: number | string
  genres: string[]
  description: string
  directors: string[]
  actors: string[]
  country: string
}
