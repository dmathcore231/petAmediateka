import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateStatusResponse } from "../types/interfaces/InitialStatesSlice"
import { initialStateStatusResponse } from "../helpers/initStates"

export const statusResponseSlice = createSlice({
  name: 'statusResponse',
  initialState: initialStateStatusResponse,
  reducers: {

    setStatusResponse: (state, action: PayloadAction<StateStatusResponse>) => {
      state.status = action.payload.status
      state.error = action.payload.error
      state.message = action.payload.message
    },

    getStatusReponse: (state) => {
      return state
    },

    resetStatusResponse: (state) => {
      state.status = null
      state.error = null
      state.message = null
    }
  },
})

export const statusResponseReducer = statusResponseSlice.reducer
export const { setStatusResponse, getStatusReponse, resetStatusResponse } = statusResponseSlice.actions
