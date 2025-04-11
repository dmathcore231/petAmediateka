import { JSX } from "react"
import { HboIcon } from "../../assets/icons/HboIcon"
import { AmcIcon } from "../../assets/icons/AmcIcon"
export interface IconSeriesProps {
  studioName: string
}

export function IconSeries({ studioName }: IconSeriesProps): JSX.Element {
  const lowerStudioName: string = studioName.toLowerCase()
  const configIcon: Record<string, JSX.Element> = {
    'hbo': <HboIcon width={43} height={18} />,
    'amc': <AmcIcon width={43} height={18} />,
  }

  const setIconValue = (): JSX.Element | string => configIcon[lowerStudioName]
    ? configIcon[lowerStudioName]
    : studioName

  return (
    <span className="icon-series title title_color_white-dark ">
      {setIconValue()}
    </span>
  )
}
