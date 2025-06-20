import { JSX } from "react"
import { useCheckBreakpoint } from "../../hooks"
import { CardData } from "../../types/Card"
import { SeasonsProps } from "../../types/interfaces/SeasonsProps"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { Slider } from "../Slider"

export function Seasons({ seasonsValue, mediaContentData }: SeasonsProps): JSX.Element | null {
  const baseClass: string = "seasons"
  const listClass: string = `${baseClass}-list`
  const listItemClass: string = `${listClass}__item`
  const titleClasses: string = "title title_size_l title_align_left container"
  const BREAKPOINT_XL = useCheckBreakpoint(1200)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const BREAKPOINT_SM = useCheckBreakpoint(576)

  const setQuantityListItems = (maxSize: boolean) => {
    if (BREAKPOINT_SM) return 1

    if (BREAKPOINT_MD) return 2

    if (BREAKPOINT_XL) return maxSize ? 4 : 3

    return maxSize ? 5 : 4
  }

  const formCardData = (seasonsIndex: number): CardData[] | null => {
    if (!mediaContentData.seasons) return null

    const cardData: CardData[] = mediaContentData.seasons[seasonsIndex].episodes.map((item) => {
      return {
        _id: mediaContentData._id,
        type: mediaContentData.type,
        title: {
          ...mediaContentData.data.title,
          value: item.title,
        },
        badge: mediaContentData.data.badge,
        ageRestriction: mediaContentData.data.ageRestriction,
        description: mediaContentData.data.description.prewiewDescription,
        bg: {
          imgUrl: mediaContentData.bg.imgUrl,
          videoUrl: mediaContentData.bg.videoUrl,
          imgResizeUrl: item.imgPreview,
          sourceUrls: [item.imgPreview]
        },
        logoImg: mediaContentData.logoImg,
        link: `#`,
        src: item.link
      }
    })

    return cardData
  }

  const renderSeasonsSlider = (seasonsIndex: number): JSX.Element => {
    const sliderProps: SliderProps = {
      sliderSettings: {
        typeSlider: 'multi',
        pagination: false,
        autoSwipe: false,
        lastSwipe: true,
        quantityListItems: setQuantityListItems(true),
        mediaPlayerHandler: true
      },
      sliderData: {
        data: formCardData(seasonsIndex),
        cardStyles: {
          cardSize: 'md',
          flex: {
            body: {
              justifyContent: 'space-between'
            }
          },
          clipPath: {
            value: false,
            type: null
          },
          ageRestrictionBadge: null,
          boxShadow: false,
          btnGroup: false,
          hover: {
            scale: true,
            playBack: {
              value: false,
              type: null
            },
            shadow: true
          }
        },
        settings: {
          title: {
            titleOutside: true,
            titleLogoImg: false,
            titleLogoImgIndex: null
          },
          badgeVisible: false,
          link: {
            linkType: 'allCard',
            linkDisabled: false
          },
          descriptionVisible: false,
          tags: null,
          cardSeries: true
        },
        loadingData: false,
        errorData: false
      },
      userState: {
        user: null
      }
    }

    return <Slider {...sliderProps} />
  }

  if (!mediaContentData.seasons) return null

  return (
    <div className={baseClass}>
      {seasonsValue === 0 && (
        <div className={listClass}>
          {mediaContentData.seasons.map((_, index) => (
            <div className={listItemClass} key={index}>
              <div className="seasons-list__title">
                <h3 className={titleClasses}>
                  {`Сезон ${index + 1}`}
                </h3>
                {renderSeasonsSlider(index)}
              </div>
            </div>
          ))}
        </div>
      )}
      {seasonsValue > 0 && (
        <div className={listClass}>
          <div className={listItemClass}>
            <div className="seasons-list__title">
              <h3 className={titleClasses}>
                {`Сезон ${seasonsValue}`}
              </h3>
              {renderSeasonsSlider(seasonsValue - 1)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
