import { JSX } from "react"
import { Spinner } from "../Spinner"
import { IconButtonProps } from "../../types/interfaces/IconButtonProps"

export function IconButton({ config, styles, iconJSX, isHovered }: IconButtonProps): JSX.Element {
  const { scale, fillColor } = styles
  const { stateIcon, loading, } = config
  const { default: defaultIcon,
    hover: hoverIcon,
    active: activeIcon,
    isActive: isActiveIcon } = iconJSX

  const baseClass: string = "btn-icon"
  const scaleHoverClass: string = isHovered
    ? `${baseClass}_scale_active`
    : `${baseClass}_scale`
  const fill: string = `${baseClass}_fill`
  const fillColorMap: Record<string, string> = {
    white: `${fill}_white`,
    black: `${fill}_black`
  }

  const setClasses = (scale: boolean) => {
    if (scale) return `${baseClass} ${fillColorMap[fillColor]} ${scaleHoverClass}`
    return `${baseClass} ${fillColorMap[fillColor]}`
  }

  if (loading) {
    return (
      <span className={setClasses(scale)}>
        <Spinner width={24} height={24} />
      </span>
    )
  }

  if (stateIcon === 'isActive') {
    return (
      <span className={setClasses(scale)}>
        {isActiveIcon}
      </span>
    )
  }

  return (
    <span className={setClasses(scale)}>
      {defaultIcon}
    </span>
  )
}
