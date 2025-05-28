import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestSignUp, requestSignIn, requestLogout, requestRefreshAccessToken } from "./index"
import { ResponseWithoutPayload, ResponseWithPayload } from "../../types/interfaces/Response"
import { UserData } from "../../types/interfaces/User"

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

export const fetchRefreshAccessToken = createAsyncThunk<ResponseWithPayload<UserData>, void, { rejectValue: ResponseWithPayload<null> }>('auth/fetchRefreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      return await requestRefreshAccessToken()

    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const { data } = error.response as { data: ResponseWithoutPayload }

        return rejectWithValue(data)
      }
    }
  })
