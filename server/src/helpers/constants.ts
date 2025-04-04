import crypto from 'crypto'
import { Secret, SignOptions } from 'jsonwebtoken'

export const EXP_IN_ACCESS_TOKEN: SignOptions["expiresIn"] = '30m'
export const EXP_IN_REFRESH_TOKEN: SignOptions["expiresIn"] = '7d'
export const SECRET_KEY:Secret = crypto.randomBytes(32).toString('hex')
