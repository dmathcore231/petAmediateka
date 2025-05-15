import { Dispatch, SetStateAction } from "react"

export interface MyEditMenuProps {
  isShow: boolean
  countSelect: number
  setIsActiveEditMenu: Dispatch<SetStateAction<boolean>>
  setClickBtnDelete: Dispatch<SetStateAction<boolean>>
  setClickBtnSelectAll: Dispatch<SetStateAction<boolean>>
}
