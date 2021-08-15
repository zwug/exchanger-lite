import React, { useCallback, useReducer } from 'react';
import { ExchangeFormState} from './interfaces';
import { ExchangeData } from '../../../../interfaces/ExchangeData';
import AmountControl from './AmountControl/AmountControl';

import {
  CHANGE_AMOUNT_FROM,
  CHANGE_AMOUNT_TO,
  CHANGE_CURRENCY_FROM,
  CHANGE_CURRENCY_TO,
  reducer,
} from './store';

const initialData: ExchangeFormState = {
  from: {
    currency: 'RUB',
    amount: 0
  },
  to: {
    currency: 'EUR',
    amount: 0
  },
}

export interface Props {
  exchangeData: ExchangeData,
}

const ExchangeForm: React.FC<Props> = ({ exchangeData }) => {
  const [inputsData, dispatch] = useReducer(reducer, initialData);

  const onFromAmountChange = useCallback((amount: number) => {
    dispatch({
      type: CHANGE_AMOUNT_FROM,
      payload: {
        amount,
        rate: exchangeData.rates[inputsData.to.currency] / exchangeData.rates[inputsData.from.currency],
      }
    });
  }, [inputsData, exchangeData]);

  const onFromCurrencyChange = useCallback((currency: string) => {    
    dispatch({
      type: CHANGE_CURRENCY_FROM,
      payload: {
        currency,
        rate: exchangeData.rates[inputsData.to.currency] / exchangeData.rates[currency]
      }
    });
  }, [inputsData.to.currency, exchangeData]);

  const onToAmountChange = useCallback((amount: number) => {
    dispatch({
      type: CHANGE_AMOUNT_TO,
      payload: {
        amount,
        rate: exchangeData.rates[inputsData.from.currency] / exchangeData.rates[inputsData.to.currency],
      }
    });
  }, [inputsData, exchangeData]);

  const onToCurrencyChange = useCallback((currency: string) => {            
    dispatch({
      type: CHANGE_CURRENCY_TO,
      payload: {
        currency,
        rate: exchangeData.rates[inputsData.from.currency] / exchangeData.rates[currency]
      }
    });
  }, [exchangeData, inputsData.from.currency]);

  return (
    <div data-testid='form'>
      <AmountControl
        amount={inputsData.from.amount}
        currency={inputsData.from.currency}
        rates={exchangeData.rates}
        onAmountChange={onFromAmountChange}
        onCurrencyChange={onFromCurrencyChange}
      />
      <br/>
      <AmountControl
        amount={inputsData.to.amount}
        currency={inputsData.to.currency}
        rates={exchangeData.rates}
        onAmountChange={onToAmountChange}
        onCurrencyChange={onToCurrencyChange}
      />
  </div>
  );
}

export default ExchangeForm;
