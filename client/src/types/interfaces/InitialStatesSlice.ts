import { ErrorDataInResponse } from "../Error"
import { UserData } from "./User"
import { PlayerStatus } from "../PlayerStatus"

export interface StateStatusResponse {
  status: number | null
  error: ErrorDataInResponse | null
  message: string | null
}

export interface AuthState {
  loading: boolean
  user: UserData | null
}

export interface ContentState {
  loading: boolean
  content: unknown
}

export interface MediaPlayerState {
  loading: boolean
  isShow: boolean
  error: {
    number: number
    message: string
  } | null
  playerStatus: PlayerStatus
}
