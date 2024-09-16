import { configureStore } from "@reduxjs/toolkit"
import { statusResponseReducer } from "./statusResponseSlice"
import { authReducer } from "./authSlice"
import { contentReducer } from "./contentSlice"

export const store = configureStore({
  reducer: {
    statusResponse: statusResponseReducer,
    auth: authReducer,
    content: contentReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
