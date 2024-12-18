import { useEffect } from "react"
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

  useEffect(() => {
    const userData = getDataFromLocalStorage<UserData>('userData')
    const token = getDataFromLocalStorage<string>('token')

    if (userData && token && !user) {
      dispatch(fetchRefreshUserData(token))
      console.log(2)
    }
  }, [])

  return (
    <>
      <MediaPlayer />
      <div className={isShow ? "layout layout_fixed" : "layout"}>
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
