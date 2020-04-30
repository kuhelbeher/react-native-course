import { ADD_ORDER } from '../store/actions';
import { CartItem } from './cart';

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: Date;
};

type AddOrderAction = {
  type: typeof ADD_ORDER;
  orderData: {
    items: CartItem[];
    amount: number;
  };
};

export type OrdersState = {
  orders: Order[];
};

export type OrderActionTypes = AddOrderAction;
