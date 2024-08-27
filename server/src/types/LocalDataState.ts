import { User } from '../types/interface/User'

export type LocalDataState = {
  user: User | null
  token: string | null
  error: string | null
}
