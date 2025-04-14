import { useEffect, JSX } from "react"
import { Outlet } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { fetchRefreshUserData } from "../../redux/authSlice"
import { getDataFromLocalStorage } from "../../helpers"
import { MediaPlayer } from "../MediaPlayer"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { UserData } from "../../types/interfaces/User"

export function Layout(): JSX.Element {
  const dispatch = useAppDispatch()

  const { isShow } = useAppSelector(state => state.mediaPlayer)
  const { user } = useAppSelector(state => state.auth)

  const localDataUser = getDataFromLocalStorage<UserData>('userData')
  const token = getDataFromLocalStorage<string>('token')

  useEffect((): void => {
    if (localDataUser && token && !user) {
      dispatch(fetchRefreshUserData(token))
    } else if (!localDataUser && token) {

      dispatch(fetchRefreshUserData(token))
    } else if (!token && localDataUser) {
      dispatch(fetchRefreshUserData('noToken'))
    }

  }, [dispatch, localDataUser, token, user])

  const baseClass = "layout"
  const isShowClass = isShow ? ` ${baseClass}_fixed` : ''

  return (
    <>
      <MediaPlayer />
      <div className={`${baseClass}${isShowClass}`}>
        <Header>
          <NavBar />
        </Header>
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </div>
    </>
  )
}
