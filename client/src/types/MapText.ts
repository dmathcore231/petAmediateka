import { AuthTextKey } from "./AuthTextKey"

export type AuthTextContent = {
  [key in AuthTextKey]: string;
}

export type MapText = {
  signUp: AuthTextContent,
  signIn: AuthTextContent
}
