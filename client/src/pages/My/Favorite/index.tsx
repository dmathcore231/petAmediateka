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
import { SelectIcon } from "../../../assets/icons/SelectIcon"

const propsEmpty: MyEmptyProps = {
  title: "Ваш список избранного пуст",
  text: `Добавляйте любимые сериалы и фильмы в избранное,
  чтобы следить за выходом новых эпизодов
   и чтобы они всегда были под рукой`
}
const TEXT: Record<string, string> = {
  titleBtnEdit: "Редактировать избранное",
}

export function Favorite(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user, loading, favoriteList, initializedData } = useAppSelector(state => state.my)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isActiveEditMenu, setIsActiveEditMenu] = useState(false)
  const [clickBtnDelete, setClickBtnDelete] = useState(false)
  const [clickBtnSelectAll, setClickBtnSelectAll] = useState(false)
  const cardSetting: CardSetting = {
    title: {
      titleOutside: true,
      titleLogoImg: false,
      titleLogoImgIndex: null
    },
    badgeVisible: false,
    link: {
      linkType: 'allCard',
      linkDisabled: isActiveEditMenu
    },
    descriptionVisible: false,
    tags: null,
    cardSeries: false
  }

  const myEditMenuProps: MyEditMenuProps = {
    isShow: isActiveEditMenu,
    countSelect: selectedItems.length,
    setIsActiveEditMenu,
    setClickBtnDelete,
    setClickBtnSelectAll
  }

  useEffect(() => {
    if (!loading && user && initializedData) {
      dispatch(fetchGetFavoriteList())
    }
  }, [dispatch, initializedData, loading, user])

  const handleSelectItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems(prev => [...prev, item])
    } else {
      setSelectedItems(prev => prev.filter(id => id !== item))
    }
  }

  const getFavoriteList = (listData: CardData[] | null): JSX.Element => {
    const cardStyles: CardStyles = {
      cardSize: 'md',
      flex: { body: { justifyContent: 'space-between' } },
      clipPath: { value: false, type: null },
      ageRestrictionBadge: { position: 'left', size: 'sm' },
      boxShadow: false,
      btnGroup: false,
      hover: {
        scale: true,
        playBack: { value: false, type: null },
        shadow: true
      },
    }

    const cardActiveStyles: CardStyles = {
      ...cardStyles,
      bg: { border: { color: 'primary' } }
    }

    if (!listData || listData.length === 0) {
      return (
        <MyEmpty {...propsEmpty} />
      )
    }

    const toggleIsActiveCard = (id: string, isActive: boolean) => {
      if (selectedItems.includes(id) && isActive) {
        return cardActiveStyles
      }
      return cardStyles
    }

    const renderSelectIcon = (id: string, isActiveEditMenu: boolean): JSX.Element | null => {
      const baseClass = 'my-favorite-list__icon'
      const isActiveClass = ` ${baseClass}_active`

      const setClass = (id: string) => selectedItems.includes(id)
        ? `${baseClass}${isActiveClass}`
        : `${baseClass}`

      if (isActiveEditMenu) {
        return (
          <span className={setClass(id)}>
            <SelectIcon width={24} height={24} />
          </span>
        )
      } else {
        return null
      }
    }

    return (
      <div className="my-favorite-list">
        {listData.map((item, index) => (
          <div className="my-favorite-list__item"
            key={index}
            onClick={() => handleSelectItem(item._id)}
          >
            {renderSelectIcon(item._id, isActiveEditMenu)}
            <Card
              data={item}
              loadingCardData={false}
              error={false}
              styles={toggleIsActiveCard(item._id, isActiveEditMenu)}
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
