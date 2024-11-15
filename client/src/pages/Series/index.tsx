import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchContent } from "../../redux/contentSlice"
import { LinkBack } from "../../components/LinkBack"
import { Btn } from "../../components/Btn"
import { MetaData } from "../../components/MetaData"
import { Spinner } from "../../components/Spinner"
import { ContentTypeEnum } from "../../types/interfaces/Content"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { ContentStateItem } from "../../types/interfaces/InitialStatesSlice"
import { HboIcon } from "../../assets/icons/HboIcon"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"
import { LikeIcon } from "../../assets/icons/LikeIcon"
import { DislikeIcon } from "../../assets/icons/DislikeIcon"
import { Trailer } from "../../components/Trailer"
import { RootState } from "../../redux/store"

export function Series(): JSX.Element {
  const { id, season } = useParams()
  const dispatch = useAppDispatch()

  const { content, error, loading } = useAppSelector((state: RootState) => state.content[ContentTypeEnum.Series] as ContentStateItem<MediaContent>)

  useEffect(() => {
    if (!season && id) {
      dispatch(fetchContent({ type: ContentTypeEnum.Series, id }))
    }
  }, [])

  // const propsShowMore = {
  //   data: {
  //     title: temporaryListSeries[0].data.aboutSerial.title,
  //     discription: temporaryListSeries[0].data.aboutSerial.discription
  //   }
  // }

  const renderBgPage = (): JSX.Element => {

    if (!season && content.bg?.videoUrl) {
      return (
        <div className="series-bg__video">
          <video src={content.bg.videoUrl} className="series-bg__video-item"
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
          <img src={content.bg?.imgUrl} alt="" className="series-bg__img" />
        </picture>
      )
    }
  }

  const renderContent = (): JSX.Element => {
    if (!content) {
      return (
        <Spinner width={100} height={100} />
      )
    }
    const { actionsData, bg, data, logoImg, rating, seasons, trailer, type, _id } = content

    return (
      <>
        <div className="series-content-upper">
          <LinkBack activePage="Сериалы" />
          <Link to={`/series/${_id}/${data.title.linkTitle}`} className="series-content-upper__item">
            <img src={logoImg}
              alt={`logo ${data.title.originalTitle}`}
              className="series-content-upper__img" />
          </Link>
          <div className="series-content-upper__item">
            <span className="title title_color_white-dark">
              {data.title.value}
            </span>
            <span className="title title_color_white-dark">
              {/* нужно фиксануть отображение иконок*/}
              <HboIcon width={43} height={18} />
            </span>
          </div>
          <div className="series-content-upper__item">
            <div className="series-seasons-line">
              <div className="series-seasons-line__title">
                <span className="title">Сезоны:</span>
              </div>
              <ul className="series-seasons-line__list">
                {seasons?.map((season, index) => {
                  return (
                    <li className="series-seasons-line__item" key={_id + index}>
                      <Link to={`/series/${_id}/${data.title.linkTitle}/season/${season.numberOfSeasons}`} className="series-seasons-line__link
                      title title_weight_bold ">
                        {season.numberOfSeasons}
                      </Link>
                    </li>
                  )
                })}
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
              <div className="series-content-header__btn-wrapper series-content-header__btn-wrapper_fill_transparent">
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
                {data.title.value}
              </h2>
            </div>
          </div>
          <div className="series-content-header__row">
          </div>
        </div>
        <div className="series-content-body">
          <div className="series-meta-data">
            <div className="series-meta-data__item">
              {content && (
                <Trailer trailerData={content} />
              )}
            </div>
            <div className="series-meta-data__item">
              <div className="series-meta-data-description">
                <div className="series-meta-data-description__upper">
                  {rating && (
                    <MetaData
                      rating={rating}
                      dateRelease={data.dateRelease}
                      ageRestriction={data.ageRestriction}
                      genres={data.genres} />
                  )}
                </div>
                <div className="series-meta-data-description-body">
                  <div className="series-meta-data-description-body__text title title_align_left">
                    {data.description.mainDescription}
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
                        {data.directors.map((director, index) => (
                          <span key={index}>
                            {director}
                            {index !== data.directors.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                      <div className="series-meta-data-info__row title">
                        {data.actors.map((actor, index) => (
                          <span key={index}>
                            {actor}
                            {index !== data.actors.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                      <div className="series-meta-data-info__row title">
                        {data.country}
                      </div>
                      <div className="series-meta-data-info__row title">
                        {data.genres.map((genre, index) => (
                          <span key={index}>
                            {genre}
                            {index !== data.genres.length - 1 && ', '}
                          </span>
                        ))}
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
            {/* <ShowMore {...propsShowMore} /> */}
          </div>
          <div className="series-content-footer__item">

          </div>
        </div>
      </>
    )
  }

  return (
    <div className="series">
      {!loading && content && (
        <div className="series-bg">
          {renderBgPage()}
        </div>
      )}
      <div className={"series-content"
        + (loading ? " series-content_loading" : "")
        + " container"}>
        {renderContent()}
      </div>
    </div >
  )
}
