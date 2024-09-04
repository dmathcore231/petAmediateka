
export type UserSubscription = {
  type: "oneMonth" | "threeMonths" | "sixMonths" | "oneYear"
  date: {
    startDate: number
    expirationDate: number
  }
}
