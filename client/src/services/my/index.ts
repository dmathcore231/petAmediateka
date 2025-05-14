import { AxiosError } from 'axios'
import { client } from '../../utils/client'
import { addFavoriteEndPoint, getFavoriteListEndPoint } from '../endPoints'

export const requestToggleFavorite = async (body: FormData): Promise<any> => {
  try {
    const { data } = await client.post(addFavoriteEndPoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    })

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error
    }
  }
}

export const requestGetFavoriteList = async (): Promise<any> => {
  try {
    const { data } = await client.get(getFavoriteListEndPoint, {
      withCredentials: true
    })

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error
    }
  }
}

