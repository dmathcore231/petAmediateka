import { useRef, useEffect, useState, MouseEvent, RefObject } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { updatePlayerStatus, toggleShow, resetPlayerStatus, getSrc, setVideoQuality } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { MediaPlayerProps } from "../../types/interfaces/MediaPlayerProps"
import { TrackSetting } from "../../types/TrackSetting"
import { VideoQuality } from "../../types/VideoQuality"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { Rewind10Icon } from "../../assets/icons/Rewind10Icon"
import { Forward10Icon } from "../../assets/icons/Forward10Icon"
import { PauseIcon } from "../../assets/icons/PauseIcon"
import { PlayerStartIcon } from "../../assets/icons/PlayerStartIcon"
import { FullScreenIcon } from "../../assets/icons/FullScreenIcon"
import { MutedIcon } from "../../assets/icons/MutedIcon"
import { UnmutedIcon } from "../../assets/icons/UnmutedIcon"
import { HdIcon } from "../../assets/icons/HdIcon"

export function MediaPlayer({ type }: MediaPlayerProps): JSX.Element {
  const dispatch = useAppDispatch()
  const videoRef = useRef<HTMLVideoElement>(null)
  const thumbVolumeRef = useRef<HTMLDivElement>(null)
  const trackVolumeRef = useRef<HTMLDivElement>(null)
  const trackVideoRef = useRef<HTMLDivElement>(null)
  const mediaPlayerMainRef = useRef<HTMLDivElement>(null)

  const { isShow, playerStatus, src, videoQuality } = useAppSelector(state => state.mediaPlayer)

  const [timeVideo, setTimeVideo] = useState(0)
  const [trackSetting, setTrackSetting] = useState<TrackSetting>({
    isShowTrack: {
      volume: false,
      time: false,
    },
    currentMouseX: {
      volume: 0,
      time: 0,
    },
  })
  const [inactive, setInactive] = useState(true)
  const [isShowHdList, setIsShowHdList] = useState(false)
  const inactiveTime = 3000

  useEffect(() => {
    let timeoutId: number | null = null;

    const handleCheckUserInactive = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        setInactive(true)
      }, inactiveTime)
      setInactive(false)
    };

    if (playerStatus.status === 'pause') {
      return
    }

    document.addEventListener("mousemove", handleCheckUserInactive)
    document.addEventListener("mousedown", handleCheckUserInactive)
    document.addEventListener("keydown", handleCheckUserInactive)
    document.addEventListener("touchmove", handleCheckUserInactive)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      document.removeEventListener("mousedown", handleCheckUserInactive)
      document.removeEventListener("mousemove", handleCheckUserInactive)
      document.removeEventListener("keydown", handleCheckUserInactive)
      document.removeEventListener("touchmove", handleCheckUserInactive)
    }
  }, [playerStatus.status])

  useEffect(() => {
    if (videoRef.current && isShow) {
      dispatch(resetPlayerStatus())
      videoRef.current.play()
      videoRef.current.currentTime = 0
      videoRef.current.volume = 1
      dispatch(updatePlayerStatus({
        ...playerStatus, status: "play",
      }))
      dispatch(getSrc('/hotd/hotdTrailerVideo720.mp4'))
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
  }, [videoQuality])

  const getFixedTime = (time: number) => {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)}`
  }

  const renderBtnPlayOrPauseIcon = (): JSX.Element => {
    if (playerStatus.status === "play") {
      return <PauseIcon width={35} height={35} />
    } else {
      return <PlayerStartIcon width={35} height={35} />
    }
  }

  const handleClickBtnPlay = () => {
    dispatch(toggleShow(true))
  }

  const handleClickBtnClose = () => {
    if (videoRef.current && !playerStatus.fullScreen) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0

      dispatch(resetPlayerStatus())
      dispatch(toggleShow(false))
      setIsShowHdList(false)
      setTimeVideo(0)
    } else {
      dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
      document.exitFullscreen()
    }
  }

  const handleClickBtnPlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        dispatch(updatePlayerStatus({
          ...playerStatus, status: "play"
        }))
        videoRef.current.play()
      } else {
        dispatch(updatePlayerStatus({
          ...playerStatus, status: "pause"
        }))
        videoRef.current.pause()
      }
    }
  }

  const handleClickBtnMuted = () => {
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false
        dispatch(updatePlayerStatus({
          ...playerStatus,
          volume: {
            isMuted: false,
            value: playerStatus.volume.valueWithMuted,
            valueWithMuted: playerStatus.volume.valueWithMuted
          }
        }))
      } else {
        videoRef.current.muted = true
        dispatch(updatePlayerStatus({
          ...playerStatus,
          volume: {
            isMuted: true,
            value: 0,
            valueWithMuted: playerStatus.volume.value
          }
        }))
      }
    }
  }

  const handleHoverTrack = (track: RefObject<HTMLDivElement>): void => {
    if (track === trackVolumeRef) {
      setTrackSetting(prev => ({ ...prev, isShowTrack: { ...prev.isShowTrack, volume: true } }))
    } else {
      setTrackSetting(prev => ({ ...prev, isShowTrack: { ...prev.isShowTrack, time: true } }))
    }
  }


  const handleLeaveTrack = (track: RefObject<HTMLDivElement>): void => {
    if (track === trackVolumeRef) {
      setTrackSetting(prev => ({ ...prev, isShowTrack: { ...prev.isShowTrack, volume: false } }))
    } else {
      setTrackSetting(prev => ({ ...prev, isShowTrack: { ...prev.isShowTrack, time: false } }))
    }
  }

  const handleSetTrackCurrentMouseX = (e: MouseEvent<HTMLDivElement>,
    track: RefObject<HTMLDivElement>) => {
    const currentMouseX = e.clientX

    if (track.current) {
      const minPos = track.current.getBoundingClientRect().left
      const maxPos = track.current.getBoundingClientRect().right

      if (currentMouseX < minPos || currentMouseX > maxPos) {
        return
      }

      if (track === trackVolumeRef) {
        const percent = Math.round(((currentMouseX - minPos) / (maxPos - minPos)) * 100)
        setTrackSetting(prev => ({
          ...prev,
          currentMouseX: {
            ...prev.currentMouseX,
            volume: percent
          }
        }))
      } else {
        const percent = Math.round(((currentMouseX - minPos) / (maxPos - minPos)) * playerStatus.time.total)

        setTrackSetting(prev => ({
          ...prev,
          currentMouseX: {
            ...prev.currentMouseX,
            time: percent
          }
        }))
      }
    }
  }

  const handleSetValueTrack = (e: MouseEvent<HTMLDivElement>, track: RefObject<HTMLDivElement>) => {
    const currentMouseX = e.clientX

    if (track.current) {
      const minPos = track.current.getBoundingClientRect().left
      const maxPos = track.current.getBoundingClientRect().right

      if (currentMouseX < minPos || currentMouseX > maxPos) {
        return
      }

      if (track === trackVolumeRef) {
        const percent = Math.round(((currentMouseX - minPos) / (maxPos - minPos)) * 100)

        setTrackSetting(prev => ({
          ...prev,
          ...prev.currentMouseX,
          volume: percent
        }))

        switch (percent > 0) {
          case true: {
            dispatch(updatePlayerStatus({
              ...playerStatus, volume: { isMuted: false, value: percent, valueWithMuted: percent }
            }))
            break
          }
          case false: {
            dispatch(updatePlayerStatus({
              ...playerStatus, volume: { isMuted: true, value: 0, valueWithMuted: 0 }
            }))
            break
          }
        }

        videoRef.current!.volume = percent / 100
      } else {
        const percent = Math.round(((currentMouseX - minPos) / (maxPos - minPos)) * playerStatus.time.total)

        setTrackSetting(prev => ({
          ...prev,
          ...prev.currentMouseX,
          time: percent
        }))

        if (videoRef.current) {
          videoRef.current.currentTime = percent
        }

        setTimeVideo(percent)
      }
    }
  }

  const handleClickBtnForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10
    }
  }

  const handleClickBtnRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10
    }
  }

  const handleClickBtnFullScreen = () => {
    if (mediaPlayerMainRef.current) {
      mediaPlayerMainRef.current.requestFullscreen()
        .then((result) => {
          if (result === undefined && !playerStatus.fullScreen) {
            dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: true }))
          } else {
            dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
            document.exitFullscreen()
          }
        })
    }
  }

  const handleClickBtnQualityVideo = () => {
    setIsShowHdList(prev => !prev)
  }

  const handleClickBtnQualityVideoItem = (quality: VideoQuality) => {
    if (quality === '360p') {
      dispatch(getSrc('/hotd/hotdTrailerVideo360.mp4'))
      dispatch(setVideoQuality('360p'))
    } else {
      dispatch(getSrc('/hotd/hotdTrailerVideo720.mp4'))
      dispatch(setVideoQuality('720p'))
    }
  }

  return (
    <div className="media-player">
      {type === "preview" && (
        <div className="media-player-preview" onClick={handleClickBtnPlay}>
          <div className="media-player-preview__picture">
            <div className="media-player-preview__btn-play">
              <MediaPlayIcon width={80} height={80} />
            </div>
            <img src="/hotd/hotdTrailer.jpg" alt="trailer" className="media-player-preview__img" />
          </div>
        </div>
      )}
      {type === "player" && isShow && (
        <div className={`media-player-main`
          + (isShow ? " media-player-main_show" : "")
          + (playerStatus.fullScreen ? "" : " container")}
          ref={mediaPlayerMainRef}
        >
          <div className="media-player-main__wrapper">
            <div className={"media-player-main-header" + (playerStatus.fullScreen ? " container" : "")}>
              <div className="media-player-main-header__item">
                <div className="media-player-age-restriction">
                  <div className="media-player-age-restriction__item title title_size_xl">
                    18
                  </div>
                  <div className="media-player-age-restriction__item title title_size_m">
                    +
                  </div>
                </div>
                <div className={"media-player-main-header__title" + (inactive
                  ? " media-player-main-header__title_fade"
                  : " media-player-main-header__title_show")}>
                  <h3>Дом Дракона</h3>
                </div>
              </div>
              <div className={"media-player-main-header__item"
                + (inactive ? " media-player-main-header__item_fade" : "")}>
                <Btn
                  type="button"
                  className="btn_transparent btn_scale_hover"
                  onClick={handleClickBtnClose}
                >
                  <CloseIcon width={30} height={30} />
                </Btn>
              </div>
            </div>
            <video src={src!}
              autoPlay
              preload="auto"
              muted={playerStatus.volume.isMuted}
              ref={videoRef}
              className={"media-player-main-video" + (playerStatus.fullScreen ? " media-player-main-video_fullscreen" : "")}
              onTimeUpdate={(e) => setTimeVideo(Number(e.currentTarget.currentTime.toFixed(2)))}
              onEnded={() => {
                dispatch(updatePlayerStatus({
                  ...playerStatus, status: "pause"
                }))
              }}
            ></video>
            <div className={"media-player-control"
              + (playerStatus.fullScreen ? " container" : "")
              + (inactive ? " media-player-control_fade" : "")}>
              <div className="media-player-time-bar">
                <div className="media-player-time title title_size_m">
                  {getFixedTime(playerStatus.time.current)}
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
                      {getFixedTime(trackSetting.currentMouseX.time)}
                    </span>
                  </div>
                  <div className="media-player-time-bar__progress"
                    style={{ width: `${playerStatus.time.current / playerStatus.time.total * 100}%` }}
                  >
                    <div className="media-player-time-bar__thumb"></div>
                  </div>
                </div>
                <div className="media-player-time title title_size_m">
                  -{getFixedTime(playerStatus.time.left)}
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
                              + (videoQuality === '360p'
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
                              + (videoQuality === '720p'
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
      )}
    </div>
  )
}
