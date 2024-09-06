import { ErrorDataInResponse } from "../Error"
import { UserData } from "./User"

export interface ResponseStatusData {
  status: number
  error: ErrorDataInResponse | null
}

export interface ResponseWithoutPayload extends ResponseStatusData {
  message: string
  value: null
}

export interface ResponseWithPayload extends ResponseStatusData {
  message: string
  value: UserData | null
  token? : string
}
