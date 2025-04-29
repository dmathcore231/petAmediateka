import { JSX } from "react"
import { useAppSelector } from "../../../hooks"
import { MyEmpty } from "../MyEmpty"
import { MyEmptyProps } from "../../../types/interfaces/MyEmptyProps"

const propsEmpty: MyEmptyProps = {
  title: "История пуста",
  text: `Здесь будет список сериалов и фильмов,
  которые вы уже смотрели`
}

const getHistoryList = (list: [] | undefined): JSX.Element => {
  if (!list || list.length === 0) {
    return (
      <MyEmpty {...propsEmpty} />
    )
  }

  return (
    <div className="list">
      History List
    </div>
  )
}

export function History(): JSX.Element {
  const { user, loading } = useAppSelector(state => state.auth)

  return (
    <div className="my-history">
      {getHistoryList(user?.userActionsData.historyList)}
    </div>
  )
}
