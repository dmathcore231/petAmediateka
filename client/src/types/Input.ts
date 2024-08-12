
export type errorData = {
  field: "email"
  message: string | null
}

export interface InputErrorState {
  value: boolean
  errorData: errorData | null
}
