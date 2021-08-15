import React from 'react';
import { Spin, Space, Alert } from 'antd';

import { ExchangeState } from "../../../interfaces/ExchangeData";
import ExchangeForm from './ExchangeForm/ExchangeForm';

type Props = ExchangeState

const ExchangeModule: React.FC<Props> = ({
  data,
  isLoading
}) => {
  if (!data) {
    if (isLoading) {
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
    <ExchangeForm exchangeData={data} />
  )
}

export default ExchangeModule;
