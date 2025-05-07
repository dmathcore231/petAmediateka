import { JSX } from "react"

export type IconConfig = {
  default: JSX.Element
  hover?: JSX.Element
  active?: JSX.Element
  isActive?: JSX.Element
}

export interface IconButtonProps {
  config: {
    stateIcon: 'default' | 'isActive'
    loading: boolean
  }
  styles: {
    scale: boolean
    fillColor: 'white' | 'black'
  }
  isHovered: boolean
  iconJSX: IconConfig
}
