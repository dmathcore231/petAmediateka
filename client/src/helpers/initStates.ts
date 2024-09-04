import { AuthState, StateStatusResponse } from "../types/interfaces/InitialStatesSlice"

export const initialStateAuth: AuthState = {
  loading: false,
  user: null
}

export const initialStateStatusResponse: StateStatusResponse = {
  status: null,
  error: null,
  message: null
}
