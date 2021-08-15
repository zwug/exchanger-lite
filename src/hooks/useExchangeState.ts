import { useCallback, useEffect, useReducer } from "react"
import { ExchangeState, ExchangeData } from "../interfaces/ExchangeData";
import { fetchExchangeRates } from '../api/exchangeRates';

const RATES_REFRESH_INTERVAL = 10000; // 10 seconds

const initialState: ExchangeState = {
  data: null,
  isLoading: false,
};

export const EXCHANGE_RATES_LOAD_START = 'EXCHANGE_RATES_LOAD_START';
export const EXCHANGE_RATES_LOAD_SUCCESS = 'EXCHANGE_RATES_LOAD_SUCCESS';
export const EXCHANGE_RATES_LOAD_ERROR = 'EXCHANGE_RATES_LOAD_ERROR';

interface ExchangeRatesLoadStartAction {
  type: typeof EXCHANGE_RATES_LOAD_START,
}

interface ExchangeRatesLoadSuccessAction {
  type: typeof EXCHANGE_RATES_LOAD_SUCCESS,
  payload: {
    data: ExchangeData,
  }
}

interface ExchangeRatesLoadErrorAction {
  type: typeof EXCHANGE_RATES_LOAD_ERROR,
}

type Action = ExchangeRatesLoadErrorAction | ExchangeRatesLoadSuccessAction | ExchangeRatesLoadStartAction;

export const reducer = (state: ExchangeState = initialState, action: Action): ExchangeState => {
  switch (action.type) {
    case EXCHANGE_RATES_LOAD_START:
      return {
        ...state,
        isLoading: true,
      };

    case EXCHANGE_RATES_LOAD_SUCCESS: {
      const { data } = action.payload;
      
      return {
        ...state,
        isLoading: false,
        error: null,
        data,
      };
    }

    case EXCHANGE_RATES_LOAD_ERROR:      
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export const useExchangeState = () => {
  const [exchangeState, dispatch] = useReducer(reducer, initialState);

  const updateExchangeRates = useCallback(() => {
    dispatch({
      type: EXCHANGE_RATES_LOAD_START,
    });

    fetchExchangeRates()
      .then((data) => {
        dispatch({
          type: EXCHANGE_RATES_LOAD_SUCCESS,
          payload: {
            data,
          }
        });
      })
      .catch(() => {
        dispatch({
          type: EXCHANGE_RATES_LOAD_ERROR,
        });
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

  return exchangeState;
}
