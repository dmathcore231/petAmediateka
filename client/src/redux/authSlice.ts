import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { requestSignUp } from "../services/auth"
import { setStatusResponse } from "./statusResponseSlice"
import { ResponseWithoutPayload, ResponseWithUPayload } from "../types/interfaces/Response"
import { initialStateAuth } from "../helpers/initStates"
import { AxiosError } from "axios"

export const fetchSignUpEmail = createAsyncThunk<ResponseWithoutPayload, FormData, { rejectValue: ResponseWithoutPayload, dispatch: Dispatch }>('auth/fetchSignUpEmail',
  async (body: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await requestSignUp(body)
      dispatch(setStatusResponse({
        status: response.status,
        error: response.error,
        message: response.message
      }))

      return response
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        dispatch(setStatusResponse({
          status: data.status,
          error: data.error,
          message: data.message
        }))
        return rejectWithValue(data)
      }
    }
  })

export const fetchSignUp = createAsyncThunk<ResponseWithUPayload, FormData, { rejectValue: ResponseWithUPayload, dispatch: Dispatch }>('auth/fetchSignUp',
  async (body: FormData, { dispatch }) => {
    try {
      const response = await requestSignUp(body)
      dispatch(setStatusResponse({
        status: response.status,
        error: response.error,
        message: response.message
      }))
      return response
    } catch (error) {
      return error
    }
  })

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetch sign up email
      .addCase(fetchSignUpEmail.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignUpEmail.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        state.loading = false
      })
      .addCase(fetchSignUpEmail.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.loading = false
          state.user = null
        }
      })

      // fetch sign up
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<ResponseWithUPayload>) => {
        state.loading = false
        state.user = action.payload.value
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        const payload = action.payload as ResponseWithUPayload
        if (payload) {
          state.loading = false
          state.user = null
        }
      })
  }
})

export const authReducer = authSlice.reducer
