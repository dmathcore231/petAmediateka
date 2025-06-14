import { ErrorDataInResponse } from "../Error"
import { UserData } from "./User"
import { PlayerStatus } from "../PlayerStatus"
import { Content } from "./Content"
import { MediaContent } from "./MediaContent"
import { ContentTypeEnum } from "./Content"
import { SrcMediaPlayer } from "../SrcMediaPlayer"
import { CardData } from "../Card"

export type ContentTypes = Content | MediaContent | null

export interface StateStatusResponse {
  loading: boolean
  status: number | null
  error: ErrorDataInResponse | null
  message: string | null
}

export type ContentState = Record<ContentTypeEnum, ContentStateItem<ContentTypes>>

export interface ContentStateItem<T extends ContentTypes> extends StateStatusResponse {
  content: T
}

export interface AuthState extends StateStatusResponse {
  token: string | null
}

export interface MyState extends StateStatusResponse {
  user: UserData | null
  initializedData: boolean
  favoriteList: CardData[] | null
}

export interface MediaPlayerState {
  loading: boolean
  isShow: boolean
  error: {
    number: number
    message: string
  } | null
  src: SrcMediaPlayer | null
  playerStatus: PlayerStatus
  title: string | null
}
