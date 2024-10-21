import { Series } from "./Series"

export type Content = {
  _id: string
  __v: number
  type: string
  data: Array<Series> | null
}
