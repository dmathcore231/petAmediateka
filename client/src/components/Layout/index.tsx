import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { MediaPlayer } from "../MediaPlayer"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { ContentStateItem } from "../../types/interfaces/InitialStatesSlice"
import { ContentTypeEnum } from "../../types/interfaces/Content"
import { RootState } from "../../redux/store"

export function Layout(): JSX.Element {
  const { isShow } = useAppSelector(state => state.mediaPlayer)

  const { content, error, loading } = useAppSelector((state: RootState) => state.content[ContentTypeEnum.Series] as ContentStateItem<MediaContent>)

  return (
    <>
      <MediaPlayer mediaContentData={content} />
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
