import { QueryParameterContentTypeEnum } from "./QueryParameters"

export function isQueryParameterContentType(value: string): value is QueryParameterContentTypeEnum {
  return Object.values(QueryParameterContentTypeEnum).includes(value as QueryParameterContentTypeEnum)
}
