import { AxiosError } from "axios"
import { client } from "../utils/client"
import { contentEndPoint } from "./endPoints"
import { QueryParams } from "../types/QueryParams"

export const requestContent = async (query: QueryParams) => {
  try {
    const { data } = await client.get(contentEndPoint, {
      params: query,
      withCredentials: true
    })

    return data
  } catch (error: unknown) {
    const err = error as AxiosError
    throw err
  }
}
