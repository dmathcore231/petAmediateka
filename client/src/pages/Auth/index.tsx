import { Link, useNavigate } from 'react-router-dom'
import { Btn } from '../../components/Btn'
import { Logo } from '../../assets/icons/Logo'
import { CloseIcon } from '../../assets/icons/CloseIcon'

export function Auth(): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="auth">
      <div className="auth__content">
        <Link to="/" className='auth__logo'>
          <Logo width={168} height={16} />
        </Link>
        <div className="auth__bg">
          <picture className="auth__bg-picture">
            <img src="/auth-bg.png" alt="" className="auth__bg-img" />
          </picture>
        </div>
      </div>
      <article className="auth__side-bar">
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
            <h1>Зарегистрируйтесь</h1>
            <h1>или войдите в аккаунт</h1>
          </div>
          <div className="auth-menu__item">
            <form className="form">

            </form>
          </div>
        </div>
      </article>
    </div>
  )
}
