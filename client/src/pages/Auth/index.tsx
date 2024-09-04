import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchSignUp } from '../../redux/authSlice'
import { resetStatusResponse } from '../../redux/statusResponseSlice'
import { AuthProps } from '../../types/interfaces/AuthProps'
import { AuthEmail } from './AuthEmail'
import { AuthPass } from './AuthPass'
import { AuthState } from '../../types/AuthState'
import { Logo } from '../../assets/icons/Logo'

export function Auth({ pageState }: AuthProps): JSX.Element {
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
    const formData = new FormData()

    if (pageState === 'signUp' && authState.email && !authState.password) {
      console.log('+')
      formData.append('type', 'authSignUpEmail')
      formData.append('email', authState.email)

      dispatch(fetchSignUp({ body: formData, typeRequest: 'authSignUp' }))
    } else if (pageState === 'signUp' && authState.email && authState.password) {
      formData.append('type', 'authSignUp')
      formData.append('email', authState.email)
      formData.append('password', authState.password)

      dispatch(fetchSignUp({ body: formData, typeRequest: 'authSignUp' }))
    } else if (pageState === 'signIn' && authState.email && !authState.password) {
      formData.append('type', 'authSignInEmail')
      formData.append('email', authState.email)

      dispatch(fetchSignUp({ body: formData, typeRequest: 'authSignIn' }))
    } else if (pageState === 'signIn' && authState.email && authState.password) {
      formData.append('type', 'authSignIn')
      formData.append('email', authState.email)
      formData.append('password', authState.password)

      dispatch(fetchSignUp({ body: formData, typeRequest: 'authSignIn' }))
    }

  }, [pageState, authState.email, authState.password, dispatch])

  useEffect(() => {
    if (authState.email && status === 200 && !loading) {
      setAuthState(prevState => ({ ...prevState, visibleContent: 'password' }))
    }
  }, [authState.email, status, loading])

  useEffect(() => {
    if (user && pageState === 'signUp' && status === 201) {
      navigate('/')
      dispatch(resetStatusResponse())
    } else if (user && pageState === 'signIn' && status === 200) {
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
            type={pageState}
          />
        )}
        {authState.visibleContent === 'password' && authState.email && (
          <AuthPass setPassValue={setAuthState} email={authState.email} type={pageState} />
        )}
      </article>
    </div>
  )
}
