import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StateStatusResponse } from "../types/interfaces/InitialStatesSlice"

const initialState: StateStatusResponse = {
  status: null,
  error: null,
  loading: false
}

export const statusResponseSlice = createSlice({
  name: 'statusResponse',
  initialState,
  reducers: {

    setStatusResponse: (state, action: PayloadAction<StateStatusResponse>) => {
      state.status = action.payload.status
      state.error = action.payload.error
      state.loading = action.payload.loading
    },

    getStatusReponse: (state) => {
      return state
    },

    resetStatusResponse: (state) => {
      state.status = null
      state.error = null
      state.loading = false
    }
  },
})

export const statusResponseReducer = statusResponseSlice.reducer
export const { setStatusResponse, getStatusReponse, resetStatusResponse } = statusResponseSlice.actions
