import { ErrorMain } from "../Error"
import { User } from "../interface/User"

export interface ResponseStatusData {
  status: number
  error: Omit<ErrorMain, 'status'> | null
}

export interface ResponseWithoutPayload extends ResponseStatusData {
  message: string
  value: null
}

export interface ResponseWithUPayload extends ResponseStatusData {
  message: string
  value: Omit<User, 'password' | '__v' | 'userCard'>
}
