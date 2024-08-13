import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthEmail } from './AuthEmail'
import { AuthPass } from './AuthPass'
import { AuthState } from '../../types/AuthState'
import { Logo } from '../../assets/icons/Logo'

export function Auth(): JSX.Element {

  const defaultAuthState: AuthState = {
    email: null,
    password: null,
    visibleContent: 'email'
  }

  const [authState, setAuthState] = useState<AuthState>(defaultAuthState)

  useEffect(() => {
    if (authState.visibleContent === 'email' && authState.email) {
      setAuthState(prevState => ({ ...prevState, visibleContent: 'password' }))
    }
  })

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
        {authState.visibleContent === 'email' && (
          <AuthEmail
            setEmailValue={setAuthState}
          />
        )}
        {authState.visibleContent === 'password' && authState.email && (
          <AuthPass setPassValue={setAuthState} email={authState.email} />
        )}
      </article>
    </div>
  )
}
