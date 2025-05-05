import { IErrorMainOptions } from "../IErrorMainOptions"
import { User } from "../interface/User"
import { Content } from "./Content"
import { MediaContent } from "./MediaContent"

export interface ResponseStatusData {
  status: number
  error: Omit<IErrorMainOptions, 'status'> | null
}

export interface ResponseWithoutPayload extends ResponseStatusData {
  message: string
  value: null
}

export interface ResponseWithPayload<T
  extends MediaContent | Content | Omit<User, 'password' | '__v' | 'userCard'>>
  extends ResponseStatusData {
  message: string
  value: T
  token?: string | null
}
