import { ADD_TO_CART, REMOVE_FROM_CART } from '../store/actions';
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

type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  id: string;
};

export type CartItems = {
  [key: string]: CartItem;
};

export type CartState = {
  items: CartItems;
  totalAmount: number;
};

export type CartActionTypes = AddToCartAction | RemoveFromCartAction;
