import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestToggleFavorite, requestGetFavoriteList } from "./index"
import { ResponseWithPayload, ResponseWithoutPayload } from "../../types/interfaces/Response"
import { UserData } from "../../types/interfaces/User"
import { Content } from "../../types/interfaces/Content"

export const fetchMyFavorite = createAsyncThunk<ResponseWithPayload<UserData>, FormData, { rejectValue: ResponseWithPayload<null> }>('my/fetchMyFavorite',
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

export const fetchGetFavoriteList = createAsyncThunk<ResponseWithPayload<Content>, void, { rejectValue: ResponseWithPayload<null> }>('my/fetchGetFavoriteList',
  async (_, { rejectWithValue }) => {
    try {
      return await requestGetFavoriteList()

    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })
