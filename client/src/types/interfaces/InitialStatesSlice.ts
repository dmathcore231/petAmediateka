import { ErrorDataInResponse } from "../Error"
import { UserData } from "./User"
import { PlayerStatus } from "../PlayerStatus"
import { VideoQuality } from "../VideoQuality"
import { Series } from "./Series"
import { Content } from "./Content"

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
  mainSlider: {
    loading: boolean
    error: ErrorDataInResponse | null
    content: Content | null
  }
}

export interface MediaPlayerState {
  loading: boolean
  isShow: boolean
  error: {
    number: number
    message: string
  } | null
  src: string | null
  videoQuality: VideoQuality
  playerStatus: PlayerStatus
}
