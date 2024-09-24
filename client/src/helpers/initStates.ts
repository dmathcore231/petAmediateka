import { AuthState, StateStatusResponse, ContentState, MediaPlayerState } from "../types/interfaces/InitialStatesSlice"

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
  loading: false,
  content: null
}

export const initialStateMediaPlayer: MediaPlayerState = {
  loading: false,
  isShow: false,
  error: null,
  playerStatus: {
    loading: false,
    status: null,
    time: {
      current: 0,
      left: 0,
      total: 0
    },
    volume: {
      isMuted: false,
      value: 1
    }
  }
}
