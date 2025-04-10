import { JSX } from "react"
import { MetaDataProps } from "../../types/interfaces/MetaDataProps"
import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"
import { ImdbIcon } from "../../assets/icons/ImdbIcon"
import { KinopoiskIcon } from "../../assets/icons/KinopoiskIcon"

export function MetaData({ rating, dateRelease, ageRestriction, genres }: MetaDataProps): JSX.Element {

  const getGenres = (data: string[] | string, limit: number): string => {
    if (typeof data === "string") return data

    return data.length > limit
      ? data.slice(0, limit).join(" / ") + " / ..."
      : data.join(" / ")

  }

  return (
    <div className="meta-data">
      <div className="meta-data-list">
        <div className="meta-data-list__wrapper">
          <div className="meta-data-list__item">
            <RatingAmediateka width={30} height={24} />
            <span className="title title_color_secondary-active title_weight_bold">
              {rating.raitingAmediateka}
            </span>
          </div>
          {rating.ratingImdb && (
            <div className="meta-data-list__item">
              <ImdbIcon width={41} height={22} />
              <span className="title title_color_secondary-active title_weight_bold">
                {rating.ratingImdb}
              </span>
            </div>
          )}
          {rating.ratingKinopoisk && (
            <div className="meta-data-list__item">
              <KinopoiskIcon width={29} height={29} />
              <span className="title title_color_secondary-active title_weight_bold">
                {rating.ratingKinopoisk}
              </span>
            </div>
          )}
        </div>
        <div className="meta-data-list__wrapper meta-data-list__wrapper_gap_size_lg">
          <div className="meta-data-list__item">
            <span className="title title_color_secondary-active title_weight_bold">
              {dateRelease}
            </span>
          </div>
          <div className="meta-data-list__item">
            <span className="title title_color_secondary-active title_weight_bold">
              {ageRestriction}+
            </span>
          </div>
          <div className="meta-data-list__item">
            <span className="title title_color_secondary-active title_weight_bold">
              {getGenres(genres, 3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
