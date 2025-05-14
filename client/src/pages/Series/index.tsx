import { useEffect, useState, JSX } from "react"
import { useParams, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchContent } from "../../redux/contentSlice"
import { fetchMyFavorite } from "../../services/my/myThunk"
import { RootState } from "../../redux/store"
import { LinkBack } from "../../components/LinkBack"
import { Btn } from "../../components/Btn"
import { MetaData } from "../../components/MetaData"
import { Spinner } from "../../components/Spinner"
import { ShowMore } from "../../components/ShowMore"
import { Trailer } from "../../components/Trailer"
import { Seasons } from "../../components/Seasons"
import { IconSeries } from "../../components/IconSeries"
import { IconButton } from "../../components/IconButton"
import { ContentTypeEnum } from "../../types/interfaces/Content"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { ContentStateItem } from "../../types/interfaces/InitialStatesSlice"
import { Season } from "../../types/interfaces/MediaContent"
import { IconButtonProps } from "../../types/interfaces/IconButtonProps"
import { formSrcMediaContent, checkIsFavoriteContent } from "../../helpers"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"
import { IsFavoriteIcon } from "../../assets/icons/IsFavoriteIcon"
import { LikeIcon } from "../../assets/icons/LikeIcon"
import { DislikeIcon } from "../../assets/icons/DislikeIcon"

export function Series(): JSX.Element {
  const { id, seasonIndex } = useParams()
  const dispatch = useAppDispatch()

  const { content, loading } = useAppSelector((state: RootState) => state.content.series as ContentStateItem<MediaContent>)
  const { user, loading: loadingUser } = useAppSelector(state => state.my)

  const [isHoveredBtnWatchNow, setIsHoveredBtnWatchNow] = useState(false)
  const [isHoveredBtnAddFavorite, setIsHoveredBtnAddFavorite] = useState(false)


  const iconButtonWatchNowProps: IconButtonProps = {
    config: {
      stateIcon: 'default',
      loading,
    },
    styles: {
      scale: true,
      fillColor: 'black'
    },
    iconJSX: {
      default: (<PlayIcon width={24} height={24} />),
    },
    isHovered: isHoveredBtnWatchNow
  }

  const iconButtonFavoriteProps: IconButtonProps = {
    config: {
      stateIcon: checkIsFavoriteContent(user?.userActionsData.favoritList ?? null, id!),
      loading,
    },
    styles: {
      scale: true,
      fillColor: 'white'
    },
    iconJSX: {
      default: (<AddFavoriteIcon width={24} height={24} />),
      isActive: (<IsFavoriteIcon width={24} height={24} />),
    },
    isHovered: isHoveredBtnAddFavorite
  }

  useEffect((): void => {
    dispatch(fetchContent({ type: ContentTypeEnum.Series, id }))
  }, [dispatch])

  const handleClickBtnAddFavorite = (id: string): void => {
    if (!user || loadingUser) return

    const formData = new FormData()
    formData.append('id', id)

    dispatch(fetchMyFavorite(formData))
  }

  const setClassMetaDataDes = (): string => {
    const baseClass: string = 'series-meta-data-description'
    const noTrailerClass: string = `${baseClass}_no-trailer`

    const season: Season | undefined = content?.seasons?.[Number(seasonIndex) - 1]

    if (!seasonIndex && content?.trailer) {
      return baseClass
    }

    if (seasonIndex && season?.trailer) {
      return baseClass
    }

    return `${baseClass} ${noTrailerClass}`
  }

  const renderBgPage = (): JSX.Element => {
    const indexSeason: number = Number(seasonIndex)
    const targetBg = indexSeason
      ? content.seasons?.[indexSeason - 1]?.bg
      : content.bg

    const renderVideo = (videoUrl: string): JSX.Element => (
      <div className="series-bg__video">
        <video
          src={videoUrl}
          className="series-bg__video-item"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
        />
      </div>
    )

    const renderImage = (imgUrl?: string): JSX.Element => (
      <picture className="series-bg__picture">
        <img
          src={imgUrl}
          alt=""
          className="series-bg__img"
        />
      </picture>
    )

    if (targetBg?.videoUrl) {
      return renderVideo(targetBg.videoUrl)
    }

    return renderImage(targetBg?.imgUrl)
  }

  const renderContent = (): JSX.Element => {
    if (!content || loading) return (<Spinner width={100} height={100} />)

    const { data, logoImg, rating, seasons, _id } = content
    const season: Season | undefined = content?.seasons?.[Number(seasonIndex) - 1]
    const trailer = season?.trailer

    const renderUpper = (logoSrc: string): JSX.Element => {
      const urlMainPageSeries = `/series/${_id}/${data.title.linkTitle}`
      const altLogo = `logo ${data.title.originalTitle}`

      return (
        <div className="series-content-upper container">
          <LinkBack activePage="Сериалы" />
          <Link to={urlMainPageSeries} className="series-content-upper__item">
            <img src={logoSrc}
              alt={altLogo}
              className="series-content-upper__img" />
          </Link>
          <div className="series-content-upper__item">
            <span className="title title_color_white-dark">
              {data.title.value}
            </span>
            {IconSeries({ studioName: data.production })}
          </div>
          <div className="series-content-upper__item">
            <div className="series-seasons-line">
              <div className="series-seasons-line__title">
                <span className="title">Сезоны:</span>
              </div>
              <ul className="series-seasons-line__list">
                {seasons?.map((item, index) => {
                  return (
                    <li className={"series-seasons-line__item" + (Number(seasonIndex) === item.numberOfSeasons ? " series-seasons-line__item_active" : "")}
                      key={_id + index}>
                      <Link to={`/series/${_id}/${data.title.linkTitle}/season/${item.numberOfSeasons}`} className="series-seasons-line__link
                    title title_weight_bold ">
                        {item.numberOfSeasons}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )
    }

    return (
      <>
        {renderUpper(logoImg)}
        <div className="series-content-header container">
          <div className="series-content-header__row">
            <div className="series-content-header__btn-group">
              <div className="series-content-header__btn-wrapper series-content-header__btn-wrapper_fill_black">
                <Btn
                  type="button"
                  className="btn_primary"
                  onClick={() => { console.log("click") }}
                  onMouseEnter={() => setIsHoveredBtnWatchNow(true)}
                  onMouseLeave={() => setIsHoveredBtnWatchNow(false)}
                >
                  <div className="series-content-header__btn">
                    {<IconButton {...iconButtonWatchNowProps} />}
                    <span className="title title_color_black">
                      Смотреть
                    </span>
                  </div>
                </Btn>
              </div>
              <div className="series-content-header__btn-wrapper series-content-header__btn-wrapper_fill_transparent">
                {id && (
                  <Btn
                    type="button"
                    className="btn_secondary"
                    onClick={() => handleClickBtnAddFavorite(id)}
                    onMouseEnter={() => setIsHoveredBtnAddFavorite(true)}
                    onMouseLeave={() => setIsHoveredBtnAddFavorite(false)}
                  >
                    <div className="series-content-header__btn">
                      {<IconButton {...iconButtonFavoriteProps} />}
                      <span className="title">
                        В избранное
                      </span>
                    </div>
                  </Btn>
                )}
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
        <div className="series-content-body container">
          <div className="series-meta-data">
            {content && content.trailer && !seasonIndex && content.seasons && (
              <div className="series-meta-data__item">
                <Trailer
                  trailerImg={content.trailer.img}
                  seasonsIndex={content.seasons.length}
                  src={formSrcMediaContent(content)}
                  title={content.data.title.value}
                />
              </div>
            )}
            {content && seasonIndex && content.seasons && season && trailer && (
              <div className="series-meta-data__item">
                <Trailer
                  trailerImg={trailer.img}
                  seasonsIndex={Number(seasonIndex)}
                  src={formSrcMediaContent(content)}
                  title={content.data.title.value}
                />
              </div>
            )}
            <div className="series-meta-data__item">
              <div className={setClassMetaDataDes()} >
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
                    {seasonIndex && content.seasons ? content.seasons[Number(seasonIndex) - 1].description : data.description.mainDescription}
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
          <div className="series-content-footer__item container">
            {content.data.about && (
              <ShowMore data={content.data.about as { title: string; description: string }} />
            )}
          </div>
          <div className="series-content-footer__item">
            <Seasons seasonsValue={seasonIndex ? Number(seasonIndex) : 0} mediaContentData={content} />
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
        + (loading ? " series-content_loading" : "")}>
        {renderContent()}
      </div>
    </div >
  )
}
