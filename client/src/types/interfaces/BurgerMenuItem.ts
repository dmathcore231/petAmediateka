import { MouseEvent } from "react"

export interface BurgerMenuItem {
  to: string
  text: string
  className: string
  onClick: (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => void
}
