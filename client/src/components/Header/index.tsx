import { JSX } from "react"
import { useAppSelector } from "../../hooks"
import { HeaderProps } from "../../types/interfaces/HeaderProps"

export function Header({ children }: HeaderProps): JSX.Element {
  const { isShow } = useAppSelector(state => state.mediaPlayer)

  const baseClass: string = "header"
  const containerClass: string = " container"
  const isShowClass: string = isShow ? ` ${baseClass}_hidden` : ''

  return (
    <header className={`${baseClass}${isShowClass}${containerClass}`}>
      {children}
    </header>
  )
}
