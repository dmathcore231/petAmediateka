import { SrcMediaPlaer } from "../SrcMediaPlaer"

export interface RenderVideoProps {
  error: { number: number; message: string; } | null
  src: SrcMediaPlaer | null,
  loading: boolean
}
