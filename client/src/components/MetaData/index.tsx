import { MetaDataProps } from "../../types/interfaces/MetaDataProps"
import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"
import { ImdbIcon } from "../../assets/icons/ImdbIcon"
import { KinopoiskIcon } from "../../assets/icons/KinopoiskIcon"

export function MetaData({ rating, dateRelease, ageRestriction, genres }: MetaDataProps): JSX.Element {
  return (
    <div className="meta-data">
      <div className="meta-data-list">
        <div className="meta-data-list__wrapper">
          <div className="meta-data-list__item">
            <RatingAmediateka width={30} height={24} />
            <span className="title title_color_secondary-active title_weight_bold">
              {rating.amediateka}
            </span>
          </div>
          {rating.imdb && (
            <div className="meta-data-list__item">
              <ImdbIcon width={41} height={22} />
              <span className="title title_color_secondary-active title_weight_bold">
                {rating.imdb}
              </span>
            </div>
          )}
          {rating.kinopoisk && (
            <div className="meta-data-list__item">
              <KinopoiskIcon width={29} height={29} />
              <span className="title title_color_secondary-active title_weight_bold">
                {rating.kinopoisk}
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
              {genres}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
