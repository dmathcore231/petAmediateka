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

    resetStateMediaPlayer: (state) => {
      state = initialStateMediaPlayer
    }
  }
})

export const mediaPlayerReducer = mediaPlayerSlice.reducer
export const { updatePlayerStatus, toggleShow, resetStateMediaPlayer } = mediaPlayerSlice.actions