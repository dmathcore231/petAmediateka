import { ErrorDataInResponse } from "../Error"

export interface StateStatusResponse {
  status: number | null
  error: ErrorDataInResponse | null
  loading: boolean
}

export interface AuthState {
  loading: boolean
  user: object | null
}
