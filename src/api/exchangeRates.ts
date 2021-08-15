import { parseObject, parseNumber, parseString } from "../utils/typeChecks";
import { Rates, ExchangeData } from "../interfaces/ExchangeData";

const OPEN_EXHANGE_RATES_APP_ID = 'fbdbdfe6ab5b428da5b022ea07a796c3';
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
