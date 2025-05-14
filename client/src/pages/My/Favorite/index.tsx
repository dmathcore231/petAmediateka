import { JSX, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../hooks"
import { fetchGetFavoriteList } from "../../../services/my/myThunk"
import { MyEmpty } from "../MyEmpty"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"

const propsEmpty: MyEmptyProps = {
  title: "Ваш список избранного пуст",
  text: `Добавляйте любимые сериалы и фильмы в избранное,
  чтобы следить за выходом новых эпизодов
   и чтобы они всегда были под рукой`
}

export function Favorite(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.my)

  useEffect(() => {
    dispatch(fetchGetFavoriteList())
  }, [dispatch])

  const getFavoriteList = (list: string[] | undefined): JSX.Element => {
    if (!list || list.length === 0) {
      return (
        <MyEmpty {...propsEmpty} />
      )
    }

    return (
      <div className="my-favorite-list">
        Favorite List
      </div>
    )
  }

  return (
    <div className="my-favorite">
      {getFavoriteList(user?.userActionsData.favoritList)}
    </div>
  )
}
