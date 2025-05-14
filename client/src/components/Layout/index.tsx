import { useEffect, JSX } from "react"
import { Outlet } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { fetchRefreshAccessToken } from "../../services/authThunk"
import { MediaPlayer } from "../MediaPlayer"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"

export function Layout(): JSX.Element {
  const dispatch = useAppDispatch()
  const { isShow } = useAppSelector(state => state.mediaPlayer)
  const { user } = useAppSelector(state => state.my)

  const baseClass = "layout"
  const isShowClass = isShow ? ` ${baseClass}_fixed` : ''

  useEffect((): void => {
    if (!user) {
      dispatch(fetchRefreshAccessToken())
    }
  }, [dispatch, user])

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
