import { IconProps } from "../../types/interfaces/IconProps"

export function PlayIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 20 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 1.074v21.852c0 .844.94 1.358 1.662.907l17.47-10.926a1.067 1.067 0 000-1.814L1.662.167C.94-.283 0 .23 0 1.074zm1.845 1.931v18.031c0 .168.186.271.33.183l14.427-9.036a.213.213 0 000-.366L2.175 2.822a.217.217 0 00-.33.183z" fill="inherit" />
    </svg>
  )
}
