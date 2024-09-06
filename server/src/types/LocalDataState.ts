import { User } from '../types/interface/User'
import { ErrorMain } from './Error'
import { TokenState } from './Token'

export type LocalDataState = {
  user: User | null
  token: TokenState | null
  error: ErrorMain | null
}
