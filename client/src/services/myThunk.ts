import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestToggleFavorite } from "./auth"
import { ResponseWithPayload, ResponseWithoutPayload } from "../types/interfaces/Response"
import { UserData } from "../types/interfaces/User"

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
