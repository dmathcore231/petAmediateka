import { JSX } from "react"
import { Btn } from "../Btn"
import { MyEditMenuProps } from "../../types/interfaces/MyEditMenuProps"

const TEXT: Record<string, string> = {
  selectAll: "Выбрать все",
  delete: "Удалить выбранное",
  cancel: "Отмена",
}

export function MyEditMenu({ isShow, countSelect, setIsActiveEditMenu, setClickBtnDelete, setClickBtnSelectAll }: MyEditMenuProps): JSX.Element | null {
  if (!isShow) return null

  const toggleTextCountSelect = (countSelect: number): string => {
    const TEXT: Record<string, string> = {
      default: "Ничего не выбрано",
      more: `Выбрано ${countSelect}`,

    }
    if (countSelect === 0) return TEXT.default

    return TEXT.more
  }

  return (
    <div className="my-edit-menu container">
      <div className="my-edit-menu__item">
        {toggleTextCountSelect(countSelect)}
      </div>
      <div className="my-edit-menu__item">
        <div className="my-edit-menu__btn">
          <Btn
            type="button"
            className="btn btn_primary"
            onClick={() => setClickBtnSelectAll(true)}
          >
            {TEXT.selectAll}
          </Btn>
          <Btn
            type="button"
            className="btn btn_primary"
            onClick={() => setClickBtnDelete(true)}
            disabled={countSelect === 0}
          >
            {TEXT.delete}
          </Btn>
          <Btn
            type="button"
            className="btn btn_secondary"
            onClick={() => setIsActiveEditMenu(false)}
          >
            {TEXT.cancel}
          </Btn>
        </div>
      </div>
    </div >
  )
}
