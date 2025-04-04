import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { resetStatusResponse } from "../../../redux/statusResponseSlice"
import { Input } from '../../../components/Input'
import { Btn } from '../../../components/Btn'
import { Checkbox } from '../../../components/Checkbox'
import { AuthPassProps } from '../../../types/interfaces/AuthProps'
import { InputErrorState } from "../../../types/Input"
import { CloseIcon } from '../../../assets/icons/CloseIcon'

export function AuthPass({ setPassValue, email, type }: AuthPassProps): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { error } = useAppSelector(state => state.statusResponse)
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    dispatch(resetStatusResponse())
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPassValue(prev => ({ ...prev, password }))
  }

  const toggleDisableBtn = () => {
    if (password.length < 6 || !isChecked) {
      return true
    } else {
      return false
    }
  }

  const handleClickBtnBack = () => {
    setPassword('')
    setPassValue(prev => ({ ...prev, password: null, visibleContent: 'email' }))
  }

  const toggleInputError = () => {
    if (error && error.numberError === 104 && password === error.value) {

      const err: InputErrorState = {
        value: true,
        errorData: {
          field: "password",
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
        <h3 className="title">
          {type === "signUp"
            ? "Придумайте пароль для создания аккаунта"
            : "Введите пароль для входа в свой аккаунт"}

        </h3>
      </div>
      <div className="auth-menu__item">
        <div className="auth-pass">
          <span className="auth-pass__email">
            {email}
          </span>
          <div className="auth-pass__btn-back">
            <Btn
              type="button"
              className="btn_transparent btn_font_size_md"
              onClick={handleClickBtnBack}
            >
              Изменить
            </Btn>
          </div>
        </div>
      </div>
      <div className="auth-menu__item">
        <form className="form auth-email" onSubmit={handleSubmit}>
          <Input
            type="password"
            id="password"
            label={{ value: "Не менее 6 символов", labelInvisible: false }}
            required
            placeholder={{
              type: "scale",
              value: "Пароль"
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={toggleInputError()}
            checkPassword
          />
          <Checkbox getCheckedValue={setIsChecked} />
          <Btn
            type="submit"
            className="btn_primary"
            disabled={toggleDisableBtn()}
          >
            Продолжить
          </Btn>
        </form>
      </div>
    </div>
  )
}
