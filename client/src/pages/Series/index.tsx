import { useParams, Link } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"
import { Btn } from "../../components/Btn"
import { MetaData } from "../../components/MetaData"
import { HboIcon } from "../../assets/icons/HboIcon"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"
import { LikeIcon } from "../../assets/icons/LikeIcon"
import { DislikeIcon } from "../../assets/icons/DislikeIcon"

export function Series(): JSX.Element {
  const { id, title, season } = useParams()

  const renderBgPage = (): JSX.Element => {
    if (!season) {
      return (
        <div className="series-bg__video">
          <video src="/hotd/hotdBgVideo.mp4" className="series-bg__video-item"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"></video>
        </div>
      )
    } else {
      return (
        <picture className="series-bg__picture">
          <img src="/hotd/imgBgHOTD.jpg" alt="" className="series-bg__img" />
        </picture>
      )
    }
  }

  const renderContent = (): JSX.Element => {
    return (
      <>
        <div className="series-content-upper">
          <LinkBack activePage="Сериалы" />
          <div className="series-content-upper__item">
            <img src="/hotd/logo.png" alt="logo" className="series-content-upper__img" />
          </div>
          <div className="series-content-upper__item">
            <span className="title title_color_white-dark">
              House of the Dragon
            </span>
            <span className="title title_color_white-dark">
              <HboIcon width={43} height={18} />
            </span>
          </div>
          <div className="series-content-upper__item">
            <div className="series-seasons-line">
              <div className="series-seasons-line__title">
                <span className="title">Сезоны:</span>
              </div>
              <ul className="series-seasons-line__list">
                <li className="series-seasons-line__item">
                  <Link to={`/series/${id}/${title}/1`} className="series-seasons-line__link
                title title_weight_bold ">
                    1
                  </Link>
                </li>
                <li className="series-seasons-line__item">
                  <Link to={`/series/${id}/${title}/2`} className="series-seasons-line__link
                title title_weight_bold ">
                    2
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="series-content-header">
          <div className="series-content-header__row">
            <div className="series-content-header__btn-group">
              <div className="series-content-header__btn-wrapper series-content-header__btn-wrapper_fill_black">
                <Btn
                  type="button"
                  className="btn_primary"
                  onClick={() => { console.log("click") }}>
                  <div className="series-content-header__btn">
                    <PlayIcon width={26} height={26} />
                    <span className="title title_color_black">
                      Смотреть
                    </span>
                  </div>
                </Btn>
              </div>
              <div className="series-content-header__btn-wrapper series-content-header__btn-wrapper_fill_transparent
              series-content-header__btn-wrapper_stroke_white">
                <Btn
                  type="button"
                  className="btn_secondary"
                  onClick={() => { console.log("click") }}>
                  <div className="series-content-header__btn">
                    <AddFavoriteIcon width={26} height={26} />
                    <span className="title">
                      В избранное
                    </span>
                  </div>
                </Btn>
              </div>
              <div className="series-content-header__btn-wrapper
                series-content-header__btn-wrapper_flex_shrink_sm
              ">
                <Btn
                  type="button"
                  className="btn_secondary"
                  onClick={() => { console.log("click") }}>
                  <LikeIcon width={26} height={26} />
                </Btn>
              </div>
              <div className="series-content-header__btn-wrapper
                series-content-header__btn-wrapper_flex_shrink_sm
              ">
                <Btn
                  type="button"
                  className="btn_secondary"
                  onClick={() => { console.log("click") }}>
                  <DislikeIcon width={26} height={26} />
                </Btn>
              </div>
              <div className="series-content-header__btn-wrapper
                series-content-header__btn-wrapper_flex_shrink_sm
              ">
                <Btn
                  type="button"
                  className="btn_secondary"
                  onClick={() => { console.log("click") }}>
                  <ShareIcon width={26} height={26} />
                </Btn>
              </div>
            </div>
            <div className="series-content-header__title">
              <h2 className="title title_size_xl title_color_secondary title_weight_light">Дом Дракона</h2>
            </div>
          </div>
          <div className="series-content-header__row">
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="series">
      <div className="series-bg">
        {renderBgPage()}
      </div>
      <div className="series-content container">
        {renderContent()}
      </div>
    </div>
  )
}
