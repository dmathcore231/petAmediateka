import { Ratings } from "../Ratings"

export interface MetaDataProps {
  rating: Ratings
  dateRelease: number | string
  ageRestriction: number | string
  genres: Array<string> | string
}
