import { JSX, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../hooks"
import { fetchGetFavoriteList } from "../../../services/my/myThunk"
import { MyEmpty } from "../MyEmpty"
import { Card } from "../../../components/Card"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"
import { CardStyles, CardSetting, CardData } from "../../../types/Card"

const propsEmpty: MyEmptyProps = {
  title: "Ваш список избранного пуст",
  text: `Добавляйте любимые сериалы и фильмы в избранное,
  чтобы следить за выходом новых эпизодов
   и чтобы они всегда были под рукой`
}

const cardStyles: CardStyles = {
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
  ageRestrictionBadge: {
    position: 'left',
    size: 'sm'
  },
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
}
const cardSetting: CardSetting = {
  title: {
    titleOutside: true,
    titleLogoImg: false,
    titleLogoImgIndex: null
  },
  badgeVisible: false,
  link: {
    linkType: 'allCard',
  },
  descriptionVisible: false,
  tags: null,
  cardSeries: false
}

export function Favorite(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user, loading, favoriteList, initializedData } = useAppSelector(state => state.my)

  useEffect(() => {
    if (!loading && user && initializedData) {
      dispatch(fetchGetFavoriteList())
    }
  }, [dispatch, initializedData, loading, user])


  const getFavoriteList = (listData: CardData[] | null): JSX.Element => {
    if (!listData || listData.length === 0) {
      return (
        <MyEmpty {...propsEmpty} />
      )
    }

    return (
      <div className="my-favorite-list">
        {listData.map((item, index) => (
          <div className="my-favorite-list__item">
            <Card
              data={item}
              loadingCardData={false}
              error={false}
              styles={cardStyles}
              settings={cardSetting}
              key={index}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="my-favorite">
      {getFavoriteList(favoriteList)}
    </div>
  )
}
