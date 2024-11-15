import { ContentTypeEnum } from "./interfaces/Content"

export type QueryParams = {
  type: ContentTypeEnum
  limit?: number
  offset?: number
  getAll?: boolean
  id?: string
}
