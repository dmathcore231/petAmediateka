import { CardData } from "./Card"

export interface linksPopularGenresState {
  serials: {
    value: boolean
    items: Array<CardData>
  },
  films: {
    value: boolean
    items: Array<CardData>
  }
}
