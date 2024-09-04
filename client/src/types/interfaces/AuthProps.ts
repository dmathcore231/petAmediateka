import { Dispatch, SetStateAction } from "react"
import { AuthState } from "../../types/AuthState"

export interface AuthProps {
  pageState: 'signIn' | 'signUp'
}

export interface AuthEmailProps {
  setEmailValue: Dispatch<SetStateAction<AuthState>>
  type: "signIn" | "signUp"
}

export interface AuthPassProps {
  setPassValue: Dispatch<SetStateAction<AuthState>>
  email: string
  type: "signIn" | "signUp"
}
