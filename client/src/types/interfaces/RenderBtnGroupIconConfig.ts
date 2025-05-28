import { IconButtonProps } from "./IconButtonProps"

export interface RenderBtnGroupIconConfig {
  typeBtn: 'watchNow' | 'addFavorite' | 'like' | 'dislike' | 'share',
  propsIconBtn: IconButtonProps,
  classes: string
  handlersBtn: { onClick: () => void, onMouseEnter: () => void, onMouseLeave: () => void }
  titleBtn?: string
}
