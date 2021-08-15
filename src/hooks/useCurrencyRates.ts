import { useCallback, useEffect, useState } from "react"
import { ExchangeData } from "../interfaces/ExchangeData";
import { fetchExchangeRates } from '../api/exchangeRates';

const RATES_REFRESH_INTERVAL = 10000; // 10 seconds

export const useExchangeData = () => {
  const [exchangeData, setExchangeData] = useState<ExchangeData | null>(null);

  const updateExchangeRates = useCallback(() => {
    fetchExchangeRates()
      .then((data) => {
        setExchangeData(data);
      })
  }, []);

  useEffect(() => {
    updateExchangeRates();
  }, [updateExchangeRates]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateExchangeRates();
    }, RATES_REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    }
  }, [updateExchangeRates]);

  return exchangeData;
}

