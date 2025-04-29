import { JSX } from "react"
import { useAppSelector } from "../../../hooks"
import { MyEmpty } from "../MyEmpty"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"

const propsEmpty: MyEmptyProps = {
  title: "Ваш список покупок пуст",
  text: `Здесь будут сериалы и фильмы, которые вы купили навсегда или взяли в аренду, доступные для всех профилей вашего аккаунта`
}

const getPurchaseList = (list: [] | undefined): JSX.Element => {
  if (!list || list.length === 0) {
    return (
      <MyEmpty {...propsEmpty} />
    )
  }

  return (
    <div className="list">
      Purchase List
    </div>
  )
}

export function Purchase(): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)
  return (
    <div className="profile-purchase">
      {getPurchaseList(user?.userActionsData.disliked)}
    </div>
  )
}
