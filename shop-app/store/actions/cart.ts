import { CartActionTypes, Product } from '../../types';

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product: Product): CartActionTypes => ({
  type: ADD_TO_CART,
  product,
});
