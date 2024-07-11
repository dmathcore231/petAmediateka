import { ReactNode, MouseEventHandler } from "react"

export interface BtnProps {
  type: "button" | "submit"
  children: ReactNode
  className: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
