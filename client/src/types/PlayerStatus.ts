
export type PlayerStatus = {
  status: "pause" | "play" | null
  time: {
    current: number,
    left: number,
    total: number
  }
  volume: {
    isMuted: boolean
    value: number
    valueWithMuted: number
  }
  fullScreen: boolean
}
