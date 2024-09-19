import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"

export function MediaPlayer(): JSX.Element {

  const handleClickPlay = () => {
    console.log('play')
  }
  return (
    <div className="media-player">
      <div className="media-player-preview" onClick={handleClickPlay}>
        <div className="media-player-preview__picture">
          <div className="media-player-preview__btn-play">
            <MediaPlayIcon width={80} height={80} />
          </div>
          <img src="/hotd/hotdTrailer.jpg" alt="trailer" className="media-player-preview__img" />
        </div>
      </div>
    </div>
  )
}
