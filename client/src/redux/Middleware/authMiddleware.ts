import { Middleware } from "@reduxjs/toolkit"
import { client } from "../../utils/client"

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  const state = store.getState()
  const token = state.auth.token

  if (token) {
    client.defaults.headers.Authorization = `Bearer ${token}`
  } else {
    delete client.defaults.headers.Authorization
  }

  return result
}
