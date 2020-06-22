import {
  OrderActionTypes,
  CartItem,
  AppThunk,
  Order,
  OrderResponseType,
} from '../../types';
import { apiUrl } from '../../config';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

const setOrders = (payload: Order[]): OrderActionTypes => ({
  type: SET_ORDERS,
  payload,
});

export const fetchOrders = (): AppThunk<Promise<void>> => async (dispatch) => {
  const res = await fetch(`${apiUrl}/orders/u1.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const data: { [id: string]: OrderResponseType } = await res.json();

  const orders: Order[] = Object.entries(data).map(([id, order]) => ({
    ...order,
    id,
    date: new Date(order.date),
  }));

  dispatch(setOrders(orders));
};

const addOrderSuccess = (payload: Order): OrderActionTypes => ({
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
