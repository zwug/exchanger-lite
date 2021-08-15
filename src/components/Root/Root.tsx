import React from 'react';
import logoUrl from './logo.png';

import { useExchangeState } from '../../hooks/useExchangeState'
import ExchangeModule from './ExchangeModule/ExchangeModule';

import styles from './Root.module.css';

const Root: React.FC = () => {
  const exchangeData = useExchangeState();

  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logoUrl} alt="Exchanger Lite" />
      <ExchangeModule {...exchangeData} />
    </div>
  );
}

export default Root;
