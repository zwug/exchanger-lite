import React, {useCallback} from 'react';
import logoUrl from './logo.png';
import { Spin, Space, Alert } from 'antd';

import { useExchangeState } from '../../hooks/useExchangeState'
import ExchangeForm from './ExchangeForm/ExchangeForm';

import styles from './Root.module.css';

const Root: React.FC = () => {
  const exchangeData = useExchangeState();

  const renderMain = useCallback(() => {
    if (!exchangeData.data) {
      if (exchangeData.isLoading) {
        return (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        )
      }
  
      return (
        <Alert message="Couldn't load the exchange rates" type="error" />
      )
    }

    return (
      <ExchangeForm exchangeData={exchangeData.data} />
    )
  }, [exchangeData]);

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logoUrl} alt="Exchanger Lite" />
      {renderMain()}
    </div>
  );
}

export default Root;
