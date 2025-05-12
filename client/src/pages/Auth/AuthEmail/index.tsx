import { useState, FormEvent, useEffect, JSX } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../hooks"
import { Input } from "../../../components/Input"
import { Btn } from "../../../components/Btn"
import { AuthEmailProps } from "../../../types/interfaces/AuthProps"
import { InputErrorState } from "../../../types/Input"
import { setTextAuth } from "../../../helpers/index"
import { CloseIcon } from "../../../assets/icons/CloseIcon"
import { InputProps } from "../../../types/interfaces/InputProps"
import { ErrorDataInResponse } from "../../../types/Error"

export function AuthEmail({ setEmailValue, type }: AuthEmailProps): JSX.Element {
  const defaultErrorState: InputErrorState = { value: false, errorData: null }

  const { error } = useAppSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [errorInput, setErrorInput] = useState<InputErrorState>(defaultErrorState)

  useEffect(() => {
    const isRelevantError = error?.numberError === 101 || error?.numberError === 103
    const isEmailMatch = error?.value === email

    if (error && isRelevantError && isEmailMatch) {
      setErrorInput({
        value: true,
        errorData: {
          field: "email",
          message: error.message
        }
      })
    } else {
      setErrorInput(defaultErrorState)
    }
  }, [error, email])

  const toggleDisableBtn = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email === error?.value) return true

    return !emailRegex.test(email.toLowerCase())
  }

  const toggleErrorLabel = (email: string, errorData: ErrorDataInResponse | null): InputProps["label"] => {
    if (errorData?.value === email) return { value: errorData.message, labelInvisible: false }

    return { value: null, labelInvisible: true }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailValue((prev) => ({ ...prev, email }))
  }

  const renderLink = (typePage: 'signUp' | 'signIn'): JSX.Element => {
    const linkClasses = "link link_primary link_color_white link_font-size_sm"
    const text: Record<string, { preLink: string, link: string }> = {
      signUp: {
        preLink: "Уже есть аккаунт?",
        link: "Вход",
      },
      signIn: {
        preLink: "Нет аккаунта?",
        link: "Зарегистрироваться",
      }
    }

    if (typePage === 'signUp') {
      return (
        <>
          {text.signUp.preLink}
          <Link to="/auth/signin" className={linkClasses}>
            {text.signUp.link}
          </Link>
        </>
      )
    }

    return (
      <>
        {text.signIn.preLink}
        <Link to="/auth/signup" className={linkClasses}>
          {text.signIn.link}
        </Link>
      </>
    )
  }

  return (
    <div className="auth-menu">
      <div className="auth-menu__item">
        <h4 className="auth-menu__pre-title">
          {setTextAuth(type, "preTitle")}
        </h4>
        <div className="auth-menu__close-btn">
          <Link to="/" className="btn btn_transparent auth-menu__close-btn">
            <CloseIcon width={15} height={15} className="auth-menu__close-icon" />
          </Link>
        </div>
      </div>
      <div className="auth-menu__item">
        <h1 className="auth-menu__title title title_size_l">
          {setTextAuth(type, "title")}
        </h1>
      </div>
      <div className="auth-menu__item">
        <form className="form auth-email" onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            label={toggleErrorLabel(email, error)}
            required
            placeholder={{
              type: "scale",
              value: "Email"
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errorInput}
          />
          <Btn
            type="submit"
            className="btn_primary"
            disabled={toggleDisableBtn(email)}
          >
            Продолжить
          </Btn>
        </form>
      </div>
      <div className="auth-menu__item auth-menu__item_flex_center">
        {renderLink(type)}
      </div>
    </div>
  )
}
