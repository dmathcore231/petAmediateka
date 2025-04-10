import { JSX } from "react"
import { Card } from "../Card"
import { CoverPromoProps } from "../../types/interfaces/CoverPromoProps"
import { CardProps } from "../../types/interfaces/CardProps"
import { defaultCardData } from "../../helpers"
import { useAppSelector } from "../../hooks"

export function CoverPromo({ coverPromoData }: CoverPromoProps): JSX.Element {
  const { coverPromo: { loading, error } } = useAppSelector(state => state.content)

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
      },
      descriptionVisible: false,
      tags: null,
      cardSeries: false
    },
    loadingCardData: loading,
    error: error ? true : false
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
      },
      descriptionVisible: true,
      tags: {
        raiting: 8,
        ageRestriction: 18,
        dateRelease: '2023',
        genres: ['Драма']
      },
      cardSeries: false
    },
    loadingCardData: loading,
    error: error ? true : false
  }

  return (
    <div className="cover-promo">
      <div className="cover-promo__item">
        < Card {...cardProps} />
      </div>
      <div className="cover-promo__item">
        < Card {...cardSecondProps} />
      </div>
    </div>
  )
}
