import { CheckIcon } from "../../assets/icons/CheckIcon"

export function Checkbox(): JSX.Element {
  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox-input" />
      <span className="checkbox__icon">
        <CheckIcon width={16} height={16} />
      </span>
      <div className="checkbox__label text text_size_xs">
        Я согласен с условиями пользовательского соглашения и даю свое согласие на обработку моих персональных данных
      </div>
    </label>
  )
}
