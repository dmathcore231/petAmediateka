import { useEffect, useState, JSX } from "react"
import { useParams, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector, useCheckBreakpoint } from "../../hooks"
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
import { PictureWithSources } from "../../components/PictureWithSources"
import { ContentTypeEnum } from "../../types/interfaces/Content"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { ContentStateItem } from "../../types/interfaces/InitialStatesSlice"
import { Season } from "../../types/interfaces/MediaContent"
import { RenderBtnGroupIconConfig } from "../../types/interfaces/RenderBtnGroupIconConfig"
import { PictureWithSourcesProps } from "../../types/interfaces/PictureWithSourcesProps"
import { formSrcMediaContent, checkIsFavoriteContent } from "../../helpers"
import { PlayIcon } from "../../assets/icons/PlayIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { ShareIconIsActive } from "../../assets/icons/ShareIconIsActive"
import { AddFavoriteIcon } from "../../assets/icons/AddFavoriteIcon"
import { IsFavoriteIcon } from "../../assets/icons/IsFavoriteIcon"
import { LikeIcon } from "../../assets/icons/LikeIcon"
import { LikeIconIsActive } from "../../assets/icons/LikeIconIsActive"
import { DislikeIcon } from "../../assets/icons/DislikeIcon"
import { DislikeIconIsActive } from "../../assets/icons/DislikeIconIsActive"

export function Series(): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_LG = useCheckBreakpoint(992)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const { id, seasonIndex } = useParams()
  const { content, loading } = useAppSelector((state: RootState) => state.content.series as ContentStateItem<MediaContent>)
  const { user, loading: loadingUser } = useAppSelector(state => state.my)
  const [btnHoveredState, setBtnHoveredState] = useState({
    watchNow: false,
    addFavorite: false,
    like: false,
    dislike: false,
    share: false,
  })
  const [sizeIcons, setSizeIcons] = useState({ width: 24, height: 24 })

  useEffect((): void => {
    dispatch(fetchContent({ type: ContentTypeEnum.Series, id }))
  }, [dispatch])

  useEffect(() => {
    if (BREAKPOINT_MD) {
      setSizeIcons({ width: 14, height: 14 })
    } else if (BREAKPOINT_LG) {
      setSizeIcons({ width: 20, height: 20 })
    } else {
      setSizeIcons({ width: 24, height: 24 })
    }
  }, [BREAKPOINT_LG, BREAKPOINT_MD])

  const handleClickBtnAddFavorite = (id: string): void => {
    if (!user || loadingUser) return

    const formData = new FormData()
    formData.append('id', id)

    dispatch(fetchMyFavorite(formData))
  }

  const renderBackgroundPage = (): JSX.Element | null => {
    const renderVideo = (url: string): JSX.Element => (
      <div className="series-bg__video">
        <video
          src={url}
          className="series-bg__video-item"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
        />
      </div>
    )

    const renderBackground = (
      videoUrl: string | null | undefined,
      imgUrl: string,
      sourceUrls: string[]
    ): JSX.Element => {
      if (videoUrl) {
        return renderVideo(videoUrl)
      }

      const pictureProps: PictureWithSourcesProps = {
        img: {
          url: imgUrl,
          sourceUrls: sourceUrls
        },
        alt: `${content.data.title.originalTitle} background`,
        classes: {
          picture: 'series-bg__picture',
          img: 'series-bg__img'
        },
        media: sourceUrls.length > 0
          ? ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
          : ['xxl']
      }

      return <PictureWithSources {...pictureProps} />
    }

    const mainBackground = {
      videoUrl: content.bg.videoUrl,
      imgUrl: content.bg.imgUrl,
      sourceUrls: content.bg.sourceUrls
    }

    if (!seasonIndex) {
      return renderBackground(
        mainBackground.videoUrl,
        mainBackground.imgUrl,
        mainBackground.sourceUrls
      )
    }

    const seasonNumber = parseInt(seasonIndex, 10)
    const season = content.seasons?.[seasonNumber - 1]

    if (!season) {
      return <Spinner width={60} height={60} />
    }

    const seasonBackground = season.bg
    const background = seasonBackground || mainBackground

    return renderBackground(
      background.videoUrl,
      background.imgUrl,
      background.sourceUrls
    )
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

    const renderBtnGroup = (): JSX.Element => {
      const TEXT: Record<string, string> = {
        watchNow: "Смотреть",
      }
      const mainClass = "series-content-header"
      const CLASSES = {
        btnGroup: {
          base: `${mainClass}-btn-group`,
          item: `${mainClass}-btn-group__item`,
        },
        wrapper: {
          base: `${mainClass}-btn-wrapper`,
          flexShrink: `${mainClass}-btn-wrapper_flex_shrink_lg`,
          fillTransparent: `${mainClass}-btn-wrapper_fill_transparent`,
        },
        btn: `${mainClass}-btn`,
        title: "title title_color_black",
      }

      const iconsConfig: RenderBtnGroupIconConfig[] = [
        {
          typeBtn: 'watchNow',
          propsIconBtn: {
            config: {
              stateIcon: 'default',
              loading,
            },
            styles: {
              scale: true,
              fillColor: 'black'
            },
            iconJSX: {
              default: (<PlayIcon width={sizeIcons.width} height={sizeIcons.height} />),
            },
            isHovered: btnHoveredState.watchNow
          },
          classes: `${CLASSES.wrapper.base} ${CLASSES.wrapper.flexShrink}`,
          handlersBtn: {
            onClick: () => {
              console.log('click watch now')
            },
            onMouseEnter: () => {
              setBtnHoveredState((prev) => ({
                ...prev,
                watchNow: !prev.watchNow
              }))
            },
            onMouseLeave: () => {
              setBtnHoveredState((prev) => ({
                ...prev,
                watchNow: !prev.watchNow
              }))
            }
          },
          titleBtn: TEXT.watchNow
        },
        {
          typeBtn: 'addFavorite',
          propsIconBtn: {
            config: {
              stateIcon: checkIsFavoriteContent(user?.userActionsData.favoriteList ?? null, id!),
              loading,
            },
            styles: {
              scale: true,
              fillColor: 'white'
            },
            iconJSX: {
              default: (<AddFavoriteIcon width={sizeIcons.width} height={sizeIcons.height} />),
              isActive: (<IsFavoriteIcon width={sizeIcons.width} height={sizeIcons.height} />),
            },
            isHovered: btnHoveredState.addFavorite
          },
          classes: `${CLASSES.wrapper.base} ${CLASSES.wrapper.fillTransparent}`,
          handlersBtn: {
            onClick: () => {
              handleClickBtnAddFavorite(id as string)
            },
            onMouseEnter: () => {
              setBtnHoveredState((prev) => ({
                ...prev,
                addFavorite: !prev.addFavorite
              }))
            },
            onMouseLeave: () => {
              setBtnHoveredState((prev) => ({
                ...prev,
                addFavorite: !prev.addFavorite
              }))
            }
          },
        },
        {
          typeBtn: 'like',
          propsIconBtn: {
            config: {
              stateIcon: 'default',
              loading,
            },
            styles: {
              scale: true,
              fillColor: 'white'
            },
            iconJSX: {
              default: (<LikeIcon width={sizeIcons.width} height={sizeIcons.height} />),
              active: (<LikeIconIsActive width={sizeIcons.width} height={sizeIcons.height} />),
            },
            isHovered: btnHoveredState.like
          },
          classes: CLASSES.wrapper.base,
          handlersBtn: {
            onClick: () => {
              console.log('click like')
            },
            onMouseEnter: () => {
              setBtnHoveredState((prev) => (
                { ...prev, like: !prev.like }))
            },
            onMouseLeave: () => {
              setBtnHoveredState((prev) => (
                { ...prev, like: !prev.like }))
            },
          }
        },
        {
          typeBtn: 'dislike',
          propsIconBtn: {
            config: {
              stateIcon: 'default',
              loading,
            },
            styles: {
              scale: true,
              fillColor: 'white'
            },
            iconJSX: {
              default: (<DislikeIcon width={sizeIcons.width} height={sizeIcons.height} />),
              active: (<DislikeIconIsActive width={sizeIcons.width} height={sizeIcons.height} />),
            },
            isHovered: btnHoveredState.dislike
          },
          classes: CLASSES.wrapper.base,
          handlersBtn: {
            onClick: () => {
              console.log('click dislike')
            },
            onMouseEnter: () => {
              setBtnHoveredState((prev) => (
                { ...prev, dislike: !prev.dislike }))
            },
            onMouseLeave: () => {
              setBtnHoveredState((prev) => (
                { ...prev, dislike: !prev.dislike }))
            },
          }
        },
        {
          typeBtn: 'share',
          propsIconBtn: {
            config: {
              stateIcon: 'default',
              loading,
            },
            styles: {
              scale: true,
              fillColor: 'white'
            },
            iconJSX: {
              default: (<ShareIcon width={sizeIcons.width} height={sizeIcons.height} />),
              active: (<ShareIconIsActive width={sizeIcons.width} height={sizeIcons.height} />),
            },
            isHovered: btnHoveredState.share
          },
          classes: CLASSES.wrapper.base,
          handlersBtn: {
            onClick: () => {
              console.log('click share')
            },
            onMouseEnter: () => {
              setBtnHoveredState((prev) => (
                { ...prev, share: !prev.share }))
            },
            onMouseLeave: () => {
              setBtnHoveredState((prev) => (
                { ...prev, share: !prev.share }))
            },
          }
        },
      ]

      return (
        <div className={CLASSES.btnGroup.base}>
          <div className={CLASSES.btnGroup.item}>
            <div className={iconsConfig[0].classes}>
              <Btn
                type="button"
                className={iconsConfig[0].typeBtn === 'watchNow' ? 'btn_primary' : "btn_secondary"}
                {...iconsConfig[0].handlersBtn}
              >
                {iconsConfig[0].titleBtn ? (
                  <div className={CLASSES.btn}>
                    <span className={CLASSES.title}>
                      {iconsConfig[0].titleBtn}
                    </span>
                    {<IconButton {...iconsConfig[0].propsIconBtn} />}
                  </div>)
                  : (
                    <IconButton {...iconsConfig[0].propsIconBtn} />
                  )}
              </Btn>
            </div>
          </div>
          <div className={CLASSES.btnGroup.item}>
            {iconsConfig.slice(1).map((item, index) => (
              <div className={item.classes} key={index}>
                <Btn
                  type="button"
                  className={item.typeBtn === 'watchNow' ? 'btn_primary' : "btn_secondary"}
                  {...item.handlersBtn}
                >
                  {item.titleBtn ? (
                    <div className={CLASSES.btn}>
                      <span className={CLASSES.title}>
                        {item.titleBtn}
                      </span>
                      {<IconButton {...item.propsIconBtn} />}
                    </div>)
                    : (
                      <IconButton {...item.propsIconBtn} />
                    )}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <>
        {renderUpper(logoImg)}
        <div className="series-content-header container">
          {renderBtnGroup()}
          <div className="series-content-header__title">
            <h2 className="title title_size_xl title_color_secondary title_weight_light">
              {data.title.value}
            </h2>
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
              {<MetaData
                type="full"
                rating={rating}
                dateRelease={data.dateRelease}
                ageRestriction={data.ageRestriction}
                genres={data.genres}
                description={season?.description ? season.description : data.description.mainDescription}
                directors={data.directors}
                actors={data.actors}
                country={data.country}
              />}
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
            <Seasons seasonsValue={seasonIndex ? Number(seasonIndex) : 0}
              mediaContentData={content} />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="series">
      {!loading && content && (
        <div className="series-bg">
          {renderBackgroundPage()}
        </div>
      )}
      <div className={"series-content"
        + (loading ? " series-content_loading" : "")}>
        {renderContent()}
      </div>
    </div >
  )
}
