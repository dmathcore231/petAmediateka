import { IErrorMainOptions } from '../IErrorMainOptions'

export class ErrorMain extends Error {
  public status: number
  public numberError: number
  public value?: string | null

  constructor(options: IErrorMainOptions) {
    super(options.message)
    this.status = options.status
    this.numberError = options.numberError
    this.value = options.value

    Object.setPrototypeOf(this, ErrorMain.prototype)
  }
}
