import { JSX, memo, useMemo, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../../hooks"
import { fetchContent } from "../../../redux/contentSlice"
import { Slider } from "../../../components/Slider"
import { SliderProps } from "../../../types/interfaces/SliderProps"
import { CardData } from "../../../types/Card"
import { ContentTypeEnum } from "../../../types/interfaces/Content"

function HeaderComponent(): JSX.Element {
  const dispatch = useAppDispatch()
  const { content, loading } = useAppSelector(state => state.content.mainSlider)
  const user = useAppSelector(state => state.my.user)

  useEffect(() => {
    dispatch(fetchContent({ type: ContentTypeEnum.MainSlider }))
  }, [dispatch])

  const sliderProps = useMemo<SliderProps>(() => ({
    sliderSettings: {
      typeSlider: "default",
      pagination: loading,
      autoSwipe: true,
      lastSwipe: false,
      quantityListItems: 1,
      mediaPlayerHandler: false
    },
    sliderData: {
      data: content ? (content.data as CardData[]) : [],
      cardStyles: {
        cardSize: 'lg',
        flex: {
          body: {
            justifyContent: 'space-between'
          }
        },
        clipPath: {
          value: false,
          type: null
        },
        ageRestrictionBadge: {
          position: 'left',
          size: 'lg'
        },
        boxShadow: false,
        btnGroup: true,
        hover: {
          scale: false,
          playBack: {
            value: false,
            type: null
          },
          shadow: false
        }
      },
      settings: {
        title: {
          titleOutside: false,
          titleLogoImg: true,
          titleLogoImgIndex: null
        },
        badgeVisible: true,
        link: {
          linkType: 'title',
          linkDisabled: false
        },
        descriptionVisible: true,
        tags: null,
        cardSeries: false
      },
      loadingData: loading,
      errorData: false
    },
    userState: {
      user
    }
  }), [content, loading, user])

  return (
    <>
      <Slider {...sliderProps} />
    </>
  )
}

export const HeaderContainer = memo(HeaderComponent)
