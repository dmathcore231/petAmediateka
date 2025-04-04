import { JSX } from "react"
import { BtnProps } from "../../types/interfaces/BtnProps"

export function Btn({ type, className, children, onClick, onKeyDown, disabled }: BtnProps): JSX.Element {
  const defaultClass: string = `btn`
  const customClass: string = className || ""

  return (
    <button
      type={type}
      className={`${defaultClass} ${customClass}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
