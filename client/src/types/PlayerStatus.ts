
export type PlayerStatus = {
  loading: boolean
  status: "pause" | "play" | null
  time: {
    current: number,
    left: number,
    total: number
  }
  volume: {
    isMuted: boolean
    value: number
  }
}