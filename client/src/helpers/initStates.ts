import { AuthState, StateStatusResponse, ContentState, MediaPlayerState } from "../types/interfaces/InitialStatesSlice"
import { ContentTypeEnum } from "../types/interfaces/Content"

export const initialStateAuth: AuthState = {
  loading: false,
  user: null
}

export const initialStateStatusResponse: StateStatusResponse = {
  status: null,
  error: null,
  message: null
}

export const initialStateContent: ContentState = {
  [ContentTypeEnum.MainSlider]: {
    loading: false, error: null, content: null
  },
  [ContentTypeEnum.WatchingNow]: {
    loading: false, error: null, content: null
  },
  [ContentTypeEnum.Banner]: {
    loading: false, error: null, content: null
  },
  [ContentTypeEnum.Series]: {
    loading: false, error: null, content: null
  },
  [ContentTypeEnum.NewRelease]: {
    loading: false, error: null, content: null
  },
  [ContentTypeEnum.PromoLine]: {
    loading: false, error: null, content: null
  },
  [ContentTypeEnum.CoverPromo]: {
    loading: false, error: null, content: null
  },
}

export const initialStateMediaPlayer: MediaPlayerState = {
  loading: false,
  isShow: false,
  error: null,
  src: null,
  playerStatus: {
    status: null,
    time: {
      current: 0,
      left: 0,
      total: 0
    },
    volume: {
      isMuted: false,
      value: 100,
      valueWithMuted: 100
    },
    fullScreen: false,
    userInactive: false
  },
  title: null
}
