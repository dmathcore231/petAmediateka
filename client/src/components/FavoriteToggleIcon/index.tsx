import { JSX } from "react"
import { Spinner } from "../Spinner"
import { ToggleIconProps } from "../../types/interfaces/ToggleIconProps"
import { IsFavotiteIcon } from "../../assets/icons/IsFavotiteIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"

export function FavoriteToggleIcon({ loading, favoritesList, idMContent }: ToggleIconProps): JSX.Element {
  const baseClass: string = "card-body__btn-wrapper-scale"

  if (loading) {
    return (
      <span className={baseClass}>
        <Spinner width={24} height={24} />
      </span>
    )
  }

  if (favoritesList.includes(idMContent)) {
    return (
      <span className={baseClass}>
        <IsFavotiteIcon width={24} height={24} />
      </span>
    )
  }

  return (
    <span className={baseClass}>
      <AddFavoriteIcon width={24} height={24} />
    </span>
  )
}
