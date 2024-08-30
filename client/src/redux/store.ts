import { configureStore } from "@reduxjs/toolkit"
import { statusResponseReducer } from "./statusResponseSlice"
import { authReducer } from "./authSlice"

export const store = configureStore({
  reducer: {
    statusResponse: statusResponseReducer,
    auth: authReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
