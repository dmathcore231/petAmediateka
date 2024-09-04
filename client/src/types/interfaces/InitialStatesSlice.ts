import { ErrorDataInResponse } from "../Error"
import { UserData } from "./User"

export interface StateStatusResponse {
  status: number | null
  error: ErrorDataInResponse | null
  message: string | null
}

export interface AuthState {
  loading: boolean
  user: UserData | null
}
