import { JSX } from "react"
import { BtnProps } from "../../types/interfaces/BtnProps"

export function Btn({ type,
  className,
  children,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  disabled }: BtnProps): JSX.Element {
  const defaultClass: string = `btn`
  const customClass: string = className || ""

  return (
    <button
      type={type}
      className={`${defaultClass} ${customClass}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
