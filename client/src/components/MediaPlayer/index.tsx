import { useRef, useEffect, useState, MouseEvent, RefObject, JSX } from "react"
import { RootState } from "../../redux/store"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { updatePlayerStatus, toggleShow, resetPlayerStatus, setSrc, setError, setCurrentSrc } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { TrackSetting } from "../../types/TrackSetting"
import { VideoQuality } from "../../types/VideoQuality"
import { SrcMediaPlaer } from "../../types/SrcMediaPlaer"
import { ContentStateItem } from "../../types/interfaces/InitialStatesSlice"
import { MediaContent } from "../../types/interfaces/MediaContent"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { Rewind10Icon } from "../../assets/icons/Rewind10Icon"
import { Forward10Icon } from "../../assets/icons/Forward10Icon"
import { PauseIcon } from "../../assets/icons/PauseIcon"
import { PlayerStartIcon } from "../../assets/icons/PlayerStartIcon"
import { FullScreenIcon } from "../../assets/icons/FullScreenIcon"
import { MutedIcon } from "../../assets/icons/MutedIcon"
import { UnmutedIcon } from "../../assets/icons/UnmutedIcon"
import { HdIcon } from "../../assets/icons/HdIcon"
import { Spinner } from "../Spinner"

export function MediaPlayer(): JSX.Element {
  const dispatch = useAppDispatch()
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

  useEffect((): void => {
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

  useEffect((): void => {
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

  useEffect((): void => {
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

  useEffect((): void => {
    if (!document.fullscreenElement) {
      dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
    } else {
      dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: true }))
    }
  }, [document.fullscreenElement])

  useEffect((): void => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeVideo
    }
  }, [src])

  const formatTimeWithHours = (timeInSeconds: number): string => {
    const hours: number = Math.floor(timeInSeconds / 3600)
    const minutes: number = Math.floor((timeInSeconds % 3600) / 60)
    const seconds: number = Math.floor(timeInSeconds % 60)

    return [
      hours > 0 ? hours : null,
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].filter(Boolean).join(':')
  }

  const renderBtnPlayOrPauseIcon = (): JSX.Element => {
    if (playerStatus.status === "play") {
      return <PauseIcon width={35} height={35} />
    } else {
      return <PlayerStartIcon width={35} height={35} />
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

  interface RenderVideoProps {
    error: { number: number; message: string; } | null
    src: SrcMediaPlaer | null,
    loading: boolean
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
                <CloseIcon width={30} height={30} />
              </Btn>
            </div>
          </div>
          {renderVideo({ error, src, loading })}
          <div className={"media-player-control"
            + (playerStatus.fullScreen ? " container" : "")
            + (inactive ? " media-player-control_fade" : "")}>
            <div className="media-player-time-bar">
              <div className="media-player-time title title_size_m">
                {formatTimeWithHours(playerStatus.time.current)}
              </div>
              <div className="media-player-time-bar__track"
                onMouseEnter={() => handleHoverTrack(trackVideoRef)}
                onMouseLeave={() => handleLeaveTrack(trackVideoRef)}
                onMouseMove={(event) => handleSetTrackCurrentMouseX(event, trackVideoRef)}
                onMouseDown={(event) => handleSetValueTrack(event, trackVideoRef)}
                ref={trackVideoRef}
              >
                <div className={"media-player-time-bar__tooltip"
                  + (trackSetting.isShowTrack.time
                    ? " media-player-time-bar__tooltip_show"
                    : "")}
                  style={{ left: `${(trackSetting.currentMouseX.time / playerStatus.time.total) * 100}%` }}
                >
                  <span className="text text_size_xs">
                    {formatTimeWithHours(trackSetting.currentMouseX.time)}
                  </span>
                </div>
                <div className="media-player-time-bar__progress"
                  style={{ width: `${playerStatus.time.current / playerStatus.time.total * 100}%` }}
                >
                  <div className="media-player-time-bar__thumb"></div>
                </div>
              </div>
              <div className="media-player-time title title_size_m">
                -{formatTimeWithHours(playerStatus.time.left)}
              </div>
            </div>
            <div className="media-player-control-panel">
              <div className="media-player-control-panel__wrapper">
                <div className="media-player-control-panel__item">
                  <Btn
                    type="button"
                    className="btn_transparent btn_scale_hover"
                    onClick={handleClickBtnRewind}
                  >
                    <Rewind10Icon width={35} height={35} />
                  </Btn>
                </div>
                <div className="media-player-control-panel__item">
                  <Btn
                    type="button"
                    className="btn_transparent btn_scale_hover"
                    onClick={handleClickBtnPlayPause}
                  >
                    {renderBtnPlayOrPauseIcon()}
                  </Btn>
                </div>
                <div className="media-player-control-panel__item">
                  <Btn
                    type="button"
                    className="btn_transparent btn_scale_hover"
                    onClick={handleClickBtnForward}
                  >
                    <Forward10Icon width={35} height={35} />
                  </Btn>
                </div>
                <div className="media-player-control-panel__item media-player-control-panel__item_padding_left">
                  <div className="media-player-volume"
                    onMouseLeave={() => handleLeaveTrack(trackVolumeRef)}>
                    <div className="media-player-volume__item"
                      onMouseEnter={() => handleHoverTrack(trackVolumeRef)}>
                      <Btn
                        type="button"
                        className="btn_transparent btn_stroke_white btn_scale_hover"
                        onClick={handleClickBtnMuted}>
                        {playerStatus.volume.isMuted
                          ? (<MutedIcon width={35} height={35} />)
                          : (<UnmutedIcon width={35} height={35} />)}
                      </Btn>
                    </div>
                    <div className={"media-player-volume__item media-player-volume__item_opacity" + (trackSetting.isShowTrack.volume ? " media-player-volume__item_show" : "")}
                      onMouseEnter={() => handleHoverTrack(trackVolumeRef)}
                      onMouseMove={(event) => handleSetTrackCurrentMouseX(event, trackVolumeRef)}
                      onMouseDown={(event) => handleSetValueTrack(event, trackVolumeRef)}
                    >
                      <div className="media-player-volume__track"
                        ref={trackVolumeRef}
                      >
                        <div className="media-player-volume__tooltip"
                          style={{ left: `${trackSetting.currentMouseX.volume}%` }}
                        >
                          <span className="text text_size_xs">
                            {trackSetting.currentMouseX.volume}
                          </span>
                        </div>
                        <div className="media-player-volume__progress"
                          style={{ width: `${playerStatus.volume.value}%` }}
                        >
                          <div className="media-player-volume__thumb"
                            ref={thumbVolumeRef}
                          >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="media-player-control-panel__wrapper">
                <div className="media-player-control-panel__item">
                  <div className={"media-player-control-quality"
                    + (isShowHdList ? " media-player-control-quality_show" : "")}>
                    <span className="ttitle title_size_m">
                      Качество
                    </span>
                    <ul className="media-player-control-quality__list">
                      <li className="media-player-control-quality__item">
                        <Btn
                          type="button"
                          className="btn_transparent"
                          onClick={() => handleClickBtnQualityVideoItem('360p')}
                        >
                          <span className={"media-player-control-quality__btn"
                            + (src?._current.type === '360p'
                              ? " media-player-control-quality__btn_active"
                              : ""
                            )
                            + (" title")}>
                            SD 360
                          </span>
                        </Btn>
                      </li>
                      <li className="media-player-control-quality__item">
                        <Btn
                          type="button"
                          className="btn_transparent"
                          onClick={() => handleClickBtnQualityVideoItem('720p')}
                        >
                          <span className={"media-player-control-quality__btn"
                            + (src?._current.type === '720p'
                              ? " media-player-control-quality__btn_active"
                              : ""
                            )
                            + (" title")}>
                            HD 720
                          </span>
                        </Btn>
                      </li>
                    </ul>
                  </div>
                  <Btn
                    type="button"
                    className="btn_transparent btn_scale_hover"
                    onClick={handleClickBtnQualityVideo}
                  >
                    <HdIcon width={40} height={35} />
                  </Btn>
                </div>
                <div className="media-player-control-panel__item">
                  <Btn
                    type="button"
                    className="btn_transparent btn_scale_hover"
                    onClick={handleClickBtnFullScreen}
                  >
                    <FullScreenIcon width={35} height={35} />
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
