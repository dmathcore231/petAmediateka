import { JSX } from "react"
import { RootState } from "../../redux/store"

export interface HomeSectionProps<T> {
  selectData: (state: RootState) => T
  render: (data: T) => JSX.Element
}
