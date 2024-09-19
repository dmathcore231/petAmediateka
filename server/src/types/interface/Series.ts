import { Movie } from "./Movie";

export interface Series extends Movie {
  seasons: Season[]
}

export interface Season {
  numberOfSeasons: number
  episodes: EpisodesSeries[]
  imgBg: string
  discription?: string
}

export type EpisodesSeries = {
  link: string
  episodeNumber: number
  img: string
  title?: string
}
