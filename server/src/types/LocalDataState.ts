import { User } from '../types/interface/User'
import { IErrorMainOptions } from './IErrorMainOptions'
import { MediaContent } from './interface/MediaContent'
import { TokenState } from './Token'

export type LocalDataState = {
  user: User | null
  token: TokenState | null
  error: IErrorMainOptions | null
  content?: Array<MediaContent>
}
