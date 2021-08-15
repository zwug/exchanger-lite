export type Rates = Record<string, number>;

export interface ExchangeData {
  base: string,
  rates: Rates,
  timestamp: number,
}
