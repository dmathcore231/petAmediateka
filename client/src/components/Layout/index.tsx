import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { MediaPlayer } from "../MediaPlayer"
import { useAppSelector } from "../../hooks"

export function Layout(): JSX.Element {
  const { isShow } = useAppSelector(state => state.mediaPlayer)

  return (
    <div className={isShow ? "layout layout_fixed" : "layout"}>
      <Header>
        <NavBar />
        <MediaPlayer type="player" />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  )
}
