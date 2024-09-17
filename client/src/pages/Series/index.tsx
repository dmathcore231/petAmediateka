import { useParams } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"
import { Btn } from "../../components/Btn"
import { HboIcon } from "../../assets/icons/HboIcon"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { RatingAmediateka } from "../../assets/icons/RatingAmediateka"
import { ImdbIcon } from "../../assets/icons/ImdbIcon"

export function Series(): JSX.Element {
  const { id, title, season } = useParams()

  return (
    <div className="page-series">
      <div className="page-series-bg">
        <picture className="page-series-bg__picture">
          <img src="/hotd/imgBgHOTD.jpg" alt="" className="page-series-bg__img" />
        </picture>
      </div>
      <div className="page-series-content container">
        <div className="page-series-content-header">
          <LinkBack activePage="Сериалы" />
          <div className="page-series-content-header-logo">
            <img src="/hotd/logo.png" alt="logo" className="page-series-content-header-logo__img" />
          </div>
          <div className="page-series-content-header__item">
            <span className="title title_color_white-dark">
              Сезон {season}
            </span>
            <span className="title title_color_white-dark">
              <HboIcon width={43} height={18} />
            </span>
          </div>
          <div className="page-series-content-header__item">
            <span className="title title_color_white-dark">
              Сезоны:
            </span>
            <span className="page-series-content-header__seasons-item title">1</span>
            <span className="page-series-content-header__seasons-item title">2</span>
          </div>
          <div className="page-series-content-header__item">
            <div className="page-series-content-header__btn-wrapper">
              <Btn
                type="button"
                className="btn_primary"
                onClick={() => { console.log("click") }}>
                <div className="page-series-content-header__btn">
                  <PlayIcon width={28} height={28} />
                  Смотреть
                </div>
              </Btn>
            </div>
            <div className="page-series-content-header__btn-wrapper page-series-content-header__btn-wrapper_width_sm">
              <Btn
                type="button"
                className="btn_secondary"
                onClick={() => { console.log("click") }}>
                <ShareIcon width={24} height={28} />
              </Btn>
            </div>
          </div>
          <div className="page-series-content-header-rating">
            <div className="page-series-content-header-rating__item">
              <RatingAmediateka width={30} height={24} />
              <span className="title title_color_secondary-active title_weight_bold">
                9.1
              </span>
            </div>
            <div className="page-series-content-header-rating__item">
              <ImdbIcon width={41} height={22} />
              <span className="title title_color_secondary-active title_weight_bold">
                8.8
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
