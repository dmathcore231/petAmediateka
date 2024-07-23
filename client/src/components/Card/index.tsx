import { Btn } from "../Btn"
import { CardProps } from "../../types/interfaces/CardProps"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function Card({ size, data }: CardProps): JSX.Element {

  if (size === 'lg') {
    return (
      <div className="card">
        Card conent
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
