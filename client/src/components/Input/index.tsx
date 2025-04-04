import { useState, useEffect } from "react"
import { InputProps } from "../../types/interfaces/InputProps"
import { InputErrorState } from "../../types/Input"
import { EyeIcon } from "../../assets/icons/EyeIcon"

export function Input({ type, id, label, required, onChange, value, placeholder, className, name, error, btnInInput, checkPassword }: InputProps): JSX.Element {
  const [errorState, setErrorState] = useState<InputErrorState>({ value: false, errorData: null })
  const [isVisiblePass, setIsVisiblePass] = useState(false)

  useEffect(() => {
    if (value === '') {
      setErrorState({ value: false, errorData: null })
    }
  }, [value])

  useEffect(() => {
    if (error) {
      setErrorState(error)
    }
  }, [error])

  const handleValidEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(value).toLowerCase()) || value === '') {
      return setErrorState({ value: false, errorData: null })
    } else {
      return setErrorState({
        value: true,
        errorData: {
          field: "email",
          message: null
        }
      }
      )
    }
  }

  const handleValidPassword = () => {
    if (value && value.length >= 6) {
      return setErrorState({ value: false, errorData: null })
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

  const handleIsVisiblePass = () => {
    setIsVisiblePass(!isVisiblePass)
  }

  const handleError = () => {
    if (type === "email" && !checkPassword) {
      return handleValidEmail()
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
