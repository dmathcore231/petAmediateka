import { IconProps } from "../../types/interfaces/IconProps"

export function ZenIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" d="M24 12.132v-.264c-5.314-.161-7.744-.294-9.682-2.186C12.426 7.744 12.293 5.314 12.133 0h-.266c-.16 5.314-.293 7.744-2.185 9.682C7.744 11.574 5.314 11.707 0 11.868v.264c5.314.161 7.744.294 9.682 2.186 1.892 1.938 2.025 4.368 2.185 9.682h.266c.16-5.314.293-7.744 2.185-9.682 1.938-1.892 4.368-2.025 9.682-2.186z"></path>
    </svg>
  )
}
