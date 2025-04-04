
export interface MetaDataProps {
  rating: {
    amediateka: number | string
    imdb: number | string
    kinopoisk?: number | string
  }
  dateRelease: number | string
  ageRestriction: number | string
  genres: Array<string> | string
}
