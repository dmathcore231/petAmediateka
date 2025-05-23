import { IconProps } from "../../types/interfaces/IconProps"

export function HdIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 44 36" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M3 6v24a1 1 0 0 0 1 1h36a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm-.3-4h38.6A2.7 2.7 0 0 1 44 4.7v26.6a2.7 2.7 0 0 1-2.7 2.7H2.7A2.7 2.7 0 0 1 0 31.3V4.7A2.7 2.7 0 0 1 2.7 2zm17.46 22.96h-.41a1 1 0 0 1-1-1v-4.937h-6.32v4.937a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-11.9a1 1 0 0 1 1-1h.43a1 1 0 0 1 1 1v4.679h6.32v-4.68a1 1 0 0 1 1-1h.41a1 1 0 0 1 1 1V23.96a1 1 0 0 1-1 1zm3.85-.96V12a1 1 0 0 1 1-1h3.228c2.686 0 4.674.688 5.965 2.065C35.4 14.35 36 15.951 36 17.871c0 2.065-.691 3.773-2.074 5.123C32.556 24.331 30.608 25 28.08 25h-3.07a1 1 0 0 1-1-1zm4.188-10.716h-1.84v9.432c.606.027 1.366 0 1.8 0 1.647 0 3.312-.437 4.247-1.31.935-.874 1.402-2.052 1.402-3.535 0-1.417-.464-2.535-1.392-3.356-.928-.82-2.584-1.231-4.217-1.231z" />
    </svg>
  )
}
