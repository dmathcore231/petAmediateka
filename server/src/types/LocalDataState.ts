import { User } from '../types/interface/User'
import { ErrorMain } from './Error'
import { Movie } from './interface/MediaContent'
import { Series } from './interface/Series'
import { TokenState } from './Token'

export type LocalDataState = {
  user: User | null
  token: TokenState | null
  error: ErrorMain | null
  content?: Array<Movie | Series>
}
