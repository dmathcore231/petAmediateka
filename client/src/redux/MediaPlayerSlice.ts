import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialStateMediaPlayer } from "../helpers/initStates"
import { PlayerStatus } from "../types/PlayerStatus"

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

    getSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload
    },

    setVideoQuality: (state, action: PayloadAction<'1080p' | '720p' | '480p' | '360p'>) => {
      state.videoQuality = action.payload
    }
  }
})

export const mediaPlayerReducer = mediaPlayerSlice.reducer
export const { updatePlayerStatus, toggleShow, resetPlayerStatus, getSrc, setVideoQuality } = mediaPlayerSlice.actions
