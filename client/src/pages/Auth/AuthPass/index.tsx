import { useState, useEffect, FormEvent, JSX } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { resetStatusResponse } from "../../../redux/statusResponseSlice"
import { Input } from '../../../components/Input'
import { Btn } from '../../../components/Btn'
import { Checkbox } from '../../../components/Checkbox'
import { AuthPassProps } from '../../../types/interfaces/AuthProps'
import { InputErrorState } from "../../../types/Input"
import { InputProps } from "../../../types/interfaces/InputProps"
import { setTextAuth } from "../../../helpers/index"
import { CloseIcon } from '../../../assets/icons/CloseIcon'

export function AuthPass({ setPassValue, email, type }: AuthPassProps): JSX.Element {
  const dispatch = useAppDispatch()

  const labelInput: InputProps["label"] = {
    value: "Не менее 6 символов",
    labelInvisible: false
  }
  const placeholderInput: InputProps["placeholder"] = {
    type: "scale",
    value: "Пароль"
  }
  const textBtn: Record<'back' | 'next', string> = {
    back: "Изменить",
    next: "Продолжить"
  }

  const { error } = useAppSelector(state => state.statusResponse)
  const [password, setPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    dispatch(resetStatusResponse())
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setPassValue(prev => ({ ...prev, password }))
  }

  const toggleDisableBtn = (): boolean => {
    if (password.length < 6 || !isChecked) return true

    return false
  }

  const handleClickBtnBack = (): void => {
    setPassword('')
    setPassValue(prev => ({ ...prev, password: null, visibleContent: 'email' }))
  }

  const toggleInputError = (): InputErrorState => {
    if (!error) return { value: false, errorData: null }

    const mapError: { [key: number]: InputErrorState } = {
      104: {
        value: true,
        errorData: {
          field: "password",
          message: error.message
        }
      }
    }

    return mapError[error.numberError]
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
        <h3 className="title">
          {setTextAuth(type, "text")}
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
              {textBtn.back}
            </Btn>
          </div>
        </div>
      </div>
      <div className="auth-menu__item">
        <form className="form auth-email" onSubmit={handleSubmit}>
          <Input
            type="password"
            id="password"
            label={labelInput}
            required
            placeholder={placeholderInput}
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
            {textBtn.next}
          </Btn>
        </form>
      </div>
    </div>
  )
}
