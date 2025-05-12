import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import {
  requestSignUp,
  requestSignIn,
  requestLogout,
  requestRefreshUserData,
  requestToggleFavorite
} from "../services/auth"
import { ResponseWithoutPayload, ResponseWithPayload } from "../types/interfaces/Response"
import { UserData } from "../types/interfaces/User"
import { AuthState } from "../types/interfaces/InitialStatesSlice"
import { initialStateAuth } from "../helpers/initStates"
import { setDataInLocalStorage } from "../helpers"

export const fetchSignUp = createAsyncThunk<ResponseWithoutPayload, FormData, { rejectValue: ResponseWithoutPayload }>('auth/fetchSignUpEmail',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestSignUp(body)

    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })

export const fetchSignIn = createAsyncThunk<ResponseWithPayload<UserData>, FormData, { rejectValue: ResponseWithPayload<null> }>('auth/fetchSignIn',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestSignIn(body)

    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })

export const fetchLogout = createAsyncThunk<ResponseWithoutPayload, void, { rejectValue: ResponseWithoutPayload }>('auth/fetchLogout',
  async (_, { rejectWithValue }) => {
    try {
      return await requestLogout()

    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })

export const fetchRefreshUserData = createAsyncThunk<ResponseWithPayload<UserData>, string, { rejectValue: ResponseWithPayload<null> }>('auth/fetchRefreshUserData',
  async (token: string, { rejectWithValue }) => {
    try {
      return await requestRefreshUserData(token)

    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })

export const fetchToggleFavorite = createAsyncThunk<ResponseWithPayload<UserData>, FormData, { rejectValue: ResponseWithPayload<null> }>('my/addFavorite',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestToggleFavorite(body)

    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })

const isAuthPendingAction = (action: AnyAction) =>
  [
    fetchSignUp.pending.type,
    fetchSignIn.pending.type,
    fetchLogout.pending.type,
    fetchRefreshUserData.pending.type,
    fetchToggleFavorite.pending.type,
  ].includes(action.type)

const handleRejected = (state: AuthState, payload: ResponseWithPayload<null>, cacheLocalStorga: boolean): void => {
  const { error, message, status } = payload

  state.loading = false
  state.error = error
  state.message = message
  state.status = status
  state.user = null

  if (cacheLocalStorga) {
    setDataInLocalStorage('userData', null)
    setDataInLocalStorage('token', null)
  }
}

const handlefulfilled = (state: AuthState, payload: ResponseWithPayload<UserData | null>, cacheLocalStorga: boolean): void => {
  const { error, message, status, value, token } = payload

  state.loading = false
  state.error = error
  state.message = message
  state.status = status
  state.user = value

  if (cacheLocalStorga) {
    setDataInLocalStorage('userData', value)

    if (token) {
      setDataInLocalStorage('token', token)
    }
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // fetch sign up
      .addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData | null>>) => {
        handlefulfilled(state, action.payload, true)
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload, false)
        }
      })

      // fetch sign in
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload, true)
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload, false)
        }
      })

      // fetch logout
      .addCase(fetchLogout.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        const { error, message, status, value } = action.payload

        state.loading = false
        state.error = error
        state.message = message
        state.status = status
        state.user = value

        setDataInLocalStorage('userData', null)
        setDataInLocalStorage('token', null)
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          handleRejected(state, payload, true)
        }
      })

      //fetch refresh user data
      .addCase(fetchRefreshUserData.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload, false)
      })
      .addCase(fetchRefreshUserData.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload, true)
        }
      })

      //fetch toggle favorite content
      .addCase(fetchToggleFavorite.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload, true)
      })

      .addCase(fetchToggleFavorite.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload, false)
        }
      })

    builder.addMatcher(isAuthPendingAction, (state) => {
      state.loading = true
      state.status = null
      state.error = null
      state.message = null
    })
  }
})

export const authReducer = authSlice.reducer
