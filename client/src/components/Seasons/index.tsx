import { CardData } from "../../types/Card"
import { SeasonsProps } from "../../types/interfaces/SeasonsProps"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { Slider } from "../Slider"

export function Seasons({ seasonsValue, mediaContentData }: SeasonsProps): JSX.Element {
  const formCardData = (seasonsIndex: number): CardData[] | null => {
    if (mediaContentData && mediaContentData.seasons) {
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
            imgResizeUrl: item.imgPreview
          },
          logoImg: mediaContentData.logoImg,
          link: item.link
        }
      })

      return cardData
    } else {
      return null
    }
  }

  const renderSeasonsSlider = (seasonsIndex: number): JSX.Element => {
    const sliderProps: SliderProps = {
      sliderSettings: {
        typeSlider: 'multi',
        pagenation: false,
        autoSwipe: false,
        lastSwipe: true,
        quantityListItems: 5
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
          clipPath: false,
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
            titleLogoImg: false
          },
          badgeVisible: false,
          link: {
            linkType: 'allCard',
          },
          descriptionVisible: false,
          tags: null,
          cardSeries: false
        },
        loadingData: false,
        errorData: false
      },
    }

    return <Slider {...sliderProps} />
  }

  return (
    <div className="seasons">
      {seasonsValue === 0 && mediaContentData.seasons && (
        <div className="seasons-list">
          {mediaContentData.seasons.map((season, index) => (
            <div className="seasons-list__item" key={index}>
              <div className="seasons-list__title">
                <h3 className="title title_size_l title_align_left container">{`Сезон ${index + 1}`}</h3>
                {renderSeasonsSlider(index)}
              </div>
            </div>
          ))}
        </div>
      )}
      {seasonsValue > 0 && mediaContentData.seasons && (
        <div className="seasons-list">
          <div className="seasons-list__item">
            <div className="seasons-list__title">
              <h3 className="title title_size_l title_align_left container">{`Сезон ${seasonsValue}`}</h3>
              {renderSeasonsSlider(seasonsValue - 1)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
