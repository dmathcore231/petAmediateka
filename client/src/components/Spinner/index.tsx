import { JSX } from 'react'
import { SpinnerIcon } from '../../assets/icons/SpinnerIcon'
import { SpinnerProps } from '../../types/interfaces/SpinnerProps'

export function Spinner({ width, height }: SpinnerProps): JSX.Element {
  return (
    <SpinnerIcon className="spinner" width={width} height={height} />
  )
}
