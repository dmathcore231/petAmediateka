import { ReactNode, MouseEventHandler, KeyboardEventHandler } from "react"

export interface BtnProps {
  type: "button" | "submit"
  children: ReactNode
  className: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>
  disabled?: boolean
}
