import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../../components/Input'
import { Btn } from '../../../components/Btn'
import { AuthPassProps } from '../../../types/interfaces/AuthProps'
import { CloseIcon } from '../../../assets/icons/CloseIcon'

export function AuthPass({ setPassValue, email }: AuthPassProps): JSX.Element {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const toggleDisableBtn = () => {
    if (password.length < 6) {
      return true
    } else {
      return false
    }
  }

  const handleClickBtnBack = () => {
    setPassword('')
    setPassValue({
      email: null,
      password: null,
      visibleContent: 'email'
    })
  }

  return (
    <div className="auth-menu">
      <div className="auth-menu__item">
        <h4 className="auth-menu__pre-title">Вход или регистрация</h4>
        <div className="auth-menu__close-btn">
          <Btn
            type="button"
            className="btn_transparent"
            onClick={() => navigate(-1)}
          >
            <CloseIcon width={15} height={15} className="auth-menu__close-icon" />
          </Btn>
        </div>
      </div>
      <div className="auth-menu__item">
        <h1 className="auth-menu__title title title_size_lg">
          Регистрация в Амедиатеке
        </h1>
      </div>
      <div className="auth-menu__item">
        <h3 className="title">Придумайте пароль для создания аккаунта</h3>
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
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            checkPassword
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
    </div>
  )
}