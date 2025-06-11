import { useEffect, useState, useRef, CSSProperties, JSX, useCallback, memo } from "react"
import { useAppDispatch, useCheckBreakpoint } from "../../hooks"
import { toggleShow, setTitle, setSrc } from "../../redux/MediaPlayerSlice"
import { fetchMyFavorite } from "../../services/my/myThunk"
import { SliderPagination } from "./SliderPagination"
import { Btn } from "../Btn"
import { Card } from "../Card"
import { SliderProps } from "../../types/interfaces/SliderProps"
import { SlideState } from "../../types/Slider"
import { CardData } from "../../types/Card"
import { UserCardProps } from "../../types/UserCardProps"
import { ArrowLeftIcon } from "../../assets/icons/ArrowLeftIcon"
import { ArrowRightIcon } from "../../assets/icons/ArrowRightIcon"
import { UserData } from "../../types/interfaces/User"
import { defaultCardData } from "../../helpers"

function SliderComponent({ sliderSettings,
  sliderData: { data, cardStyles, settings, loadingData, errorData },
  userState: { user } }: SliderProps): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const ANIMATED_TIME: number = 400
  const AUTO_SWIPE_TIME: number = 10000
  const sliderListGap: number = BREAKPOINT_MD ? 8 : 16
  const { typeSlider, pagination, autoSwipe, lastSwipe, quantityListItems, mediaPlayerHandler } = sliderSettings
  const [stateSlider, setStateSlider] = useState<SlideState<number | number[]> | null>(null)
  const sliderListRef = useRef<HTMLUListElement>(null)
  const sliderItemRef = useRef<HTMLLIElement>(null)
  const sliderStyle: CSSProperties = {
    ['--slider-item-per-view' as string]: `${quantityListItems}`
  }

  useEffect(() => {
    if (!sliderItemRef.current) return

    const baseState: Pick<SlideState<number>, 'translateX' | 'indexSlide' | 'isAnimated' | 'sliderItemWidth'> = {
      translateX: 0,
      indexSlide: 0,
      isAnimated: false,
      sliderItemWidth: sliderItemRef.current.offsetWidth,
    }

    if (typeSlider === 'default' && data) {
      setStateSlider({
        ...baseState,
        prevSlide: data.length - 1,
        activeSlide: 0,
        nextSlide: data.length > 1 ? 1 : 0,
      })
    } else {
      setStateSlider({
        ...baseState,
        prevSlide: -1,
        activeSlide: [0, quantityListItems],
        nextSlide: quantityListItems,
      })
    }
  }, [data, typeSlider, quantityListItems])

  useEffect(() => {
    const isAnimated = stateSlider?.isAnimated

    if (!isAnimated) return

    const timeoutId = setTimeout(() => {
      setStateSlider(prev => (prev
        ? { ...prev, isAnimated: false }
        : null))
    }, ANIMATED_TIME)

    return () => clearTimeout(timeoutId)
  }, [stateSlider?.isAnimated, ANIMATED_TIME, typeSlider])

  useEffect(() => {
    if (!data || !sliderListRef.current || loadingData || !stateSlider) return

    const firstChild = sliderListRef.current.firstChild as HTMLElement
    const lastChild = sliderListRef.current.lastChild as HTMLElement

    if (!firstChild || !lastChild) return
    const { indexSlide, activeSlide, translateX } = stateSlider

    const isFirstSlideEdgeCase: boolean = indexSlide > data.length - 1
      && activeSlide === 0
    const isLastSlideEdgeCase: boolean = indexSlide === data.length
      && activeSlide === data.length - 1

    firstChild.style.left = ""
    lastChild.style.left = ""

    if (isFirstSlideEdgeCase) firstChild.style.left = `${Math.abs(translateX)}%`
    if (isLastSlideEdgeCase) lastChild.style.left = `${data.length * -100}%`

  }, [stateSlider?.indexSlide, stateSlider?.translateX, data])

  useEffect(() => {
    if (!data || !stateSlider) return

    const { indexSlide, activeSlide } = stateSlider
    const shouldResetToFirstSlide: boolean = indexSlide > data.length - 1
      && activeSlide === 0
    const shouldResetToLastSlide: boolean = indexSlide === data.length
      && activeSlide === data.length - 1

    if (!shouldResetToFirstSlide && !shouldResetToLastSlide) return

    const timerId = setTimeout(() => {
      if (shouldResetToFirstSlide) {
        setStateSlider(prev => {
          if (!prev) return null

          return {
            ...prev,
            prevSlide: 0,
            activeSlide: 0,
            nextSlide: 1,
            translateX: 0,
            indexSlide: 0,
            isAnimated: false
          }
        })
      } else if (shouldResetToLastSlide) {
        setStateSlider(prev => {
          if (!prev) return null

          return {
            ...prev,
            prevSlide: data.length - 1,
            activeSlide: data.length - 1,
            nextSlide: data.length - 2,
            translateX: data.length * -100,
            indexSlide: data.length,
            isAnimated: false
          }
        })
      }
    }, ANIMATED_TIME)

    return () => clearTimeout(timerId)
  }, [stateSlider?.indexSlide, data])

  useEffect(() => {
    if (!autoSwipe || loadingData) return

    const timerId = setInterval(() => handleClickBtn('next'), AUTO_SWIPE_TIME - ANIMATED_TIME)

    return () => clearInterval(timerId)
  }, [autoSwipe, loadingData, stateSlider])

  const setClassSlide = (index: number): string => {
    const baseClass = "slider__item"
    const clipPathClass = cardStyles.clipPath.value
      ? ` ${baseClass}_clip-path-active`
      : ''
    const classes: Record<string, string> = {
      active: `${baseClass}_active`,
      prev: `${baseClass}_prev`,
      next: `${baseClass}_next`,
    }

    if (typeSlider === 'default' && stateSlider) {
      const { indexSlide, prevSlide, nextSlide } = stateSlider

      if (index === indexSlide) return `${baseClass} ${classes.active}`
      if (index === prevSlide) return `${baseClass} ${classes.prev}`
      if (index === nextSlide) return `${baseClass} ${classes.next}`

      return `${baseClass}`
    }

    if (typeSlider === 'multi' && stateSlider) {
      const { prevSlide, nextSlide } = stateSlider

      if (index === prevSlide) return `${baseClass} ${classes.prev}${clipPathClass}`
      if (index === nextSlide) return `${baseClass} ${classes.next}${clipPathClass}`

      return `${baseClass}`
    }

    return baseClass
  }

  const handleClickBtn = useCallback((typeBtn: 'prev' | 'next'): void => {
    if (!typeSlider || !data || !stateSlider) return
    const sliderConfig = {
      default: {
        next: (prevState: SlideState<number>) => ({
          prevSlide: prevState.activeSlide,
          activeSlide: prevState.nextSlide,
          nextSlide: (prevState.nextSlide + 1) % data.length,
          translateX: prevState.translateX - 100,
          indexSlide: prevState.activeSlide + 1,
          isAnimated: true,
        }),
        prev: (prevState: SlideState<number>) => ({
          prevSlide: (prevState.prevSlide - 1 + data.length) % data.length,
          activeSlide: prevState.prevSlide,
          nextSlide: prevState.activeSlide,
          translateX: prevState.translateX + 100,
          indexSlide: ((prevState.activeSlide - 1 + (data.length + 1)) % (data.length + 1)),
          isAnimated: true,
        }),
      },
      multi: {
        next: (prevState: SlideState<number[]>) => ({
          prevSlide: prevState.prevSlide + 1,
          activeSlide: [prevState.activeSlide[0] + 1, prevState.activeSlide[1] + 1],
          nextSlide: prevState.nextSlide + 1,
          translateX: prevState.translateX - (stateSlider.sliderItemWidth + sliderListGap),
          indexSlide: 0,
          isAnimated: true,
        }),
        prev: (prevState: SlideState<number[]>) => ({
          prevSlide: prevState.prevSlide - 1,
          activeSlide: [prevState.activeSlide[0] - 1, prevState.activeSlide[1] - 1],
          nextSlide: prevState.nextSlide - 1,
          translateX: prevState.translateX + (stateSlider.sliderItemWidth + sliderListGap),
          indexSlide: 0,
          isAnimated: true,
        })
      }
    }

    if (typeSlider === 'default') {
      setStateSlider(prev => !prev
        ? null
        : {
          ...sliderConfig.default[typeBtn](prev as SlideState<number>),
          sliderItemWidth: prev.sliderItemWidth
        }
      )
    } else {
      setStateSlider(prev => !prev
        ? null
        : {
          ...sliderConfig.multi[typeBtn](prev as SlideState<number[]>),
          sliderItemWidth: prev.sliderItemWidth
        }
      )
    }
  }, [data, stateSlider, typeSlider])

  const toggleDisabledBtn = useCallback((): boolean => {
    const isAnimated = stateSlider?.isAnimated

    if (isAnimated || loadingData) {
      return true
    } else {
      return false
    }
  }, [stateSlider?.isAnimated, loadingData])

  const handleClickSliderItem = useCallback((data: CardData): void => {
    dispatch(toggleShow(true))
    dispatch(setTitle(data.title.value))
    if (data.src) {
      dispatch(setSrc(data.src))
    }
  }, [dispatch, mediaPlayerHandler])

  const toggleBaseClass = (typeSlider: "default" | "multi", mobileBreakpoint: boolean): string => {
    const result = {
      default: 'slider',
      multi: 'slider slider_multi',
    }

    if (mobileBreakpoint) return result[typeSlider]

    return `${result[typeSlider]} container`
  }

  const handleToggleFavoriteContent = useCallback(((id: string): void => {
    const formData = new FormData()
    formData.append('id', id)
    dispatch(fetchMyFavorite(formData))
  }), [dispatch])

  const renderList = (): JSX.Element | null => {
    if (errorData) return null

    const baseClass = "slider__list"

    const listStyles: CSSProperties = {
      transform: typeSlider === 'default'
        ? `translateX(${stateSlider?.translateX}%)`
        : `translateX(${stateSlider?.translateX}px)`,
      transition: stateSlider?.isAnimated ? 'var(--transition)' : 'none'
    }

    const generateUserCardProps = (user: UserData | null, id: string): UserCardProps => {
      const formData = new FormData()
      formData.append('id', id)

      return {
        auth: Boolean(user),
        isFavoriteContent: Boolean(user?.userActionsData?.favoriteList?.includes(id)),
        handleFavoriteContent: handleToggleFavoriteContent,
      }
    }

    return (
      <ul className={baseClass}
        ref={sliderListRef}
        style={listStyles}
      >
        {!data && (
          Array(5).fill(defaultCardData).map((item, index) => (
            <li
              key={index}
              className={setClassSlide(index)}
              ref={sliderItemRef}
            >
              <Card styles={cardStyles} data={item} settings={settings} loading={loadingData} error={errorData} user={generateUserCardProps(user, item._id)} />
            </li>
          ))
        )}
        {data && (
          data.map((slide, index) => (
            <li
              key={index}
              className={setClassSlide(index)}
              ref={sliderItemRef}
              onClick={() => mediaPlayerHandler ? handleClickSliderItem(slide) : null}
            >
              {(<Card styles={cardStyles} data={slide} settings={settings} loading={loadingData} error={errorData} user={generateUserCardProps(user, slide._id)} />)}
            </li>
          ))
        )}
      </ul>
    )
  }

  const setClassesBtn = (typeBtn: 'prev' | 'next', lastSwipe: boolean): string => {
    const baseClass = "slider__btn"
    const disabledClass = `${baseClass}_disabled`
    const classes = {
      prev: `${baseClass}_prev`,
      next: `${baseClass}_next`,
    }

    const baseDisabled = loadingData || !data || !stateSlider
    const btnDisabled =
      (typeBtn === 'next' && lastSwipe && stateSlider?.nextSlide === data?.length) ||
      (typeBtn === 'prev' && lastSwipe && stateSlider?.prevSlide === -1)

    if (baseDisabled || btnDisabled) return `${baseClass} ${classes[typeBtn]} ${disabledClass}`

    return `${baseClass} ${classes[typeBtn]}`
  }

  return (
    <div className={toggleBaseClass(typeSlider, BREAKPOINT_MD)}
      style={sliderStyle}
    >
      <div className={setClassesBtn('prev', lastSwipe)}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={() => handleClickBtn('prev')}
          disabled={toggleDisabledBtn()}
        >
          <ArrowLeftIcon width={48} height={48} />
        </Btn>
      </div>
      <div className={setClassesBtn('next', lastSwipe)}>
        <Btn
          type="button"
          className="btn_transparent"
          onClick={() => handleClickBtn('next')}
          disabled={toggleDisabledBtn()}
        >
          <ArrowRightIcon width={48} height={48} />
        </Btn>
      </div>
      <div className="slider__content">
        {renderList()}
        {data && stateSlider && !loadingData && (
          <SliderPagination isActive={pagination} pageLength={data.length} activeSlide={stateSlider?.activeSlide as number} />
        )}
      </div>
    </div>
  )
}

export const Slider = memo(SliderComponent)
