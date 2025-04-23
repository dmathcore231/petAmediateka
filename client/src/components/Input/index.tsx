import { useState, JSX } from "react"
import { InputProps } from "../../types/interfaces/InputProps"
import { EyeIcon } from "../../assets/icons/EyeIcon"

export function Input({ type, id, label, required, onChange, value, placeholder, className, name, error, btnInInput, checkPassword }: InputProps): JSX.Element {
  const checkError: boolean = error?.value ? true : false

  const [isVisiblePass, setIsVisiblePass] = useState(false)

  const handleIsVisiblePass = (): void => {
    setIsVisiblePass(!isVisiblePass)
  }

  const setClassPlaceholder = (value: string | undefined, errorState: boolean): string => {
    const mapClass = [
      { className: "input__placeholder", condition: true },
      { className: "input__placeholder_scaled", condition: !!value },
      { className: "input__placeholder_error", condition: errorState },
    ]

    return mapClass.filter((item) => item.condition)
      .map((item) => item.className)
      .join(" ")
  }

  const setClassLabel = (labelInvisible: boolean, errorState: boolean): string => {
    const mapClass = [
      { className: "input__label", condition: true },
      { className: "input__label_invisible", condition: labelInvisible },
      { className: "input__label_error", condition: errorState },
    ]

    return mapClass.filter(item => item.condition)
      .map(item => item.className)
      .join(" ") + " text text_size_sm text_color_secondary-active"
  }

  const setClassInput = (className: string | undefined, isError: boolean): string => {
    const mapClass = [
      { className: "input", condition: true },
      { className: "input_error", condition: isError },
      { className: className, condition: className ? true : false },
    ]

    return mapClass.filter(item => item.condition)
      .map(item => item.className)
      .join(" ")
  }

  const toggleTypeInput = (isVisiblePass: boolean) => {
    return isVisiblePass
      ? "text"
      : "password"
  }

  return (
    <div className="input-wrapper">
      <div className="input__item">
        <input
          type={checkPassword ? (toggleTypeInput(isVisiblePass)) : type}
          id={id}
          className={setClassInput(className, checkError)}
          required={required}
          value={value}
          name={name}
          placeholder={placeholder?.value}
          onChange={onChange}
        />
        <span className={setClassPlaceholder(value, checkError)}>
          {placeholder?.value}
        </span>
        {btnInInput && (
          <span className="input__btn">
            {btnInInput}
          </span>
        )}
        {checkPassword && (
          <div className="input__check-password"
            onClick={handleIsVisiblePass}
          >
            <EyeIcon width={22} height={15} />
          </div>
        )}
      </div>
      {label.value && (
        <label
          htmlFor={id}
          className={setClassLabel(label.labelInvisible, checkError)}
        >
          {label.value}
        </label>
      )}
    </div>
  )
}
