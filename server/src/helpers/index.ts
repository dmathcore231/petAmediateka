import { ErrorMain } from '../types/Error'

export function checkBadRequest(fields: string[], errorMessage: string) {

  const missingFields = fields.filter(field => !field)

  if (missingFields.length > 0) {
    const error: ErrorMain = {
      status: 400,
      numberError: 102,
      message: `Bad request: ${errorMessage}`,
      value: missingFields.join(", ")
    }

    throw error
  }
}
