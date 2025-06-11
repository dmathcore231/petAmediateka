import { JSX, memo, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { CoverPromo } from "../../../components/CoverPromo"
import { fetchContent } from "../../../redux/contentSlice"
import { CardData } from "../../../types/Card"
import { CoverPromoProps } from "../../../types/interfaces/CoverPromoProps"
import { ContentTypeEnum } from "../../../types/interfaces/Content"

function CoverPromoComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const { content, loading } = useAppSelector((state) => state.content.coverPromo)

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.CoverPromo }))
  }, [dispatch])

  const coverPromoProps: CoverPromoProps = {
    coverPromoData: content
      ? content.data as CardData[]
      : null,
    loading: loading,
    error: false
  }

  return (
    <section className="home-item container">
      <CoverPromo {...coverPromoProps} />
    </section>
  )
}

export const CoverPromoContainer = memo(CoverPromoComponent)
