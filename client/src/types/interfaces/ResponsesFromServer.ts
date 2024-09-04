import { ErrorDataInResponse } from "../Error"

export interface ResponseStatusData {
  status: number
  error: ErrorDataInResponse
}

export interface ResponseWithoutPayload extends ResponseStatusData {
  message: string
  value: null
}
