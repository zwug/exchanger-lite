import React, { useCallback, useReducer } from 'react';
import { Input, Select } from 'antd';
import logoUrl from './logo.png';
import {
  CHANGE_AMOUNT_FROM,
  CHANGE_AMOUNT_TO,
  CHANGE_CURRENCY_FROM,
  CHANGE_CURRENCY_TO,
  reducer,
} from './store';

import { useExchangeData } from '../hooks/useCurrencyRates'
import { ExchangeState} from './interfaces';

import styles from './Root.module.css';

const { Option } = Select;

// export interface Props {
  
// }

const initialData: ExchangeState = {
  from: {
    currency: 'USD',
    amount: 0
  },
  to: {
    currency: 'EUR',
    amount: 0
  },
}

const Root: React.FC = () => {
  const exchangeData = useExchangeData();
  const [inputsData, dispatch] = useReducer(reducer, initialData);

  const onFromAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    dispatch({
      type: CHANGE_AMOUNT_FROM,
      payload: {
        amount: Number(evt.target.value),
        rate: exchangeData?.rates[inputsData.to.currency] || 0
      }
    });
  }, [inputsData, exchangeData]);

  const onFromCurrencyChange = useCallback((value: string) => {
    console.log(value, exchangeData?.rates[inputsData.to.currency], exchangeData?.rates[value], exchangeData?.rates[inputsData.to.currency] || 0 / (exchangeData?.rates[value] || 1));
    
    dispatch({
      type: CHANGE_CURRENCY_FROM,
      payload: {
        currency: value,
        rate: (exchangeData?.rates[inputsData.to.currency] || 0) / (exchangeData?.rates[value] || 1)
      }
    });
  }, [inputsData, exchangeData]);

  if (!exchangeData) {
    return <h1>no exchange data</h1>
  }

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logoUrl} alt="Exchanger Lite" />
      <div className={styles.main}>
        <Input 
          size="large"
          type="number"
          value={inputsData.from.amount}
          onChange={onFromAmountChange}
        />
        <Select
          value={inputsData.from.currency}
          onChange={onFromCurrencyChange}
        >
          {Object.keys(exchangeData.rates).map(currencyCode => (
            <Option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </Option>
          ))}
        </Select>
        <Input 
          size="large"
          value={inputsData.to.amount}
        />
        <Select
          value={inputsData.to.currency}
        >
          {Object.keys(exchangeData.rates).map(currencyCode => (
            <Option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default Root;
