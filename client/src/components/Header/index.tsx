import { useAppSelector } from "../../hooks"
import { HeaderProps } from "../../types/interfaces/HeaderProps"

export function Header({ children }: HeaderProps): JSX.Element {
  const { isShow } = useAppSelector(state => state.mediaPlayer)

  return (
    <header className={isShow ? "header header_hidden container" : "header container"}>
      {children}
    </header>
  )
}
