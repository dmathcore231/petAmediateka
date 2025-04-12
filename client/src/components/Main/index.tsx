import { JSX } from "react"
import { MainProps } from "../../types/interfaces/MainProps"

export function Main({ children }: MainProps): JSX.Element {
  return (
    <main className="main">
      {children}
    </main>
  )
}
