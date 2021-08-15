export interface InputData {
  amount: number,
  currency: string,
}

export interface ExchangeFormState {
  from: InputData,
  to: InputData,
}
