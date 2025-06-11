import { useRef, useEffect, useState, MouseEvent, RefObject, JSX } from "react"
import { RootState } from "../../redux/store"
import { useAppDispatch, useAppSelector, useCheckBreakpoint } from "../../hooks"
import { updatePlayerStatus, toggleShow, resetPlayerStatus, setError, setCurrentSrc } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { Spinner } from "../Spinner"
import { TrackSetting } from "../../types/TrackSetting"
import { VideoQuality, VideoQualityKey } from "../../types/VideoQuality"
import { SrcMediaPlayer } from "../../types/SrcMediaPlayer"
import { ContentStateItem } from "../../types/interfaces/InitialStatesSlice"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { RenderVideoProps } from "../../types/interfaces/RenderVideoProps"
import { formatTimeWithHours } from "../../helpers"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { Rewind10Icon } from "../../assets/icons/Rewind10Icon"
import { Forward10Icon } from "../../assets/icons/Forward10Icon"
import { PauseIcon } from "../../assets/icons/PauseIcon"
import { PlayerStartIcon } from "../../assets/icons/PlayerStartIcon"
import { FullScreenIcon } from "../../assets/icons/FullScreenIcon"
import { MutedIcon } from "../../assets/icons/MutedIcon"
import { UnmutedIcon } from "../../assets/icons/UnmutedIcon"
import { HdIcon } from "../../assets/icons/HdIcon"

export function MediaPlayer(): JSX.Element {
  const dispatch = useAppDispatch()
  const BREAKPOINT_XXL = useCheckBreakpoint(1400)
  const BREAKPOINT_MD = useCheckBreakpoint(768)
  const TIME_FORWARD: number = 10
  const TIME_REWIND: number = 10

  const videoRef = useRef<HTMLVideoElement>(null)
  const thumbVolumeRef = useRef<HTMLDivElement>(null)
  const trackVolumeRef = useRef<HTMLDivElement>(null)
  const trackVideoRef = useRef<HTMLDivElement>(null)
  const mediaPlayerMainRef = useRef<HTMLDivElement>(null)

  const defaultTrackSetting: TrackSetting = {
    isShowTrack: {
      volume: false,
      time: false,
    },
    currentMouseX: {
      volume: 0,
      time: 0,
    },
  }

  const { isShow, playerStatus, src, error, loading, title } = useAppSelector((state: RootState) => state.mediaPlayer)
  const { content } = useAppSelector((state: RootState) => state.content.series as ContentStateItem<MediaContent>)

  const [timeVideo, setTimeVideo] = useState<number>(0)
  const [trackSetting, setTrackSetting] = useState<TrackSetting>(defaultTrackSetting)
  const [inactive, setInactive] = useState<boolean>(true)
  const [isShowHdList, setIsShowHdList] = useState<boolean>(false)
  const inactiveTime: number = 3000

  const getIconSize = (isHd: boolean): { width: number; height: number } => {
    const sizeAdjustments = BREAKPOINT_XXL
      ? (BREAKPOINT_MD ? -10 : -5)
      : 0

    return {
      width: (isHd ? 40 : 35) + sizeAdjustments,
      height: 35 + sizeAdjustments,
    }
  }
  const iconsJSX = {
    close: <CloseIcon {...getIconSize(false)} />,
    muted: (<MutedIcon {...getIconSize(false)} />),
    unmuted: (<UnmutedIcon {...getIconSize(false)} />),
    rewind: (<Rewind10Icon {...getIconSize(false)} />),
    forward: (<Forward10Icon {...getIconSize(false)} />),
    pause: (<PauseIcon {...getIconSize(false)} />),
    play: (<PlayerStartIcon {...getIconSize(false)} />),
    fullScreen: (<FullScreenIcon {...getIconSize(false)} />),
    hd: (<HdIcon {...getIconSize(true)} />),
  }

  useEffect(() => {
    const hasError = Boolean(error)
    const errorNotFound: { number: number, message: string } = {
      number: 404,
      message: 'Not found url video',
    }

    if (hasError) {
      dispatch(setError(errorNotFound))
      setInactive(false)
      return
    }

    dispatch(setError(null))
  }, [src, error, dispatch])

  useEffect(() => {
    if (!isShow || error || playerStatus.status === 'pause') return

    const events = ['mousemove', 'mousedown', 'keydown', 'touchmove'] as const
    let timeoutId: number | undefined

    const handleUserActivity = (): void => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        setInactive(true)
      }, inactiveTime)

      setInactive(false)
    }

    events.forEach(event => document.addEventListener(event, handleUserActivity))

    handleUserActivity()

    return (): void => {
      if (timeoutId) clearTimeout(timeoutId)

      events.forEach(event => document.removeEventListener(event, handleUserActivity))
    }
  }, [playerStatus.status, isShow, error, inactiveTime, setInactive])

  useEffect(() => {
    if (videoRef.current && isShow && src) {
      dispatch(resetPlayerStatus())
      videoRef.current.play()
      videoRef.current.currentTime = 0
      videoRef.current.volume = 1
      dispatch(updatePlayerStatus({
        ...playerStatus, status: "play",
      }))
    }
  }, [isShow])

  useEffect(() => {
    if (timeVideo && videoRef.current) {
      dispatch(updatePlayerStatus({
        ...playerStatus, time: {
          current: timeVideo,
          left: Number(videoRef.current.duration.toFixed(2)) - timeVideo,
          total: Number(videoRef.current.duration.toFixed(2))
        }
      }))
    }
  }, [timeVideo])

  useEffect(() => {
    if (!document.fullscreenElement) {
      dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
    } else {
      dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: true }))
    }
  }, [document.fullscreenElement])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeVideo
    }
  }, [src])

  const renderBtnPlayOrPauseIcon = (): JSX.Element => {
    if (playerStatus.status === "play") {
      return iconsJSX.pause
    } else {
      return iconsJSX.play
    }
  }

  const handleClickBtnClose = (): void => {
    if (videoRef.current && !playerStatus.fullScreen) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0

      dispatch(resetPlayerStatus())
      dispatch(toggleShow(false))
      setIsShowHdList(false)
      setTimeVideo(0)
    } else if (error && !playerStatus.fullScreen) {
      dispatch(resetPlayerStatus())
      dispatch(toggleShow(false))
      setIsShowHdList(false)
      setTimeVideo(0)
    } else {
      dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
      document.exitFullscreen()
    }
  }

  const handleClickBtnPlayPause = async (): Promise<void> => {
    if (!videoRef.current) return
    const video: HTMLVideoElement = videoRef.current
    const isVideoPaused: boolean = video.paused
    const newStatus: "play" | "pause" = isVideoPaused ? "play" : "pause"

    try {
      dispatch(updatePlayerStatus({ ...playerStatus, status: newStatus }))
      if (isVideoPaused) {
        await video.play()
      } else {
        video.pause()
      }
    } catch (error: unknown) {
      const err = error as Error
      console.error(err)
      dispatch(setError({ number: 500, message: err.message }))
    }
  }

  const handleClickBtnMuted = (): void => {
    if (!videoRef.current) return

    const { muted } = videoRef.current
    const { volume } = playerStatus

    videoRef.current.muted = !muted

    dispatch(updatePlayerStatus({
      ...playerStatus,
      volume: {
        isMuted: !muted,
        value: muted ? volume.valueWithMuted : 0,
        valueWithMuted: muted ? volume.valueWithMuted : volume.value
      }
    })
    )
  }

  const handleHoverTrack = (track: RefObject<HTMLDivElement | null>): void => {
    const isVolumeTrack: boolean = track === trackVolumeRef
    const trackType: 'volume' | 'time' = isVolumeTrack ? 'volume' : 'time'

    setTrackSetting(prev => ({
      ...prev,
      isShowTrack: {
        ...prev.isShowTrack,
        [trackType]: true
      }
    }))
  }

  const handleLeaveTrack = (track: RefObject<HTMLDivElement | null>): void => {
    const isVolumeTrack: boolean = track === trackVolumeRef
    const trackType: 'volume' | 'time' = isVolumeTrack ? 'volume' : 'time'

    setTrackSetting(prev => ({
      ...prev,
      isShowTrack: {
        ...prev.isShowTrack,
        [trackType]: false
      }
    }))
  }

  const handleSetTrackCurrentMouseX = (e: MouseEvent<HTMLDivElement>,
    track: RefObject<HTMLDivElement | null>): void => {
    if (!track.current) return
    const currentMouseX: number = e.clientX
    const { left: minPos, right: maxPos } = track.current.getBoundingClientRect()
    const positionRatio: number = (currentMouseX - minPos) / (maxPos - minPos)
    const isVolumeTrack: boolean = track === trackVolumeRef
    const value: number = isVolumeTrack
      ? Math.round(positionRatio * 100)
      : Math.round(positionRatio * playerStatus.time.total)

    if (currentMouseX < minPos || currentMouseX > maxPos) return

    setTrackSetting(prev => ({
      ...prev,
      currentMouseX: {
        ...prev.currentMouseX,
        [isVolumeTrack ? 'volume' : 'time']: value
      }
    }))
  }

  const handleSetValueTrack = (e: MouseEvent<HTMLDivElement>, track: RefObject<HTMLDivElement | null>): void => {
    if (!track.current) return
    const { left: minPos, right: maxPos } = track.current.getBoundingClientRect()
    const currentMouseX: number = e.clientX
    const positionRatio: number = (currentMouseX - minPos) / (maxPos - minPos)
    const isVolumeTrack: boolean = track === trackVolumeRef

    if (currentMouseX < minPos || currentMouseX > maxPos) return

    const handleVolumeTrack = (): void => {
      const percent: number = Math.round(positionRatio * 100)
      const isMuted: boolean = percent === 0

      if (videoRef.current) {
        videoRef.current.volume = percent / 100
      }

      setTrackSetting(prev => ({
        ...prev,
        currentMouseX: {
          ...prev.currentMouseX,
          volume: percent
        }
      }))

      dispatch(updatePlayerStatus({
        ...playerStatus,
        volume: {
          isMuted,
          value: isMuted ? 0 : percent,
          valueWithMuted: isMuted ? 0 : percent
        }
      }))
    }

    const handleTimeTrack = (): void => {
      const timePosition: number = Math.round(positionRatio * playerStatus.time.total)

      if (videoRef.current) {
        videoRef.current.currentTime = timePosition
      }

      setTrackSetting(prev => ({
        ...prev,
        currentMouseX: {
          ...prev.currentMouseX,
          time: timePosition
        },

      }))

      setTimeVideo(timePosition)
    }

    if (isVolumeTrack) {
      handleVolumeTrack()
    } else {
      handleTimeTrack()
    }
  }

  const handleClickBtnForward = (): void => {
    if (!videoRef.current) return
    const video = videoRef.current

    video.currentTime += TIME_FORWARD
  }

  const handleClickBtnRewind = (): void => {
    if (!videoRef.current) return
    const video = videoRef.current

    video.currentTime -= TIME_REWIND
  }

  const handleClickBtnFullScreen = async (): Promise<void> => {
    if (!mediaPlayerMainRef.current) return

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
      } else {
        await mediaPlayerMainRef.current.requestFullscreen();
        dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: true }))
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error)
      dispatch(updatePlayerStatus({
        ...playerStatus,
        fullScreen: !!document.fullscreenElement
      }))
    }
  }

  const handleClickBtnQualityVideo = (): void => {
    setIsShowHdList(prev => !prev)
  }

  const handleClickBtnQualityVideoItem = (quality: VideoQuality): void => {
    if (!src || src._current.type === quality) return

    const qualityMap: Record<VideoQuality, string | undefined> = {
      '360p': src.quality360,
      '720p': src.quality720,
      '1080p': src.quality1080,
      '2160p': src.quality2160
    }
    const qualitySrc = qualityMap[quality]

    if (qualitySrc) {
      dispatch(setCurrentSrc({ type: quality, value: qualitySrc }))
    }
  }

  const setClassMainElement = (isShow: boolean, fullScreen: boolean): string => {
    const baseClass = "media-player-main"
    const isShowClass = isShow ? " media-player-main_show" : ""
    const fullScreenClass = fullScreen ? "" : " container"

    return `${baseClass}${isShowClass}${fullScreenClass}`
  }
  const setClassHeader = (fullScreen: boolean): string => {
    const baseClass = "media-player-main-header"
    const fullScreenClass = fullScreen ? " container" : ""

    return `${baseClass}${fullScreenClass}`
  }
  const setClassHeaderTitle = (inactive: boolean): string => {
    const baseClass = "media-player-main-header__title"
    const inactiveClass = inactive
      ? " media-player-main-header__title_fade"
      : " media-player-main-header__title_show"

    return `${baseClass}${inactiveClass}`
  }
  const setClassHeaderCloseBtn = (inactive: boolean): string => {
    const baseClass = "media-player-main-header__item"
    const inactiveClass = inactive
      ? " media-player-main-header__item_fade"
      : ""

    return `${baseClass}${inactiveClass}`
  }

  const renderAgeRestriction = (value: number | null): JSX.Element | null => {
    if (!value) return null

    const baseClass = "media-player-age-restriction"
    const itemClass = "media-player-age-restriction__item"
    const titleXlClass = "title title_size_xl"
    const titleMClass = "title title_size_m"

    return (
      <div className={baseClass}>
        <div className={`${itemClass} ${titleXlClass}`}>
          {content?.data.ageRestriction}
        </div>
        <div className={`${itemClass} ${titleMClass}`}>
          +
        </div>
      </div>
    )
  }

  const renderVideo = ({ error, src, loading }: RenderVideoProps): JSX.Element => {
    const baseClass = "media-player-main-video"
    const itemClass = "media-player-main-video__item"
    const fullScreenClass = playerStatus.fullScreen
      ? " media-player-main-video_fullscreen"
      : ""
    const errorClass = "media-player-error"
    const errorMessage = "Упс, что-то пошло не так..."

    if (error) {
      <div className={errorClass}>
        <div className={itemClass}>
          <h3>{errorMessage}</h3>
        </div>
      </div>
    }

    if (loading || !src) {
      return (
        <div className={baseClass}>
          <div className={itemClass}>
            <Spinner height={50} width={50} />
          </div>
        </div>
      )
    }

    return (
      <video src={src._current.value}
        autoPlay
        preload="auto"
        muted={playerStatus.volume.isMuted}
        ref={videoRef}
        className={`${baseClass}${fullScreenClass}`}
        onTimeUpdate={(e) => setTimeVideo(Number(e.currentTarget.currentTime.toFixed(2)))}
        onEnded={() => {
          dispatch(updatePlayerStatus({
            ...playerStatus, status: "pause"
          }))
        }}
      />
    )
  }

  const renderControlPanel = (): JSX.Element => {
    const baseClass = "media-player-control"
    const fullScreenClass = playerStatus.fullScreen
      ? " container"
      : ""
    const inActiveClass = inactive
      ? " media-player-control_fade"
      : ""

    const renderTimeBar = (): JSX.Element => {
      const classes: Record<string, string> = {
        base: "media-player-time-bar",
        timeDisplay: "media-player__time title title_size_m ",
        track: "media-player-time-bar__track",
        tooltip: "media-player-time-bar__tooltip",
        tooltipVisible: "media-player-time-bar__tooltip_show",
        progress: "media-player-time-bar__progress",
        thumb: "media-player-time-bar__thumb",
        title: "title"
      }
      const tooltipPosition: number = (trackSetting.currentMouseX.time / playerStatus.time.total) * 100
      const trackProgress: number = (playerStatus.time.current / playerStatus.time.total) * 100
      const isTooltipVisible: boolean = trackSetting.isShowTrack.time
      const isShowTooltipClass: string = isTooltipVisible
        ? ' media-player-time-bar__tooltip_show' : ''
      const currentTime: string = formatTimeWithHours(playerStatus.time.current)
      const remainingTime: string = formatTimeWithHours(playerStatus.time.left)
      const hoverTime: string = formatTimeWithHours(trackSetting.currentMouseX.time)

      const trackHandlers: React.HTMLAttributes<HTMLDivElement> = {
        onMouseEnter: () => handleHoverTrack(trackVideoRef),
        onMouseLeave: () => handleLeaveTrack(trackVideoRef),
        onMouseMove: (event: MouseEvent<HTMLDivElement>) => handleSetTrackCurrentMouseX(event, trackVideoRef),
        onMouseDown: (event: MouseEvent<HTMLDivElement>) => handleSetValueTrack(event, trackVideoRef)
      }

      return (
        <div className={classes.base}>
          <div className={classes.timeDisplay}>
            {currentTime}
          </div>
          <div className={classes.track}
            {...trackHandlers}
            ref={trackVideoRef}>
            <div
              className={`${classes.tooltip}${isShowTooltipClass}`}
              style={{ left: `${tooltipPosition}%` }}>
              <span className={classes.title}>
                {hoverTime}
              </span>
            </div>
            <div
              className={classes.progress}
              style={{ width: `${trackProgress}%` }}>
              <div className={classes.thumb} />
            </div>
          </div>
          <div className={classes.timeDisplay}>
            -{remainingTime}
          </div>
        </div>
      )
    }

    const renderPanel = (): JSX.Element => {
      const mainClasses: Record<string, string> = {
        base: "media-player-control-panel",
        wrapper: "media-player-control-panel__wrapper",
        item: "media-player-control-panel__item",
        itemPaddingLeft: "media-player-control-panel__item_padding_left",
      }
      const quealityClasses: Record<string, string> = {
        base: "media-player-control-quality",
        item: "media-player-control-quality__item",
        list: "media-player-control-quality__list",
        show: isShowHdList
          ? " media-player-control-quality_show"
          : "",
        btn: "media-player-control-quality__btn",
        btnActive: " media-player-control-quality__btn_active",
      }
      const trackHandlers: React.HTMLAttributes<HTMLDivElement> = {
        onMouseEnter: () => handleHoverTrack(trackVolumeRef),
        onMouseLeave: () => handleLeaveTrack(trackVolumeRef),
        onMouseMove: (event: MouseEvent<HTMLDivElement>) => handleSetTrackCurrentMouseX(event, trackVolumeRef),
        onMouseDown: (event: MouseEvent<HTMLDivElement>) => handleSetValueTrack(event, trackVolumeRef)
      }
      const tooltipPosition: number = trackSetting.currentMouseX.volume
      const trackProgress: number = playerStatus.volume.value
      const titleClass = "title"
      const titleSizeMClass = `${titleClass} ${titleClass}_size_m`
      const titleQualityMenu = "Качество"

      const setIsActiveClassBtnQuality = (currentQuality: VideoQuality, quality: string) => {
        return currentQuality === quality
          ? `${quealityClasses.btn}${quealityClasses.btnActive} ${titleClass}`
          : `${quealityClasses.btn} ${titleClass}`
      }

      const formatQualityLabel = (quality: VideoQuality): string => quality === '360p'
        ? `SD ${quality}`
        : `HD ${quality}`

      const renderListQualityItem = (src: SrcMediaPlayer | null) => {
        if (!src) return null

        const videoQualityOptions = Object.entries(src)
          .filter(([key, value]) => key !== '_current' && value !== '' && key !== '_id')

        const QUALITY_MAP: Record<VideoQualityKey, VideoQuality> = {
          'quality360': '360p',
          'quality720': '720p',
          'quality1080': '1080p',
          'quality2160': '2160p',
        }

        return (
          <ul className={quealityClasses.list}>
            {videoQualityOptions.map(([key, _], index) => (
              <li className={quealityClasses.item} key={index} >
                <Btn
                  type="button"
                  className="btn_transparent"
                  onClick={() => handleClickBtnQualityVideoItem(QUALITY_MAP[key as VideoQualityKey])}
                >
                  <span className={setIsActiveClassBtnQuality(src._current.type, QUALITY_MAP[key as VideoQualityKey])}>
                    {formatQualityLabel(QUALITY_MAP[key as VideoQualityKey])}
                  </span>
                </Btn>
              </li>
            ))}
          </ul>
        )
      }

      const renderVolume = (): JSX.Element => {
        const classes: Record<string, string> = {
          base: "media-player-volume",
          item: "media-player-volume__item",
          itemOpacity: "media-player-volume__item_opacity",
          isShow: trackSetting.isShowTrack.volume
            ? " media-player-volume__item_show"
            : "",
          track: "media-player-volume__track",
          tooltip: "media-player-volume__tooltip",
          progress: "media-player-volume__progress",
          thumb: "media-player-volume__thumb",
        }

        const toggleIconMuted = (): JSX.Element => playerStatus.volume.isMuted
          ? iconsJSX.muted
          : iconsJSX.unmuted

        return (
          <div className={`${mainClasses.item} ${mainClasses.itemPaddingLeft}`}>
            <div className={classes.base}
              onMouseLeave={() => handleLeaveTrack(trackVolumeRef)}>
              <div className={classes.item}
                onMouseEnter={() => handleHoverTrack(trackVolumeRef)}>
                <Btn
                  type="button"
                  className="btn_transparent btn_stroke_white btn_scale_hover"
                  onClick={handleClickBtnMuted}>
                  {toggleIconMuted()}
                </Btn>
              </div>
              <div className={`${classes.item} ${classes.itemOpacity}${classes.isShow}`}
                {...trackHandlers}>
                <div className={classes.track} ref={trackVolumeRef}>
                  <div className={classes.tooltip}
                    style={{ left: `${tooltipPosition}%` }}>
                    <span className={titleClass}>
                      {trackSetting.currentMouseX.volume}
                    </span>
                  </div>
                  <div className={classes.progress}
                    style={{ width: `${trackProgress}%` }}>
                    <div className={classes.thumb} ref={thumbVolumeRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      return (
        <div className={mainClasses.base}>
          <div className={mainClasses.wrapper}>
            <div className={mainClasses.item}>
              <Btn
                type="button"
                className="btn_transparent btn_scale_hover"
                onClick={handleClickBtnRewind}
              >
                {iconsJSX.rewind}
              </Btn>
            </div>
            <div className={mainClasses.item}>
              <Btn
                type="button"
                className="btn_transparent btn_scale_hover"
                onClick={handleClickBtnPlayPause}
              >
                {renderBtnPlayOrPauseIcon()}
              </Btn>
            </div>
            <div className={mainClasses.item}>
              <Btn
                type="button"
                className="btn_transparent btn_scale_hover"
                onClick={handleClickBtnForward}
              >
                {iconsJSX.forward}
              </Btn>
            </div>
            {renderVolume()}
          </div>
          <div className={mainClasses.wrapper}>
            <div className={mainClasses.item}>
              <div className={`${quealityClasses.base}${quealityClasses.show}`}>
                <span className={titleSizeMClass}>
                  {titleQualityMenu}
                </span>
                {renderListQualityItem(src)}
              </div>
              <Btn
                type="button"
                className="btn_transparent btn_scale_hover"
                onClick={handleClickBtnQualityVideo}
              >
                {iconsJSX.hd}
              </Btn>
            </div>
            <div className="media-player-control-panel__item">
              <Btn
                type="button"
                className="btn_transparent btn_scale_hover"
                onClick={handleClickBtnFullScreen}
              >
                {iconsJSX.fullScreen}
              </Btn>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={`${baseClass}${fullScreenClass}${inActiveClass}`}>
        {renderTimeBar()}
        {renderPanel()}
      </div>
    )
  }

  return (
    <div className="media-player">
      <div className={setClassMainElement(isShow, playerStatus.fullScreen)}
        ref={mediaPlayerMainRef}
      >
        <div className="media-player-main__wrapper">
          <div className={setClassHeader(playerStatus.fullScreen)}>
            <div className="media-player-main-header__item">
              {renderAgeRestriction(content?.data.ageRestriction)}
              <div className={setClassHeaderTitle(inactive)}>
                <h3>{title}</h3>
              </div>
            </div>
            <div className={setClassHeaderCloseBtn(inactive)}>
              <Btn
                type="button"
                className="btn_transparent btn_scale_hover"
                onClick={handleClickBtnClose}
              >
                {iconsJSX.close}
              </Btn>
            </div>
          </div>
          {renderVideo({ error, src, loading })}
          {renderControlPanel()}
        </div>
      </div>
    </div>
  )
}
