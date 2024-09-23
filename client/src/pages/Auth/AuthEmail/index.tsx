import { useState, FormEvent, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { resetStatusResponse } from "../../../redux/statusResponseSlice"
import { Input } from "../../../components/Input"
import { Btn } from "../../../components/Btn"
import { AuthEmailProps } from "../../../types/interfaces/AuthProps"
import { InputErrorState } from "../../../types/Input"
import { CloseIcon } from "../../../assets/icons/CloseIcon"

export function AuthEmail({ setEmailValue, type }: AuthEmailProps): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { error } = useAppSelector(state => state.statusResponse)
  const [email, setEmail] = useState('')
  const [errorInput, setErrorInput] = useState<InputErrorState>({ value: false, errorData: null })

  useEffect(() => {
    dispatch(resetStatusResponse())
  }, [])

  useEffect(() => {
    if (error && (error.numberError === 101 || 103) && email === error.value) {
      setErrorInput({
        value: true,
        errorData: {
          field: "email",
          message: error.message
        }
      })
    } else {
      setErrorInput({ value: false, errorData: null })
    }
  }, [error, email])

  const toggleDisableBtn = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (re.test(String(email).toLowerCase())) {
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailValue((prev) => ({ ...prev, email }))
  }

  const toggleInputError = () => {
    if (error && (error.numberError === 101 || 103) && email === error.value) {
      const err: InputErrorState = {
        value: true,
        errorData: {
          field: "email",
          message: error.message
        }
      }
      return err
    } else {
      return { value: false, errorData: null }
    }
  }

  return (
    <div className="auth-menu">
      <div className="auth-menu__item">
        <h4 className="auth-menu__pre-title">
          {type === "signUp" ? "Регистрация" : "Вход"}
        </h4>
        <div className="auth-menu__close-btn">
          <Link to="/" className="btn btn_transparent auth-menu__close-btn">
            <CloseIcon width={15} height={15} className="auth-menu__close-icon" />
          </Link>
        </div>
      </div>
      <div className="auth-menu__item">
        <h1 className="auth-menu__title title title_size_l">
          {type === "signUp" ? "Создайте аккаунт" : "Войдите в свой аккаунт"}
        </h1>
      </div>
      <div className="auth-menu__item">
        <form className="form auth-email" onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            label={error && error.value === email && (error.numberError === 101 || 103)
              ? { value: error.message, labelInvisible: false }
              : { value: null, labelInvisible: true }}
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errorInput}
          />
          <Btn
            type="submit"
            className="btn_primary"
            disabled={toggleDisableBtn()}
          >
            Продолжить
          </Btn>
        </form>
      </div>
      <div className="auth-menu__item auth-menu__item_flex_center">
        {type === 'signUp'
          ? (
            <>
              Уже есть аккаунт?
              <Link to="/auth/signin" className="link link_primary link_color_white link_font-size_sm">
                Вход
              </Link>
            </>
          )
          : (
            <>
              Нет аккаунта?
              <Link to="/auth/signup" className="link link_primary link_color_white link_font-size_sm">
                Зарегистрироваться
              </Link>
            </>
          )
        }
      </div>
    </div>
  )
}
