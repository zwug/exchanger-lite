import React, { useCallback, useState, useEffect } from 'react';
import { Input, Select } from 'antd';

// import styles from './AmountControl.module.css';

const { Option } = Select;

export interface Props {
  amount: number,
  currency: string,
  onAmountChange: (amount: number) => void,
  onCurrencyChange: (currency: string) => void,
  rates: Record<string, number>
}

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', { 
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(amount);
}

const AmountControl: React.FC<Props> = ({ 
  amount: amountProp,
  currency,
  onAmountChange,
  onCurrencyChange,
  rates,
}) => {
  const [amount, setAmount] = useState(formatAmount(amountProp));

  useEffect(() => {
    if (amount === '' && amountProp === 0) {
      return;
    }
    setAmount(formatAmount(amountProp));
  }, [amount, amountProp]);

  const onAmountInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    onAmountChange(Number(evt.target.value));
    setAmount(evt.target.value);
  }, [onAmountChange]);

  const SelectAddon = (
    <Select
      size="large"
      value={currency}
      onChange={onCurrencyChange}
    >
      {Object.keys(rates).map(currencyCode => (
        <Option key={currencyCode} value={currencyCode}>
          {currencyCode}
        </Option>
      ))}
    </Select>
  );

  return (
    <div>
      <Input 
        addonAfter={SelectAddon}
        size="large"
        type="number"
        value={amount}
        onChange={onAmountInputChange}
      />
    </div>
  );
}

export default AmountControl;
