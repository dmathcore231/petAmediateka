import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../../../components/Input"
import { Btn } from "../../../components/Btn"
import { AuthEmailProps } from "../../../types/interfaces/AuthProps"
import { CloseIcon } from "../../../assets/icons/CloseIcon"

export function AuthEmail({ setEmailValue }: AuthEmailProps): JSX.Element {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')

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
          Зарегистрируйтесь
          <br />
          или войдите в аккаунт
        </h1>
      </div>
      <div className="auth-menu__item">
        <form className="form auth-email" onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            label={{ value: null, labelInvisible: true }}
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
