import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { contentReducer } from "./contentSlice"
import { mediaPlayerReducer } from "./MediaPlayerSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    mediaPlayer: mediaPlayerReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
