import { useState, JSX } from "react"
import { Btn } from "../Btn"
import { ShowMoreProps } from "../../types/interfaces/ShowMoreProps"
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon"
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon"

export function ShowMore({ data }: ShowMoreProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const handleToggleIsShow = (): void => {
    setIsShow(!isShow)
  }

  const setClassesDiscription = (isShow: boolean): string => {
    const baseClass = "show-more__discription"
    const isShowClass = isShow ? " show-more__discription_show" : ""

    return `${baseClass}${isShowClass}`
  }

  const renderBtnMore = (isShow: boolean): JSX.Element => {
    const icon = isShow
      ? <ArrowUpIcon width={18} height={18} />
      : <ArrowDownIcon width={18} height={18} />
    const text = isShow
      ? "Скрыть описание"
      : "Показать ещё"

    return (
      <div className="show-more__btn title">
        {text}
        {icon}
      </div>
    )
  }

  return (
    <div className="show-more">
      <div className="show-more__title">
        <h3>{data.title}</h3>
      </div>
      <div className={setClassesDiscription(isShow)}>
        {data.description}
      </div>
      <div className="show-more__btn-wrapper">
        <Btn
          type="button"
          className="btn_transparent btn_transparent_color_gray"
          onClick={handleToggleIsShow}
        >
          {renderBtnMore(isShow)}
        </Btn>
      </div>
    </div>
  )
}
