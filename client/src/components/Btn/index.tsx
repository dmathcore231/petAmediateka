import { BtnProps } from "../../types/interfaces/BtnProps"

export function Btn({ type, className, children, onClick, disabled }: BtnProps): JSX.Element {
  return (
    <button
      type={type}
      className={`btn ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
