import { ErrorDataInResponse } from "../Error"
import { UserData } from "./User"
import { PlayerStatus } from "../PlayerStatus"
import { VideoQuality } from "../VideoQuality"
import { Content } from "./Content"
import { MediaContent } from "./MediaContent"
import { ContentTypeEnum } from "./Content"
import { SrcMediaPlaer } from "../SrcMediaPlaer"

export type ContentTypes = Content | MediaContent | null

export type ContentStateItem<T extends ContentTypes> = {
  loading: boolean
  error: ErrorDataInResponse | null
  content: T
}

export type ContentState = Record<ContentTypeEnum, ContentStateItem<ContentTypes>>

export interface StateStatusResponse {
  status: number | null
  error: ErrorDataInResponse | null
  message: string | null
}

export interface AuthState {
  loading: boolean
  user: UserData | null
}



export interface MediaPlayerState {
  loading: boolean
  isShow: boolean
  error: {
    number: number
    message: string
  } | null
  src: SrcMediaPlaer | null
  playerStatus: PlayerStatus
  title: string | null
}
