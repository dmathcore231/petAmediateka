import { Btn } from "../Btn"
import { Badge } from "../Badge"
import { CardProps } from "../../types/interfaces/CardProps"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function Card({ size, data }: CardProps): JSX.Element {

  if (size === 'lg') {
    return (
      <div className="card">
        <div className={`card-imageBg card-imageBg_${size}`}>
          <img src={data.imgBg} alt={data.title} className="card-imageBg__img" />
        </div>
        <div className="card-content">
          {data.badge && (
            <div className="card-content__badge">
              <Badge type={data.badge.type} title={data.badge.title} />
            </div>
          )}
        </div>
      </div>
    )
  } else if (size === 'md') {
    return (
      <div className="card">
        Card md
      </div>
    )
  } else if (size === 'sm') {
    return (
      <div className="card">
        Card sm
      </div>
    )
  } else {
    return (
      <div className="card">
        Card xsm
      </div>
    )
  }
}
