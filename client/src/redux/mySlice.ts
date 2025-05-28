import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { fetchMyFavorite, fetchGetFavoriteList } from '../services/my/myThunk'
import { fetchSignIn, fetchRefreshAccessToken, fetchLogout } from '../services/auth/authThunk'
import { initialStateMy } from '../helpers/initStates'
import { ResponseWithPayload, } from '../types/interfaces/Response'
import { UserData } from '../types/interfaces/User'
import { MyState } from '../types/interfaces/InitialStatesSlice'
import { ResponseWithoutPayload } from '../types/interfaces/Response'
import { Content } from '../types/interfaces/Content'

const handleRejected = (state: MyState, payload: ResponseWithPayload<null>): void => {
  const { error, message, status } = payload

  state.loading = false
  state.error = error
  state.message = message
  state.status = status
  state.user = null
  state.initializedData = true
}

const handlefulfilled = (state: MyState, payload: ResponseWithPayload<UserData | null>): void => {
  const { error, message, status, value } = payload

  state.loading = false
  state.error = error
  state.message = message
  state.status = status
  state.user = value
}

const isAuthPendingAction = (action: AnyAction) =>
  [
    fetchMyFavorite.pending.type,
  ].includes(action.type)

export const mySlice = createSlice({
  name: 'my',
  initialState: initialStateMy,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // toggle favorite
      .addCase(fetchMyFavorite.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload)
      })

      .addCase(fetchMyFavorite.rejected, (state, action) => {
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

      //fetch refresh user data
      .addCase(fetchRefreshAccessToken.fulfilled, (state, action: PayloadAction<ResponseWithPayload<UserData>>) => {
        handlefulfilled(state, action.payload)
        state.initializedData = true
      })
      .addCase(fetchRefreshAccessToken.rejected, (state, action) => {
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
        state.user = null
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        const payload = action.payload as ResponseWithoutPayload
        if (payload) {
          handleRejected(state, payload)
        }
      })

      // fetch get favorite list
      .addCase(fetchGetFavoriteList.fulfilled, (state, action: PayloadAction<ResponseWithPayload<Content>>) => {
        const { error, message, status, value } = action.payload

        state.loading = false
        state.error = error
        state.message = message
        state.status = status
        state.favoriteList = value
      })
      .addCase(fetchGetFavoriteList.rejected, (state, action) => {
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
  },
})

export const myReducer = mySlice.reducer
