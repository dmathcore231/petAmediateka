import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { requestSignUp, requestSignIn } from "../services/auth"
import { setStatusResponse } from "./statusResponseSlice"
import { setDataInLocalStorage } from "../helpers"
import { FetchAuthPayload } from "../types/interfaces/FetchPayloads"
import { ResponseWithoutPayload, ResponseWithPayload } from "../types/interfaces/Response"
import { initialStateAuth } from "../helpers/initStates"
import { AxiosError } from "axios"

export const fetchSignUp = createAsyncThunk<ResponseWithoutPayload, FetchAuthPayload, { rejectValue: ResponseWithoutPayload, dispatch: Dispatch }>('auth/fetchSignUpEmail',
  async ({ body, typeRequest }, { dispatch, rejectWithValue }) => {
    try {
      let response
      if (typeRequest === 'authSignUp') {
        response = await requestSignUp(body)
      } else {
        response = await requestSignIn(body)
      }

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

export const fetchSignIn = createAsyncThunk<ResponseWithPayload, FormData, { rejectValue: ResponseWithPayload, dispatch: Dispatch }>('auth/fetchSignIn',
  async (body: FormData, { dispatch }) => {
    try {
      const response = await requestSignIn(body)
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
      // fetch sign up
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = true

      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<ResponseWithPayload>) => {
        state.loading = false
        state.user = action.payload.value
        setDataInLocalStorage('userData', action.payload.value)
        if (action.payload.token) {
          setDataInLocalStorage('token', action.payload.token)
        }
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload
        if (payload) {
          state.loading = false
          state.user = null
        }
      })

      // fetch sign in
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<ResponseWithPayload>) => {
        state.loading = false
        state.user = action.payload.value
        setDataInLocalStorage('userData', action.payload.value)
        if (action.payload.token) {
          setDataInLocalStorage('token', action.payload.token)
        } else {
          setDataInLocalStorage('token', null)
        }
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload
        if (payload) {
          state.loading = false
          state.user = null
        }
      })
  }
})

export const authReducer = authSlice.reducer
