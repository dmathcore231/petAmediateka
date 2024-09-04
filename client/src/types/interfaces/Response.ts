import { ErrorDataInResponse } from "../Error"
import { User } from "./User"

export interface ResponseStatusData {
  status: number
  error: ErrorDataInResponse | null
}

export interface ResponseWithoutPayload extends ResponseStatusData {
  message: string
  value: null
}

export interface ResponseWithUPayload extends ResponseStatusData {
  message: string
  value: User
}
