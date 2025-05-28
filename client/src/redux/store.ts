import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { contentReducer } from "./contentSlice"
import { mediaPlayerReducer } from "./MediaPlayerSlice"
import { myReducer } from "./mySlice"
import { authMiddleware } from "./Middleware/authMiddleware"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    mediaPlayer: mediaPlayerReducer,
    my: myReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
