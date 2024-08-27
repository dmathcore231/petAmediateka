import { AxiosError } from "axios"
import { client } from "../utils/client"
import { signInEndPoint } from "./endPoints"

export const requestSignUp = async (body: FormData) => {
  try {
    const { data } = await client.post(signInEndPoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
