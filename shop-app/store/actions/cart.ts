import { CartActionTypes, Product } from '../../types';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product: Product): CartActionTypes => ({
  type: ADD_TO_CART,
  product,
});

export const removeFromCart = (id: string): CartActionTypes => ({
  type: REMOVE_FROM_CART,
  id,
});
