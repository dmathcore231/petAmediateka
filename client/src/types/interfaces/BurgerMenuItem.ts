import { MouseEvent } from "react"

export interface BurgerMenuItem {
  to: string
  text: string
  typeLink: 'nav' | 'link'
  className?: string
  onClick?: (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => void
}
