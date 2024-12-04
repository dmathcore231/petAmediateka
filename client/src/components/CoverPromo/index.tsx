import { Card } from "../Card"
import { CardData, CardStyles } from "../../types/Card"

export function CoverPromo(): JSX.Element {

  const cardDataTemplate: CardData<string> = {

    link: {
      type: 'allCard',
      value: '/'
    },
    title: {
      type: "img",
      value: "/coverPromo/title.png"
    },
    imgBg: "/coverPromo/bg-promo.jpg",
    ageRestriction: 18,
  }

  const cardDataTemplateSecond: CardData<string> = {

    link: {
      type: 'title',
      value: '/'
    },
    imgBg: "/coverPromo/bg-card.jpg",
    description: "Арт-эксперт в эмоциональном упадке и торговец антиквариатом объединяются, чтобы обогатиться. Смогут ли они выйти сухими из воды?",
    tags: {
      raiting: 8,
      ageRestriction: 18,
      dateRelease: '2023',
      genres: ['Драма', 'Триллер']
    }
  }

  const cardStyles: CardStyles[] = [
    {
      cardSize: 'lm',
      flex: {
        body: {
          justifyContent: 'space-between'
        }
      },
      clipPath: true,
      ageRestrictionBadge: {
        position: 'right',
        size: 'lm'
      },
      boxShadow: false,
      btnGroup: false,
      hover: {
        scale: false,
        playBack: {
          value: true,
          type: 'bottom-more'
        },
        shadow: false
      }
    },
    {
      cardSize: 'lm',
      flex: {
        body: {
          justifyContent: 'flex-end'
        }
      },
      clipPath: true,
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
          type: null
        },
        shadow: false
      }
    }
  ]

  return (
    <div className="cover-promo">
      <div className="cover-promo__item">
        < Card data={cardDataTemplate} styles={cardStyles[0]} />
      </div>
      <div className="cover-promo__item">
        < Card data={cardDataTemplateSecond} styles={cardStyles[1]} />
      </div>
    </div>
  )
}
