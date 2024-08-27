import { configureStore } from "@reduxjs/toolkit"
import { statusResponseReducer } from "./statusResponseSlice"

export const store = configureStore({
  reducer: {
    statusResponse: statusResponseReducer
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
