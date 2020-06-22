import { OrderActionTypes, CartItem, AppThunk, Order } from '../../types';
import { apiUrl } from '../../config';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrderSuccess = (payload: Order): OrderActionTypes => ({
  type: ADD_ORDER,
  payload,
});

export const addOrder = (
  items: CartItem[],
  totalAmount: number,
): AppThunk<Promise<void>> => async (dispatch) => {
  const date = new Date();

  const res = await fetch(`${apiUrl}/orders/u1.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items,
      totalAmount,
      date: date.toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const { name }: { name: string } = await res.json();

  dispatch(addOrderSuccess({ id: name, items, totalAmount, date }));
};
