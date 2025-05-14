import { AuthState, ContentState, MediaPlayerState, StateStatusResponse, MyState } from "../types/interfaces/InitialStatesSlice"
import { ContentTypeEnum } from "../types/interfaces/Content"

const defaultState: StateStatusResponse = {
  loading: false,
  status: null,
  error: null,
  message: null,
}

export const initialStateAuth: AuthState = {
  ...defaultState,
  token: null,
}

export const initialStateMy: MyState = {
  ...defaultState,
  user: null,
  initializedData: false
}

export const initialStateContent: ContentState = {
  [ContentTypeEnum.MainSlider]: {
    ...defaultState,
    content: null
  },
  [ContentTypeEnum.WatchingNow]: {
    ...defaultState,
    content: null
  },
  [ContentTypeEnum.Banner]: {
    ...defaultState,
    content: null
  },
  [ContentTypeEnum.Series]: {
    ...defaultState,
    content: null
  },
  [ContentTypeEnum.NewRelease]: {
    ...defaultState,
    content: null
  },
  [ContentTypeEnum.PromoLine]: {
    ...defaultState,
    content: null
  },
  [ContentTypeEnum.CoverPromo]: {
    ...defaultState,
    content: null
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
