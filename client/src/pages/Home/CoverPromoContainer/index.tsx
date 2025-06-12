import { JSX, memo, useRef } from "react"
import { useAppDispatch, useAppSelector, useLazyLoad } from "../../../hooks"
import { CoverPromo } from "../../../components/CoverPromo"
import { fetchContent } from "../../../redux/contentSlice"
import { CardData } from "../../../types/Card"
import { CoverPromoProps } from "../../../types/interfaces/CoverPromoProps"
import { ContentTypeEnum } from "../../../types/interfaces/Content"

function CoverPromoComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const sectionElement = useRef<HTMLDivElement>(null)
  const { content, loading } = useAppSelector((state) => state.content.coverPromo)
  useLazyLoad(
    sectionElement,
    () => dispatch(fetchContent({ type: ContentTypeEnum.CoverPromo })),
    0.7
  )

  const coverPromoProps: CoverPromoProps = {
    coverPromoData: content
      ? content.data as CardData[]
      : null,
    loading: loading,
    error: false
  }

  return (
    <section className="home-item container" ref={sectionElement}>
      <CoverPromo {...coverPromoProps} />
    </section>
  )
}

export const CoverPromoContainer = memo(CoverPromoComponent)
