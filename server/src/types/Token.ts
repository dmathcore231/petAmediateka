
export type TokenState = {
  accessToken: {
    value: string | null
    expirated: boolean
    error: boolean
  }
  refreshToken: {
    value: string | null
    expirated: boolean
    error: boolean
  }
}
