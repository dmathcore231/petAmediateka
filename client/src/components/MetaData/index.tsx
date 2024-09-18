import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"
import { ImdbIcon } from "../../assets/icons/ImdbIcon"
import { KinopoiskIcon } from "../../assets/icons/KinopoiskIcon"

export function MetaData(): JSX.Element {
  return (
    <div className="meta-data">
      <div className="meta-data-list">
        <div className="meta-data-list__wrapper">
          <div className="meta-data-list__item">
            <RatingAmediateka width={30} height={24} />
            <span className="title title_color_secondary-active title_weight_bold">
              9.1
            </span>
          </div>
          <div className="meta-data-list__item">
            <ImdbIcon width={41} height={22} />
            <span className="title title_color_secondary-active title_weight_bold">
              8.8
            </span>
          </div>
          <div className="meta-data-list__item">
            <KinopoiskIcon width={29} height={29} />
            <span className="title title_color_secondary-active title_weight_bold">
              8.8
            </span>
          </div>
        </div>
        <div className="meta-data-list__wrapper meta-data-list__wrapper_gap_size_lg">
          <div className="meta-data-list__item">
            <span className="title title_color_secondary-active title_weight_bold">
              2022
            </span>
          </div>
          <div className="meta-data-list__item">
            <span className="title title_color_secondary-active title_weight_bold">
              18+
            </span>
          </div>
          <div className="meta-data-list__item">
            <span className="title title_color_secondary-active title_weight_bold">
              Драма
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
