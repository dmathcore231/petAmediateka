
export interface MetaDataProps {
  rating: {
    raitingAmediateka: number | string
    ratingImdb: number | string
    ratingKinopoisk?: number | string
  }
  dateRelease: number | string
  ageRestriction: number | string
  genres: Array<string> | string
}
