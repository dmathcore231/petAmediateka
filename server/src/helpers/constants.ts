import crypto from 'crypto'

export const EXP_IN_ACCESS_TOKEN: string = '30m'
export const EXP_IN_REFRESH_TOKEN: string = '7d'
export const SECRET_KEY = crypto.randomBytes(32).toString('hex')
