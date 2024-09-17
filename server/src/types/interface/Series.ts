import { Movie } from "./Movie";

export interface Series extends Movie {
  seasons: Seasons
}

export type Seasons = {
  numberOfSeasons: number
  episodes: EpdisodesSeries[]
  imgBg: string
  discription?: string
}

export type EpdisodesSeries = {
  link: string
  episodeNumber: number
  seasonsNumber: number
  img: string
  title?: string
}
