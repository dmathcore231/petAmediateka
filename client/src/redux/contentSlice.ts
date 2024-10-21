import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { setStatusResponse } from "./statusResponseSlice"
import { requestContent } from "../services/content"
import { ResponseWithPayload } from "../types/interfaces/Response"
import { QueryParams } from "../types/QueryParams"
import { initialStateContent } from "../helpers/initStates"
import { Content } from "../types/interfaces/Content"

export const fetchContent = createAsyncThunk<ResponseWithPayload<Content>, QueryParams, { rejectValue: ResponseWithPayload<null>, dispatch: Dispatch }>('auth/fetchContent',
  async (queryParams: QueryParams, { dispatch }) => {
    try {
      const response = await requestContent(queryParams)
      dispatch(setStatusResponse({
        status: response.status,
        error: response.error,
        message: response.message
      }))
      return response
    } catch (error: unknown) {
      return error
    }
  })

export const contentSlice = createSlice({
  name: 'content',
  initialState: initialStateContent,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.mainSlider.loading = true
        state.mainSlider.error = null
      })
      .addCase(fetchContent.fulfilled, (state, action: PayloadAction<ResponseWithPayload<Content>>) => {
        state.mainSlider.loading = false
        state.mainSlider.error = null
        state.mainSlider.content = action.payload.value
      })
      .addCase(fetchContent.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        if (payload) {
          state.mainSlider.loading = false
          state.mainSlider.error = payload.error
          state.mainSlider.content = null
        }
      })
  }
})

export const contentReducer = contentSlice.reducer
