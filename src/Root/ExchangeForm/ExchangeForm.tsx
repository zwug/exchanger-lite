import React, { useCallback, useReducer } from 'react';
import { Input, Select } from 'antd';
import { ExchangeState} from './interfaces';
import { ExchangeData } from '../../interfaces/ExchangeData';

import {
  CHANGE_AMOUNT_FROM,
  CHANGE_AMOUNT_TO,
  CHANGE_CURRENCY_FROM,
  CHANGE_CURRENCY_TO,
  reducer,
} from '../store';

import styles from './ExchangeForm.module.css';

const { Option } = Select;

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


export interface Props {
  exchangeData: ExchangeData,
}

const ExchangeForm: React.FC<Props> = ({ exchangeData }) => {
  const [inputsData, dispatch] = useReducer(reducer, initialData);

  const onFromAmountChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    dispatch({
      type: CHANGE_AMOUNT_FROM,
      payload: {
        amount: Number(evt.target.value),
        rate: exchangeData.rates[inputsData.to.currency],
      }
    });
  }, [inputsData, exchangeData]);

  const onFromCurrencyChange = useCallback((value: string) => {    
    dispatch({
      type: CHANGE_CURRENCY_FROM,
      payload: {
        currency: value,
        rate: (exchangeData.rates[inputsData.to.currency]) / (exchangeData.rates[value])
      }
    });
  }, [inputsData, exchangeData]);

  return (
    <div className={styles.root}>
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
  );
}

export default ExchangeForm;
