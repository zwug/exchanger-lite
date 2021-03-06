import { parseObject, parseNumber, parseString } from "../utils/typeChecks";
import { Rates, ExchangeData } from "../interfaces/ExchangeData";

const OPEN_EXHANGE_RATES_APP_ID = '36f4f4c6bd2341dba34fb5cc0b1c70cf';
const OPEN_EXHANGE_RATES_BASE = 'USD';
const OPEN_EXHANGE_RATES_ENDPOINT = 'https://openexchangerates.org/api/latest.json';

const parseRates = (dataRaw: unknown): Rates => {
  const ratesObj = parseObject(dataRaw);
  const rates: Rates = {};

  for (const [currency, rate] of Object.entries(ratesObj)) {
    rates[currency] = parseNumber(rate);
  }

  return rates;
}

const parseExchangeData = (dataRaw: unknown): ExchangeData => {
  const data = parseObject(dataRaw);

  return {
    base: parseString(data.base),
    timestamp: parseNumber(data.timestamp),
    rates: parseRates(data.rates),
  }
}

export const fetchExchangeRates = () =>
  fetch(`${OPEN_EXHANGE_RATES_ENDPOINT}?app_id=${OPEN_EXHANGE_RATES_APP_ID}&base=${OPEN_EXHANGE_RATES_BASE}`)
    .then(res => res.json())
    .then(dataJSON => parseExchangeData(dataJSON))
