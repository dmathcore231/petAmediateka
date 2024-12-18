import { AxiosError } from "axios"
import { client } from "../utils/client"
import { signUpEndPoint, signInEndPoint, logoutEndPoint, refreshAccessTokenEndPoint } from "./endPoints"

export const requestSignUp = async (body: FormData) => {
  try {
    const { data } = await client.post(signUpEndPoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })

    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestSignIn = async (body: FormData) => {
  try {
    const { data } = await client.post(signInEndPoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })

    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestLogout = async () => {
  try {
    const { data } = await client.get(logoutEndPoint, {
      withCredentials: true
    })

    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestRefreshUserData = async (token: string) => {
  try {
    const { data } = await client.post(refreshAccessTokenEndPoint, token, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })

    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
