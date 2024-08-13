import { ChangeEvent } from "react"

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
  error?: boolean
  btnInInput?: JSX.Element
  checkPassword?: boolean
}
