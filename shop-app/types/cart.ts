import { ADD_TO_CART } from '../store/actions';
import { Product } from './products';

export type CartItem = {
  quantity: number;
  productPrice: number;
  productTitle: string;
  sum: number;
};

type AddToCartAction = {
  type: typeof ADD_TO_CART;
  product: Product;
};

export type CartState = {
  items: {
    [key: string]: CartItem;
  };
  totalAmount: number;
};

export type CartActionTypes = AddToCartAction;
