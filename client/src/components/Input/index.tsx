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

  return (
    <div className="input-wrapper">
      <div className="input__item">
        <input
          type={checkPassword ? (isVisiblePass ? "text" : "password") : type}
          id={id}
          className={"input" + (className ? ` ${className}` : "") +
            (errorState.value ? " input_error" : "")}
          required={required}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleError}
        />
        <span className={"input__placeholder" + (value ? " input__placeholder_scaled" : "") + (errorState.value ? " input__placeholder_error" : "")}>
          {placeholder}
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
          className={"input__label" + (label.labelInvisible ? " input__label_invisible" : "") +
            " text text_size_sm text_color_secondary-active"}
        >
          {label.value}
        </label>
      )}
    </div>
  )
}
