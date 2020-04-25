import { CartState, CartActionTypes, CartItem } from '../../types';
import { ADD_TO_CART } from '../actions';

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

const reducer = (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const {
        product: { price, title, id },
      } = action;

      const existingItem = state.items[id];

      let newItem: CartItem;

      if (existingItem) {
        // already have the item in the cart
        newItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          sum: existingItem.sum + price,
        };
      } else {
        newItem = {
          quantity: 1,
          productPrice: price,
          productTitle: title,
          sum: price,
        };
      }

      return {
        ...state,
        items: { ...state.items, [id]: newItem },
        totalAmount: state.totalAmount + price,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
