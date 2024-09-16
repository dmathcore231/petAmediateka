import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from "@reduxjs/toolkit"
import { initialStateContent } from "../helpers/initStates"

export const contentSlice = createSlice({
  name: 'content',
  initialState: initialStateContent,
  reducers: {

  }
})

export const contentReducer = contentSlice.reducer
