import { useState, useEffect } from "react"
import { InputProps } from "../../types/interfaces/InputProps"
import { InputErrorState } from "../../types/Input"

export function Input({ type, id, label, required, onChange, value, placeholder, className, name, error, btnInInput }: InputProps): JSX.Element {

  const [errorState, setErrorState] = useState<InputErrorState>({ value: false, errorData: null })

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

  return (
    <div className="input-wrapper">
      <div className="input__item">
        <input
          type={type}
          id={id}
          className={"input" + (className ? ` ${className}` : "") +
            (errorState.value ? " input_error" : "")}
          required={required}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleValidEmail}
        />
        <span className={"input__placeholder" + (value ? " input__placeholder_scaled" : "") + (errorState.value ? " input__placeholder_error" : "")}>
          {placeholder}
        </span>
        {btnInInput && (
          <span className="input__btn">
            {btnInInput}
          </span>
        )}
      </div>
      {label.value && (
        <label
          htmlFor={id}
          className={label.labelInvisible ? "input__label input__label_invisible" : "input__label"}
        >
          {label.value}
        </label>
      )}
    </div>
  )
}
