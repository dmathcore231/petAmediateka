import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchSignUpEmail, fetchSignUp } from '../../redux/authSlice'
import { resetStatusResponse } from '../../redux/statusResponseSlice'
import { AuthEmail } from './AuthEmail'
import { AuthPass } from './AuthPass'
import { AuthState } from '../../types/AuthState'
import { Logo } from '../../assets/icons/Logo'

export function Auth(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const defaultAuthState: AuthState = {
    email: null,
    password: null,
    visibleContent: 'email'
  }

  const { user, loading } = useAppSelector(state => state.auth)
  const { error, status, message } = useAppSelector(state => state.statusResponse)

  const [authState, setAuthState] = useState<AuthState>(defaultAuthState)

  useEffect(() => {
    if (authState.email) {
      const formData = new FormData()
      formData.append('type', 'authSignUpEmail')
      formData.append('email', authState.email)
      dispatch(fetchSignUpEmail(formData))
    }
  }, [authState.email])

  useEffect(() => {
    if (authState.email && status === 200 && !loading) {
      setAuthState(prevState => ({ ...prevState, visibleContent: 'password' }))
    }
  }, [authState.email, status, loading])

  useEffect(() => {
    if (authState.password && authState.email) {
      const formData = new FormData()
      formData.append('type', 'authSignUp')
      formData.append('email', authState.email)
      formData.append('password', authState.password)
      dispatch(fetchSignUp(formData))
    }
  }, [authState.password])

  useEffect(() => {
    if (user && status === 201) {
      navigate('/')
      dispatch(resetStatusResponse())
    }
  }, [user, status])

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
