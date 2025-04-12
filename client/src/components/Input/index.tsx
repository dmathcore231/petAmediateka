import { useState, useEffect, JSX } from "react"
import { InputProps } from "../../types/interfaces/InputProps"
import { InputErrorState } from "../../types/Input"
import { EyeIcon } from "../../assets/icons/EyeIcon"

export function Input({ type, id, label, required, onChange, value, placeholder, className, name, error, btnInInput, checkPassword }: InputProps): JSX.Element {
  const defaultStateError: InputErrorState = { value: false, errorData: null }

  const [errorState, setErrorState] = useState<InputErrorState>(defaultStateError)
  const [isVisiblePass, setIsVisiblePass] = useState(false)

  useEffect(() => {
    if (value === '') {
      setErrorState(defaultStateError)
    }
  }, [value])

  useEffect(() => {
    if (error) {
      setErrorState(error)
    }
  }, [error])

  const handleValidEmail = (emailValue: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(emailValue.toLowerCase()) || emailValue === ''

    setErrorState(
      isValidEmail
        ? defaultStateError
        : {
          value: true,
          errorData: {
            field: "email",
            message: null
          }
        }
    )
  }

  const handleValidPassword = (): void => {
    if (value && value.length >= 6) {
      return setErrorState(defaultStateError)
    } else {
      return setErrorState({
        value: true,
        errorData: {
          field: "password",
          message: null
        }
      }
      )
    }
  }

  const handleIsVisiblePass = (): void => {
    setIsVisiblePass(!isVisiblePass)
  }

  const handleError = (): void => {
    if (type === "email" && !checkPassword && value) {
      return handleValidEmail(value)
    } else {
      return handleValidPassword()
    }
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

  const setClassInput = (className: string | undefined, errorState: boolean): string => {
    const mapClass = [
      { className: "input", condition: true },
      { className: "input_error", condition: errorState },
      { className: className, condition: className ? true : false },
    ]

    return mapClass.filter(item => item.condition)
      .map(item => item.className)
      .join(" ")
  }

  return (
    <div className="input-wrapper">
      <div className="input__item">
        <input
          type={checkPassword ? (isVisiblePass ? "text" : "password") : type}
          id={id}
          className={setClassInput(className, errorState.value)}
          required={required}
          value={value}
          name={name}
          placeholder={placeholder?.value}
          onChange={onChange}
          onBlur={handleError}
        />
        <span className={setClassPlaceholder(value, errorState.value)}>
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
          className={setClassLabel(label.labelInvisible, errorState.value)}
        >
          {label.value}
        </label>
      )}
    </div>
  )
}
