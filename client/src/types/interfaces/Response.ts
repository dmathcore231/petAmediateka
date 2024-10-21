import { ErrorDataInResponse } from "../Error"
import { PayloadValueType } from "../PayloadValueType"

export interface ResponseStatusData {
  status: number
  error: ErrorDataInResponse | null
}

export interface ResponseWithoutPayload extends ResponseStatusData {
  message: string
  value: null
}

export interface ResponseWithPayload<T extends PayloadValueType> extends ResponseStatusData {
  message: string
  value: T
  token?: string
}
