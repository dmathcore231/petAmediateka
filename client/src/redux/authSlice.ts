import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit"
import { ResponseWithoutPayload, ResponseWithPayload } from "../types/interfaces/Response"
import { fetchSignIn, fetchSignUp, fetchLogout, fetchRefreshAccessToken } from "../services/authThunk"
import { UserData } from "../types/interfaces/User"
import { AuthState } from "../types/interfaces/InitialStatesSlice"
import { initialStateAuth } from "../helpers/initStates"

const isAuthPendingAction = (action: AnyAction) =>
  [
    fetchSignUp.pending.type,
    fetchSignIn.pending.type,
    fetchLogout.pending.type,
    fetchRefreshAccessToken.pending.type,
  ].includes(action.type)

const handleRejected = (state: AuthState, payload: ResponseWithPayload<null>): void => {
  const { error, message, status } = payload

  state.loading = false
  state.error = error
  state.message = message
  state.status = status
  state.token = null
}

const handlefulfilled = (state: AuthState, payload: ResponseWithPayload<UserData | null>): void => {
  const { error, message, status, token } = payload

  state.loading = false
  state.error = error
  state.message = message
  state.status = status

  if (token) {
    state.token = token
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
        handlefulfilled(state, action.payload)
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload)
        }
      })

      // fetch sign in
      .addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload)
      })
      .addCase(fetchSignIn.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload)
        }
      })

      // fetch logout
      .addCase(fetchLogout.fulfilled, (state, action: PayloadAction<ResponseWithoutPayload>) => {
        const { error, message, status } = action.payload

        state.loading = false
        state.error = error
        state.message = message
        state.status = status
        state.token = null
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          handleRejected(state, payload)
        }
      })

      //fetch refresh user data
      .addCase(fetchRefreshAccessToken.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload)
      })
      .addCase(fetchRefreshAccessToken.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          handleRejected(state, payload)
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
