import { BtnProps } from "../../types/interfaces/BtnProps"

export function Btn({ type, className, children, onClick, onKeyDown, disabled }: BtnProps): JSX.Element {
  return (
    <button
      type={type}
      className={`btn ${className || ""}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
