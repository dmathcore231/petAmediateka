import { JSX } from "react"
import { Card } from "../Card"
import { useCheckBreakpoint } from "../../hooks"
import { CoverPromoProps } from "../../types/interfaces/CoverPromoProps"
import { CardProps } from "../../types/interfaces/CardProps"
import { defaultCardData } from "../../helpers"

export function CoverPromo({ coverPromoData, loading, error }: CoverPromoProps): JSX.Element {
  const BREAKPOINT_MD = useCheckBreakpoint(768)

  const cardProps: CardProps = {
    data: coverPromoData ? coverPromoData[0] : defaultCardData,
    styles: {
      cardSize: 'lm',
      flex: {
        body: {
          justifyContent: 'space-between'
        }
      },
      clipPath: {
        value: true,
        type: 'main'
      },
      ageRestrictionBadge: {
        position: 'right',
        size: 'sm'
      },
      boxShadow: false,
      btnGroup: false,
      hover: {
        scale: false,
        playBack: {
          value: true,
          type: 'default'
        },
        shadow: false
      }
    },
    settings: {
      title: {
        titleOutside: false,
        titleLogoImg: true,
        titleLogoImgIndex: null
      },
      badgeVisible: false,
      link: {
        linkType: 'allCard',
        linkDisabled: false
      },
      descriptionVisible: false,
      tags: null,
      cardSeries: false
    },
    loading: loading,
    error: error ? true : false,
    user: {
      auth: false,
      isFavoriteContent: false,
      handleFavoriteContent: () => { },
    }
  }

  const cardSecondProps: CardProps = {
    data: coverPromoData ? coverPromoData[1] : defaultCardData,
    styles: {
      cardSize: 'lm',
      flex: {
        body: {
          justifyContent: 'flex-end'
        }
      },
      clipPath: {
        value: true,
        type: 'main'
      },
      ageRestrictionBadge: null,
      boxShadow: false,
      btnGroup: true,
      hover: {
        scale: false,
        playBack: {
          value: false,
          type: 'default'
        },
        shadow: false
      }
    },
    settings: {
      title: {
        titleOutside: false,
        titleLogoImg: false,
        titleLogoImgIndex: null
      },
      badgeVisible: false,
      link: {
        linkType: 'title',
        linkDisabled: false
      },
      descriptionVisible: true,
      tags: {
        rating: 8,
        ageRestriction: 18,
        dateRelease: '2023',
        genres: ['Драма']
      },
      cardSeries: false
    },
    loading: loading,
    error: error ? true : false,
    user: {
      auth: false,
      isFavoriteContent: false,
      handleFavoriteContent: () => { },
    }
  }

  const mobileCardProps: CardProps = {
    data: coverPromoData ? coverPromoData[1] : defaultCardData,
    styles: {
      cardSize: 'lg',
      flex: {
        body: {
          justifyContent: 'space-between'
        }
      },
      clipPath: {
        value: true,
        type: 'main'
      },
      ageRestrictionBadge: {
        position: 'left',
        size: 'lg'
      },
      boxShadow: false,
      btnGroup: true,
      hover: {
        scale: false,
        playBack: {
          value: false,
          type: 'default'
        },
        shadow: false
      }
    },
    settings: {
      title: {
        titleOutside: false,
        titleLogoImg: true,
        titleLogoImgIndex: null
      },
      badgeVisible: true,
      link: {
        linkType: 'title',
        linkDisabled: false
      },
      descriptionVisible: true,
      tags: {
        rating: 8,
        ageRestriction: 18,
        dateRelease: '2023',
        genres: ['Драма']
      },
      cardSeries: false
    },
    loading: loading,
    error: error ? true : false,
    user: {
      auth: false,
      isFavoriteContent: false,
      handleFavoriteContent: () => { },
    }
  }

  const renderItems = (mobileBreakpoint: boolean): JSX.Element => {
    if (!mobileBreakpoint) {
      return (
        <>
          <div className="cover-promo__item">
            < Card {...cardProps} />
          </div>
          <div className="cover-promo__item">
            < Card {...cardSecondProps} />
          </div>
        </>
      )
    }

    return (
      <div className="cover-promo__item">
        < Card {...mobileCardProps} />
      </div>
    )
  }

  return (
    <div className="cover-promo">
      {renderItems(BREAKPOINT_MD)}
    </div>
  )
}
