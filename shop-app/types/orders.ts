import { ADD_ORDER, SET_ORDERS } from '../store/actions';
import { CartItem } from './cart';

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: Date;
};

export type OrderResponseType = Omit<Order, 'id'>;

type AddOrderAction = {
  type: typeof ADD_ORDER;
  payload: Order;
};

type SetOrdersType = {
  type: typeof SET_ORDERS;
  payload: Order[];
};

export type OrdersState = {
  orders: Order[];
};

export type OrderActionTypes = AddOrderAction | SetOrdersType;
