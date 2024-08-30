import { ChangeEvent, SetStateAction, Dispatch } from "react"
import { InputErrorState } from "../../types/Input"

export interface InputProps {
  type: "email" | "text" | "password"
  id: string
  label: {
    labelInvisible: boolean
    value: string | null
  }
  required: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  className?: string
  name?: string
  error?: InputErrorState | null
  btnInInput?: JSX.Element
  checkPassword?: boolean
}
