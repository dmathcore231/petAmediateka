import { JSX } from "react"
import { CheckIcon } from "../../assets/icons/CheckIcon"
import { CheckboxProps } from "../../types/interfaces/CheckboxProps"

export function Checkbox({ getCheckedValue }: CheckboxProps): JSX.Element {
  const textLebel = "Я согласен с условиями пользовательского соглашения и даю свое согласие на обработку моих персональных данных"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    getCheckedValue(e.target.checked)
  }

  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox-input" onChange={handleChange} />
      <span className="checkbox__icon">
        <CheckIcon width={16} height={16} />
      </span>
      <div className="checkbox__label text text_size_xs">
        {textLebel}
      </div>
    </label>
  )
}
