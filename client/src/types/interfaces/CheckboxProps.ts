import { Dispatch, SetStateAction } from "react"

export interface CheckboxProps {
  getCheckedValue: Dispatch<SetStateAction<boolean>>
}
