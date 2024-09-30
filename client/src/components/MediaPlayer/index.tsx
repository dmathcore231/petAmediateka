import { useRef, useEffect, useState, MouseEvent, RefObject } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { updatePlayerStatus, toggleShow, resetPlayerStatus } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { MediaPlayerProps } from "../../types/interfaces/MediaPlayerProps"
import { TrackSetting } from "../../types/TrackSetting"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { Rewind10Icon } from "../../assets/icons/Rewind10Icon"
import { Forward10Icon } from "../../assets/icons/Forward10Icon"
import { PauseIcon } from "../../assets/icons/PauseIcon"
import { PlayerStartIcon } from "../../assets/icons/PlayerStartIcon"
import { FullScreenIcon } from "../../assets/icons/FullScreenIcon"
import { MutedIcon } from "../../assets/icons/MutedIcon"
import { UnmutedIcon } from "../../assets/icons/UnmutedIcon"

export function MediaPlayer({ type }: MediaPlayerProps): JSX.Element {
  const dispatch = useAppDispatch()
  const videoRef = useRef<HTMLVideoElement>(null)
  const thumbVolumeRef = useRef<HTMLDivElement>(null)
  const trackVolumeRef = useRef<HTMLDivElement>(null)
  const mediaPlayerMainRef = useRef<HTMLDivElement>(null)

  const { isShow, playerStatus } = useAppSelector(state => state.mediaPlayer)

  const [timeVideo, setTimeVideo] = useState(0)
  const [trackSetting, setTrackSetting] = useState<TrackSetting>({
    isShowTrack: false,
    currentMouseX: 0,
  })

  useEffect(() => {
    if (videoRef.current && isShow) {
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
      setTimeVideo(0)
      dispatch(toggleShow(false))
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

  const handleHoverBtnMuted = () => {
    setTrackSetting(prev => ({ ...prev, isShowTrack: true }))
  }

  const handleLeaveBtnMuted = () => {
    setTrackSetting(prev => ({ ...prev, isShowTrack: false }))
  }

  const handleSetTrackCurrentMouseX = (e: MouseEvent<HTMLDivElement>,
    track: RefObject<HTMLDivElement>) => {
    const currentMouseX = e.clientX

    if (track.current) {
      const minPos = track.current.getBoundingClientRect().left
      const maxPos = track.current.getBoundingClientRect().right

      if (currentMouseX < minPos || currentMouseX > maxPos) {
        return
      } else {
        const percent = Math.min(Math.round(((currentMouseX - minPos) / (maxPos - minPos)) * 100), 100)
        setTrackSetting(prev => ({ ...prev, currentMouseX: percent }))
      }
    }
  }

  const handleSetVolume = (e: MouseEvent<HTMLDivElement>) => {
    const currentMouseX = e.clientX

    if (trackVolumeRef.current && videoRef.current) {
      const minPos = trackVolumeRef.current.getBoundingClientRect().left
      const maxPos = trackVolumeRef.current.getBoundingClientRect().right

      if (currentMouseX < minPos || currentMouseX > maxPos) {
        return
      } else {
        const percent = Math.min(Math.round(((currentMouseX - minPos) / (maxPos - minPos)) * 100), 100)

        setTrackSetting(prev => ({ ...prev, currentMouseX: percent }))
        if (percent > 0) {
          dispatch(updatePlayerStatus({
            ...playerStatus, volume: { isMuted: false, value: percent, valueWithMuted: percent }
          }))
        } else {
          dispatch(updatePlayerStatus({
            ...playerStatus, volume: { isMuted: true, value: 0, valueWithMuted: 0 }
          }))
        }
        videoRef.current.volume = percent / 100
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
            console.log('+fullsceen')
            dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: true }))
          } else {
            dispatch(updatePlayerStatus({ ...playerStatus, fullScreen: false }))
            document.exitFullscreen()
          }
        })
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
      {type === "player" && (
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
                <div className="media-player-main-header__title">
                  <h3>Дом Дракона</h3>
                </div>
              </div>
              <div className="media-player-main-header__item">
                <Btn
                  type="button"
                  className="btn_transparent"
                  onClick={handleClickBtnClose}
                >
                  <CloseIcon width={30} height={30} />
                </Btn>
              </div>
            </div>
            <video src="/hotd/hotdTrailerVideo720.mp4"
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
            <div className={"media-player-control" + (playerStatus.fullScreen ? " container" : "")}>
              <div className="media-player-time-bar">
                <div className="media-player-time title title_size_m">
                  {getFixedTime(playerStatus.time.current)}
                </div>
                <div className="media-player-time-bar__track">
                  <div className="media-player-time-bar__progress"
                    style={{ width: `${playerStatus.time.current / playerStatus.time.total * 100}%` }}
                  >
                    <div className="media-player-time-bar__thumb"
                    ></div>
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
                      className="btn_transparent"
                      onClick={handleClickBtnRewind}
                    >
                      <Rewind10Icon width={35} height={35} />
                    </Btn>
                  </div>
                  <div className="media-player-control-panel__item">
                    <Btn
                      type="button"
                      className="btn_transparent"
                      onClick={handleClickBtnPlayPause}
                    >
                      {renderBtnPlayOrPauseIcon()}
                    </Btn>
                  </div>
                  <div className="media-player-control-panel__item">
                    <Btn
                      type="button"
                      className="btn_transparent"
                      onClick={handleClickBtnForward}
                    >
                      <Forward10Icon width={35} height={35} />
                    </Btn>
                  </div>
                  <div className="media-player-control-panel__item media-player-control-panel__item_padding_left">
                    <div className="media-player-volume"
                      onMouseLeave={handleLeaveBtnMuted}>
                      <div className="media-player-volume__item"
                        onMouseEnter={handleHoverBtnMuted}>
                        <Btn
                          type="button"
                          className="btn_transparent btn_stroke_white"
                          onClick={handleClickBtnMuted}>
                          {playerStatus.volume.isMuted
                            ? (<MutedIcon width={35} height={35} />)
                            : (<UnmutedIcon width={35} height={35} />)}
                        </Btn>
                      </div>
                      <div className={"media-player-volume__item media-player-volume__item_opacity" + (trackSetting.isShowTrack ? " media-player-volume__item_show" : "")}
                        onMouseEnter={handleHoverBtnMuted}
                        onMouseMove={(e) => handleSetTrackCurrentMouseX(e, trackVolumeRef)}
                        onMouseDown={handleSetVolume}
                      >
                        <div className="media-player-volume__track"
                          ref={trackVolumeRef}
                        >
                          <div className="media-player-volume__tooltip"
                            style={{ left: `${trackSetting.currentMouseX}%` }}
                          >
                            <span className="text text_size_xs">
                              {trackSetting.currentMouseX}
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
                    <Btn
                      type="button"
                      className="btn_transparent"
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
