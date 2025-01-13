import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { requestSignUp, requestSignIn, requestLogout, requestRefreshUserData } from "../services/auth"
import { setStatusResponse } from "./statusResponseSlice"
import { setDataInLocalStorage } from "../helpers"
import { FetchAuthPayload } from "../types/interfaces/FetchPayloads"
import { ResponseWithoutPayload, ResponseWithPayload } from "../types/interfaces/Response"
import { initialStateAuth } from "../helpers/initStates"
import { AxiosError } from "axios"
import { UserData } from "../types/interfaces/User"

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

export const fetchSignIn = createAsyncThunk<ResponseWithPayload<UserData>, FormData, { rejectValue: ResponseWithPayload<null>, dispatch: Dispatch }>('auth/fetchSignIn',
  async (body: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await requestSignIn(body)
      dispatch(setStatusResponse({
        status: response.status,
        error: response.error,
        message: response.message
      }))
      return response
    } catch (error) {
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

export const fetchLogout = createAsyncThunk<ResponseWithoutPayload, void, { rejectValue: ResponseWithoutPayload, dispatch: Dispatch }>('auth/fetchLogout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await requestLogout()
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

export const fetchRefreshUserData = createAsyncThunk<ResponseWithPayload<UserData>, string, { rejectValue: ResponseWithPayload<null>, dispatch: Dispatch }>('auth/fetchRefreshUserData',
  async (token: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await requestRefreshUserData(token)
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

export interface SaveDataUserInLocalStorage {
  token: string
  userData: UserData
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // fetch sign up
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData | null>>) => {
        state.loading = false
        state.user = action.payload.value
        setDataInLocalStorage('userData', action.payload.value)
        if (action.payload.token) {
          setDataInLocalStorage('token', action.payload.token)
        }
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          state.loading = false
          state.user = null
        }
      })

      // fetch sign in
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
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
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          state.loading = false
          state.user = null
        }
      })

      // fetch logout
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLogout.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        state.loading = false
        state.user = action.payload.value

        setDataInLocalStorage('userData', null)
        setDataInLocalStorage('token', null)
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          state.loading = false
          state.user = null
        }
      })

      //fetch refresh user data
      .addCase(fetchRefreshUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRefreshUserData.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        state.loading = false
        state.user = action.payload.value
      })
      .addCase(fetchRefreshUserData.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          state.loading = false
          state.user = null
          setDataInLocalStorage('userData', null)
          setDataInLocalStorage('token', null)
        }
      })
  }
})

export const authReducer = authSlice.reducer
