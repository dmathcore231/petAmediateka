import { createSlice, createAsyncThunk, AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit"
import { requestSignUp } from "../services/auth"
import { setStatusResponse } from "./statusResponseSlice"

const initialState = {
  loading: false,
  user: null
}

export const fetchSignUpEmail = createAsyncThunk<any, FormData, { rejectValue: any }>('auth/fetchSignUpEma',
  async (body: FormData) => {
    try {
      return await requestSignUp(body)
    } catch (error) {
      return error
    }
  })


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpEmail.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignUpEmail.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload

      })
      .addCase(fetchSignUpEmail.rejected, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
  }
})

