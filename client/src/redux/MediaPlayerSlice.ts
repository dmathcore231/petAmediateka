import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialStateMediaPlayer } from "../helpers/initStates"
import { PlayerStatus } from "../types/PlayerStatus"
import { SrcMediaPlayer } from "../types/SrcMediaPlayer"
import { VideoQuality } from "../types/VideoQuality"

export const mediaPlayerSlice = createSlice({
  name: 'mediaPlayer',
  initialState: initialStateMediaPlayer,
  reducers: {

    toggleShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload
    },

    updatePlayerStatus: (state, action: PayloadAction<PlayerStatus>) => {
      state.playerStatus = action.payload
    },

    resetPlayerStatus: (state) => {
      state.playerStatus = initialStateMediaPlayer.playerStatus
    },

    setSrc: (state, action: PayloadAction<SrcMediaPlayer>) => {
      state.src = action.payload
    },

    setCurrentSrc: (state, action: PayloadAction<{ type: VideoQuality, value: string }>) => {
      if (state.src) {
        state.src = {
          ...state.src,
          _current: action.payload
        }
      }
    },

    setError: (state, action: PayloadAction<{ number: number, message: string } | null>) => {
      state.error = action.payload
    },

    setTitle: (state, action: PayloadAction<string | null>) => {
      state.title = action.payload
    }
  }
})

export const mediaPlayerReducer = mediaPlayerSlice.reducer
export const { updatePlayerStatus, toggleShow, resetPlayerStatus, setSrc, setError, setTitle, setCurrentSrc } = mediaPlayerSlice.actions
