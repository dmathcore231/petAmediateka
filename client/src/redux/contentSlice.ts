import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { setStatusResponse } from "./statusResponseSlice"
import { requestContent } from "../services/content"
import { ResponseWithPayload, ResponseWithoutPayload } from "../types/interfaces/Response"
import { QueryParams } from "../types/QueryParams"
import { Content, ContentTypeEnum } from "../types/interfaces/Content"
import { MediaContent } from "../types/interfaces/MediaContent"
import { initialStateContent } from "../helpers/initStates"


export const fetchContent = createAsyncThunk<ResponseWithPayload<Content>, QueryParams, { rejectValue: ResponseWithoutPayload, dispatch: Dispatch }>('auth/fetchContent',
  async (queryParams: QueryParams, { dispatch, rejectWithValue }) => {
    try {
      const response = await requestContent(queryParams)
      dispatch(setStatusResponse({
        status: response.status,
        error: response.error,
        message: response.message
      }))
      return response
    } catch (error: unknown) {

      return rejectWithValue({
        status: 500,
        error: {
          numberError: 500,
          message: "Internal Server Error",
          value: queryParams.type
        },
        message: "Internal Server Error",
        value: null
      })
    }
  })

export const contentSlice = createSlice({
  name: 'content',
  initialState: initialStateContent,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state, action) => {
        const typeContent = action.meta.arg.type as ContentTypeEnum

        state[typeContent].loading = true
        state[typeContent].error = null
        state[typeContent].content = null
      })
      .addCase(fetchContent.fulfilled, (state, action: PayloadAction<ResponseWithPayload<Content | MediaContent>>) => {
        const typeContent = action.payload.value.type as ContentTypeEnum

        if (!typeContent && action.payload.value.type === 'series') {
          const payloadValue = action.payload.value as MediaContent

          state.series.loading = false
          state.series.error = null
          state.series.content = payloadValue
        } else {
          state[typeContent].loading = false
          state[typeContent].error = null
          state[typeContent].content = action.payload.value
        }
      })
      .addCase(fetchContent.rejected, (state, action) => {
        const payload = action.payload as ResponseWithPayload<null>
        const typeContent = action.meta.arg.type as ContentTypeEnum

        if (payload) {
          state[typeContent].loading = false
          state[typeContent].error = payload.error
          state[typeContent].content = null
        }
      })
  }
})

export const contentReducer = contentSlice.reducer
