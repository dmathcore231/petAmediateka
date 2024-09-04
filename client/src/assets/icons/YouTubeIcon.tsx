import { IconProps } from "../../types/interfaces/IconProps"

export function YouTubeIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M18.615 9.442s-.132-.882-.536-1.27c-.513-.51-1.09-.513-1.353-.543-1.89-.129-4.723-.129-4.723-.129h-.006s-2.834 0-4.723.13c-.263.03-.839.032-1.352.541-.405.389-.537 1.27-.537 1.27s-.135 1.036-.135 2.072v.97c0 1.036.135 2.071.135 2.071s.132.882.537 1.27c.513.51 1.188.494 1.488.547 1.08.099 4.59.129 4.59.129s2.837-.004 4.726-.134c.264-.03.84-.032 1.353-.542.404-.388.536-1.27.536-1.27s.135-1.035.135-2.07v-.971c0-1.036-.135-2.071-.135-2.071zm-8.01 4.218v-3.596l3.649 1.804-3.648 1.792z"></path>
    </svg>
  )
}
