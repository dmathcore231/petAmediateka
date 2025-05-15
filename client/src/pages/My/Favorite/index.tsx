import { JSX, useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../../hooks"
import { fetchGetFavoriteList } from "../../../services/my/myThunk"
import { MyEmpty } from "../MyEmpty"
import { Card } from "../../../components/Card"
import { Btn } from "../../../components/Btn"
import { MyEditMenu } from "../../../components/MyEditMenu"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"
import { CardStyles, CardSetting, CardData } from "../../../types/Card"
import { MyEditMenuProps } from "../../../types/interfaces/MyEditMenuProps"

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

const TEXT: Record<string, string> = {
  titleBtnEdit: "Редактировать избранное",
}

export function Favorite(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user, loading, favoriteList, initializedData } = useAppSelector(state => state.my)
  const [countSelect, setCountSelect] = useState(0)
  const [isActiveEditMenu, setIsActiveEditMenu] = useState(false)
  const [clickBtnDelete, setClickBtnDelete] = useState(false)
  const [clickBtnSelectAll, setClickBtnSelectAll] = useState(false)

  const myEditMenuProps: MyEditMenuProps = {
    isShow: isActiveEditMenu,
    countSelect,
    setIsActiveEditMenu,
    setClickBtnDelete,
    setClickBtnSelectAll
  }

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
          <div className="my-favorite-list__item" key={index}>
            <Card
              data={item}
              loadingCardData={false}
              error={false}
              styles={cardStyles}
              settings={cardSetting}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="my-favorite">
      <div className="my-favorite__btn">
        <Btn
          type="button"
          className="btn btn_white btn_white_outline"
          onClick={() => setIsActiveEditMenu(prev => !prev)}
        >
          {TEXT.titleBtnEdit}
        </Btn>
      </div>
      <MyEditMenu {...myEditMenuProps} />
      {getFavoriteList(favoriteList)}
    </div>
  )
}
