import { JSX } from "react"
import { useAppSelector } from "../../../hooks"
import { MyEmpty } from "../MyEmpty"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"

const propsEmpty: MyEmptyProps = {
  title: "Ваш список избранного пуст",
  text: `Добавляйте любимые сериалы и фильмы в избранное,
  чтобы следить за выходом новых эпизодов
   и чтобы они всегда были под рукой`
}

export function Favorite(): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)

  const getFavoriteList = (list: [] | undefined): JSX.Element => {
    if (!list || list.length === 0) {
      return (
        <MyEmpty {...propsEmpty} />
      )
    }

    return (
      <div className="list">
        Favorit List
      </div>
    )
  }

  return (
    <div className="my-favorite">
      {getFavoriteList(user?.userActionsData.favoritList)}
    </div>
  )
}
