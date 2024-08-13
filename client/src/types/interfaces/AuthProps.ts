import { Dispatch, SetStateAction } from "react"
import { AuthState } from "../../types/AuthState"

export interface AuthEmailProps {
  setEmailValue: Dispatch<SetStateAction<AuthState>>
}

export interface AuthPassProps {
  setPassValue: Dispatch<SetStateAction<AuthState>>
  email: string
}
