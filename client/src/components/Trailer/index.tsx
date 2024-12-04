import { useAppDispatch, useAppSelector } from "../../hooks"
import { setSrc, toggleShow, setTitle } from "../../redux/MediaPlayerSlice"
import { TrailerProps } from "../../types/interfaces/TrailerProps"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"

export function Trailer({ trailerImg, seasonsIndex, src, title }: TrailerProps): JSX.Element {
  const dispatch = useAppDispatch()

  const { isShow } = useAppSelector(state => state.mediaPlayer)

  const handleClickBtnPlay = () => {
    if (!isShow && src && title) {
      dispatch(toggleShow(true))
      dispatch(setSrc(src))
      dispatch(setTitle(title))
    }
  }

  return (
    <div className="trailer">
      <div className="trailer__title">
        {seasonsIndex && (
          <h3>{`Трейлер - ${seasonsIndex} сезон`}</h3>
        )}
      </div>
      <div className="trailer-main" onClick={handleClickBtnPlay}>
        <div className="trailer-main__btn">
          <MediaPlayIcon width={80} height={80} />
        </div>
        {trailerImg && (
          < img src={trailerImg} alt="trailer" className="trailer-main__img" />
        )}
      </div>
    </div>
  )
}
