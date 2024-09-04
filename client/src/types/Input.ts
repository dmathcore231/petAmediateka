
export type errorData = {
  field: "email" | "password"
  message: string | null
}

export interface InputErrorState {
  value: boolean
  errorData: errorData | null
}
