export interface InputData {
  amount: number,
  currency: string,
}

export interface ExchangeState {
  from: InputData,
  to: InputData,
}
