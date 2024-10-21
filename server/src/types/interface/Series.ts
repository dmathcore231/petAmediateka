import { Movie } from "./Movie"

export interface Series extends Movie {
  seasons: Season[]
}

export interface Season {
  numberOfSeasons: number
  episodes: EpisodesSeries[]
}

export type EpisodesSeries = {
  link: string
  episodeNumber: number
  img: string
  title?: string
}
