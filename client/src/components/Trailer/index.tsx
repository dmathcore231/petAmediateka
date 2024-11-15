import { useAppDispatch, useAppSelector } from "../../hooks"
import { toggleShow } from "../../redux/MediaPlayerSlice"
import { TrailerProps } from "../../types/interfaces/TrailerProps"
import { MediaPlayIcon } from "../../assets/icons/MediaPlayIcon"

export function Trailer({ trailerData }: TrailerProps): JSX.Element {
  const dispatch = useAppDispatch()

  const { isShow } = useAppSelector(state => state.mediaPlayer)
  const { trailer, seasons } = trailerData

  const handleClickBtnPlay = () => {
    if (!isShow) {
      dispatch(toggleShow(true))
    }
  }

  return (
    <div className="trailer">
      <div className="trailer__title">
        {seasons && (
          <h3>{`Трейлер - ${seasons.length} сезон`}</h3>
        )}
      </div>
      <div className="trailer-main" onClick={handleClickBtnPlay}>
        <div className="trailer-main__btn">
          <MediaPlayIcon width={80} height={80} />
        </div>
        {trailer && (
          < img src={trailer.img} alt="trailer" className="trailer-main__img" />
        )}
      </div>
    </div>
  )
}
