import { ExchangeState } from './interfaces';

const initialState: ExchangeState = {
  from: {
    currency: 'USD',
    amount: 0
  },
  to: {
    currency: 'EUR',
    amount: 0
  },
};

export const CHANGE_CURRENCY_FROM = 'CHANGE_CURRENCY_FROM';
export const CHANGE_CURRENCY_TO = 'CHANGE_CURRENCY_TO';
export const CHANGE_AMOUNT_FROM = 'CHANGE_AMOUNT_FROM';
export const CHANGE_AMOUNT_TO = 'CHANGE_AMOUNT_TO';

interface ChangeCurrencyFromAction {
  type: typeof CHANGE_CURRENCY_FROM,
  payload: {
    currency: string,
    rate: number,
  }
}

interface ChangeCurrencyToAction extends Omit<ChangeCurrencyFromAction, 'type'> {
  type: typeof CHANGE_CURRENCY_TO,
}

interface ChangeAmountFromAction {
  type: typeof CHANGE_AMOUNT_FROM,
  payload: {
    amount: number,
    rate: number,
  }
}

interface ChangeAmountToAction extends Omit<ChangeAmountFromAction, 'type'> {
  type: typeof CHANGE_AMOUNT_TO,
}

type Action = ChangeCurrencyFromAction | ChangeCurrencyToAction | ChangeAmountFromAction | ChangeAmountToAction;


export const reducer = (state: ExchangeState = initialState, action: Action): ExchangeState => {
  switch (action.type) {
    case CHANGE_CURRENCY_FROM: {
      const { currency, rate} = action.payload;
      console.log(currency, rate);
      

      return {
        from: {
          ...state.from,
          currency,
        },
        to: {
          ...state.to,
          amount: rate * state.from.amount,
        }
      };
    }

    case CHANGE_AMOUNT_FROM: {
      const { amount, rate} = action.payload;
      
      return {
        from: {
          ...state.from,
          amount,
        },
        to: {
          ...state.to,
          amount: rate * amount,
        }
      }
    }

    default:
      return state;
  }
}