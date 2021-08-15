import React from 'react';
import { render, screen } from '@testing-library/react';

import ExchangeModule from './ExchangeModule';
import { ExchangeData } from "../../../interfaces/ExchangeData";

const mockData: ExchangeData = {
  rates: {
    RUB: 73,
    USD: 1,
    EUR: 83
  },
  base: 'USD',
  timestamp: 100,
}

test('ExchangeModule renders correct elements depending on props', () => {
  const {rerender, container} = render(<ExchangeModule data={null} isLoading={false} />)
  expect(screen.getByText('Couldn\'t load the exchange rates')).toBeInTheDocument()
  expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
  expect(screen.queryByTestId('form')).toBeNull();


  rerender(<ExchangeModule data={null} isLoading={true} />)
  expect(screen.queryByText('Couldn\'t load the exchange rates')).toBeNull()
  expect(container.querySelectorAll('.ant-spin')).toHaveLength(1);
  expect(screen.queryByTestId('form')).toBeNull();

  rerender(<ExchangeModule data={mockData} isLoading={true} />)
  expect(screen.queryByText('Couldn\'t load the exchange rates')).toBeNull()
  expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
  expect(screen.queryByTestId('form')).toBeInTheDocument();

  rerender(<ExchangeModule data={mockData} isLoading={false} />)
  expect(screen.queryByText('Couldn\'t load the exchange rates')).toBeNull()
  expect(container.querySelectorAll('.ant-spin')).toHaveLength(0);
  expect(screen.queryByTestId('form')).toBeInTheDocument();
})