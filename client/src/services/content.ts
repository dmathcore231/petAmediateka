import { AxiosError, AxiosResponse } from "axios"
import { client } from "../utils/client"
import { contentEndPoint } from "./endPoints"
import { QueryParams } from "../types/QueryParams"
import { ResponseWithPayload } from "../types/interfaces/Response"
import { Content } from "../types/interfaces/Content"

export const requestContent = async (query: QueryParams): Promise<ResponseWithPayload<Content>> => {
  try {
    const { data }: AxiosResponse<ResponseWithPayload<Content>> = await client.get(contentEndPoint, {
      params: query,
      withCredentials: true
    })

    return data
  } catch (error: unknown) {
    const err = error as AxiosError
    throw err
  }
}
