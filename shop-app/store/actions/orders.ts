import { OrderActionTypes, CartItem } from '../../types';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (
  items: CartItem[],
  amount: number,
): OrderActionTypes => ({
  type: ADD_ORDER,
  orderData: {
    items,
    amount,
  },
});
