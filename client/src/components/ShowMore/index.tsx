import { useState } from "react"
import { Btn } from "../Btn"
import { ShowMoreProps } from "../../types/interfaces/ShowMoreProps"
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon"
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon"

export function ShowMore({ data }: ShowMoreProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const handleToggleIsShow = () => {
    setIsShow(!isShow)
  }

  return (
    <div className="show-more">
      <div className="show-more__title">
        <h3>{data.title}</h3>
      </div>
      <div className={"show-more__discription title" + (isShow ? " show-more__discription_show" : "")}>
        {data.description}
      </div>
      <div className="show-more__btn-wrapper">
        <Btn
          type="button"
          className="btn_transparent btn_transparent_color_gray"
          onClick={handleToggleIsShow}
        >
          <div className="show-more__btn title">
            {isShow
              ? (<>
                Скрыть описание
                <ArrowUpIcon width={18} height={18} />
              </>)
              : (<>
                Показать ещё
                <ArrowDownIcon width={18} height={18} />
              </>)
            }
          </div>
        </Btn>
      </div>
    </div>
  )
}
