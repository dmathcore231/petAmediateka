import { useState, useEffect, JSX } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchSignUp, fetchSignIn } from '../../services/authThunk'
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
  const { token, loading, status } = useAppSelector(state => state.auth)
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState)
  const requestConfig = {
    signUp: {
      onlyEmail: (formData: FormData, email: string | null): void => {
        if (!email) return

        formData.append('type', 'authSignUpEmail')
        formData.append('email', email)

        dispatch(fetchSignUp(formData))
      },
      withPassword: (formData: FormData, email: string | null, password: string | null): void => {
        if (!email || !password) return

        formData.append('type', 'authSignUp')
        formData.append('email', email)
        formData.append('password', password)

        dispatch(fetchSignUp(formData))
      }
    },
    signIn: {
      onlyEmail: (formData: FormData, email: string | null): void => {
        if (!email) return

        formData.append('type', 'authSignInEmail')
        formData.append('email', email)

        dispatch(fetchSignIn(formData))
      },
      withPassword: (formData: FormData, email: string | null, password: string | null): void => {
        if (!email || !password) return

        formData.append('type', 'authSignIn')
        formData.append('email', email)
        formData.append('password', password)

        dispatch(fetchSignIn(formData))
      }
    }
  }

  useEffect(() => {
    const formData = new FormData()
    const mode = authState.password ? 'withPassword' : 'onlyEmail'

    requestConfig[pageState][mode](formData, authState.email, authState.password)

  }, [pageState, authState.email, authState.password, dispatch])

  useEffect(() => {
    if (authState.email && status === 200 && !loading) {
      setAuthState(prevState => ({ ...prevState, visibleContent: 'password' }))
    }
  }, [authState.email, status, loading])

  useEffect(() => {
    if (token && pageState === 'signUp' && status === 201) {
      navigate('/')
    }

    if (token && pageState === 'signIn' && status === 200) {
      navigate('/')
    }
  }, [token, status, pageState, navigate, dispatch])

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
