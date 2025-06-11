import { JSX, useEffect, memo, useMemo } from "react"
import { useAppSelector, useAppDispatch } from "../../../hooks"
import { fetchContent } from "../../../redux/contentSlice"
import { Banner } from "../../../components/Banner"
import { BannerProps } from "../../../types/interfaces/BannerProps"
import { ContentTypeEnum } from "../../../types/interfaces/Content"
import { defaultBannerData } from "../../../helpers"

function BannerSectionComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const { content, loading } = useAppSelector((state) => state.content.banner)

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.Banner }))
  }, [dispatch])

  const bannerProps = useMemo<BannerProps>(() =>
    content
      ? { ...(content.data as BannerProps), loading }
      : { ...defaultBannerData, loading },
    [content, loading])

  return (
    <section className="home-item container">
      <Banner {...bannerProps} />
    </section>
  )
}

export const BannerContainer = memo(BannerSectionComponent)
