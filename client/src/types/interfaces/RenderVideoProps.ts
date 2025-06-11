import { SrcMediaPlayer } from "../SrcMediaPlayer"

export interface RenderVideoProps {
  error: { number: number; message: string; } | null
  src: SrcMediaPlayer | null,
  loading: boolean
}
