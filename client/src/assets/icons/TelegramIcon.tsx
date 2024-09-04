import { IconProps } from "../../types/interfaces/IconProps"

export function TelegramIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="inherit" fillRule="nonzero" d="M17.588 7.401l-1.981 9.545c-.146.677-.54.84-1.09.522l-3.019-2.274-1.455 1.433c-.161.165-.297.304-.609.304l.214-3.14 5.593-5.165c.244-.22-.053-.344-.374-.125L7.954 12.95 4.975 12c-.647-.21-.662-.662.136-.98l11.64-4.589c.54-.199 1.012.134.837.97z"></path>
    </svg>
  )
}
