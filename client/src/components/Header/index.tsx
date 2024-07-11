import { HeaderProps } from "../../types/interfaces/HeaderProps"

export function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header className="header container">
      {children}
    </header>
  )
}
