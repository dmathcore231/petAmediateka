import { MediaContent } from "../interfaces/MediaContent"

export type Content = {
  _id: string
  __v: number
  type: string
  data: Array<MediaContent> | null
}
