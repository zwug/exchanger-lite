export type Rates = Record<string, number>;

export interface ExchangeState {
  data: ExchangeData | null,
  isLoading: boolean,
}

export interface ExchangeData {
  base: string,
  rates: Rates,
  timestamp: number,
}
