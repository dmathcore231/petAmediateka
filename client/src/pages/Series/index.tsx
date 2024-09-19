import { useParams, Link } from "react-router-dom"
import { LinkBack } from "../../components/LinkBack"
import { Btn } from "../../components/Btn"
import { MetaData } from "../../components/MetaData"
import { MediaPlayer } from "../../components/MediaPlayer"
import { ShowMore } from "../../components/ShowMore"
import { temporaryListSeries } from "../../helpers/index"
import { HboIcon } from "../../assets/icons/HboIcon"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"
import { LikeIcon } from "../../assets/icons/LikeIcon"
import { DislikeIcon } from "../../assets/icons/DislikeIcon"

export function Series(): JSX.Element {
  const { id, title, season } = useParams()

  const propsMetaData = {
    rating: {
      amediateka: temporaryListSeries[0].rating.amediateka,
      imdb: temporaryListSeries[0].rating.imdb,
      kinopoisk: temporaryListSeries[0].rating.kinopoisk,
    },
    dateRelease: temporaryListSeries[0].data.dateRelease,
    ageRestriction: temporaryListSeries[0].data.ageRestriction,
    genres: "Драма",
  }

  const propsShowMore = {
    data: {
      title: temporaryListSeries[0].data.aboutSerial.title,
      discription: temporaryListSeries[0].data.aboutSerial.discription
    }
  }

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
              {temporaryListSeries[0].data.originalTitle}
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
              <h2 className="title title_size_xl title_color_secondary title_weight_light">
                {temporaryListSeries[0].data.title}
              </h2>
            </div>
          </div>
          <div className="series-content-header__row">
          </div>
        </div>
        <div className="series-content-body">
          <div className="series-meta-data">
            <div className="series-meta-data__item">
              <div className="series-meta-data-trailer">
                <div className="series-meta-data-trailer__title">
                  <h4>Трейлер – 2 сезон</h4>
                </div>
                <div className="series-meta-data-trailer__video">
                  <MediaPlayer />
                </div>
              </div>
            </div>
            <div className="series-meta-data__item">
              <div className="series-meta-data-description">
                <div className="series-meta-data-description__upper">
                  <MetaData {...propsMetaData} />
                </div>
                <div className="series-meta-data-description-body">
                  <div className="series-meta-data-description-body__text title title_align_left">
                    {temporaryListSeries[0].data.discription}
                  </div>
                  <div className="series-meta-data-info">
                    <div className="series-meta-data-info__col">
                      <div className="series-meta-data-info__row title title_color_gray title_weight_light">
                        Режиссеры:
                      </div>
                      <div className="series-meta-data-info__row title title_color_gray title_weight_light">
                        В ролях:
                      </div>
                      <div className="series-meta-data-info__row title title_color_gray title_weight_light">
                        Страна:
                      </div>
                      <div className="series-meta-data-info__row title title_color_gray title_weight_light">
                        Жанры:
                      </div>
                    </div>
                    <div className="series-meta-data-info__col">
                      <div className="series-meta-data-info__row title">
                        {temporaryListSeries[0].data.directors.join(', ')}
                      </div>
                      <div className="series-meta-data-info__row title">
                        {temporaryListSeries[0].data.actors.join(', ')}
                      </div>
                      <div className="series-meta-data-info__row title">
                        {temporaryListSeries[0].data.country}
                      </div>
                      <div className="series-meta-data-info__row title">
                        {temporaryListSeries[0].data.genres.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="series-content-footer">
          <div className="series-content-footer__item">
            <ShowMore {...propsShowMore} />
          </div>
          <div className="series-content-footer__item">

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
