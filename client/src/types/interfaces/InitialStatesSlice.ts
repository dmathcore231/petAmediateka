import { ErrorDataInResponse } from "../Error"
import { User } from "./User"

export interface StateStatusResponse {
  status: number | null
  error: ErrorDataInResponse | null
  message: string | null
}

export interface AuthState {
  loading: boolean
  user: User | null
}
