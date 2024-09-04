import { User } from '../types/interface/User'
import { ErrorMain } from './Error'

export type LocalDataState = {
  user: User | null
  token: string | null
  error: ErrorMain | null
}
