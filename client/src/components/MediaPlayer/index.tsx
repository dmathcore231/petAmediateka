import { useRef, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { updatePlayerStatus, toggleShow, resetStateMediaPlayer } from "../../redux/MediaPlayerSlice"
import { Btn } from "../Btn"
import { MediaPlayerProps } from "../../types/interfaces/MediaPlayerProps"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { Rewind10Icon } from "../../assets/icons/Rewind10Icon"
import { Forward10Icon } from "../../assets/icons/Forward10Icon"
import { PauseIcon } from "../../assets/icons/PauseIcon"
import { PlayerStartIcon } from "../../assets/icons/PlayerStartIcon"
import { FullScreenIcon } from "../../assets/icons/FullScreenIcon"
import { MutedIcon } from "../../assets/icons/MutedIcon"
import { UnmutedIcon } from "../../assets/icons/UnmutedIcon"
import { current } from "@reduxjs/toolkit"

export function MediaPlayer({ type }: MediaPlayerProps): JSX.Element {
  const dispatch = useAppDispatch()
  const videoRef = useRef<HTMLVideoElement>(null)

  const { isShow, playerStatus } = useAppSelector(state => state.mediaPlayer)

  const [timeVideo, setTimeVideo] = useState(0)

  useEffect(() => {
    if (videoRef.current && isShow) {
      videoRef.current.play()
      dispatch(updatePlayerStatus({
        ...playerStatus, status: "play"
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
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    dispatch(resetStateMediaPlayer())
    setTimeVideo(0)
    dispatch(toggleShow(false))
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
      } else {
        videoRef.current.muted = true
      }
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
        <div className={`media-player-main ${isShow ? "media-player-main_show container" : ""}`}>
          <div className="media-player-main__wrapper">
            <div className="media-player-main-header">
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
              muted={playerStatus.volume.mute}
              ref={videoRef}
              className="media-player-main-video"
              onTimeUpdate={(e) => setTimeVideo(Number(e.currentTarget.currentTime.toFixed(2)))}
              onEnded={() => {
                dispatch(updatePlayerStatus({
                  ...playerStatus, status: "pause"
                }))
              }}
            ></video>
            <div className="media-player-control">
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
                      onClick={() => console.log('click')}
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
                      onClick={() => console.log('click')}
                    >
                      <Forward10Icon width={35} height={35} />
                    </Btn>
                  </div>
                  <div className="media-player-control-panel__item media-player-control-panel__item_padding_left">
                    <Btn
                      type="button"
                      className="btn_transparent btn_stroke_white"
                      onClick={handleClickBtnMuted}
                    >
                      {videoRef.current?.muted
                        ? (<MutedIcon width={35} height={35} />)
                        : (<UnmutedIcon width={35} height={35} />)}
                    </Btn>
                  </div>
                </div>
                <div className="media-player-control-panel__wrapper">
                  <div className="media-player-control-panel__item">
                    <Btn
                      type="button"
                      className="btn_transparent"
                      onClick={() => console.log('click')}
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
