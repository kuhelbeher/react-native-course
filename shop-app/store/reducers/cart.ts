import { CartState, CartActionTypes, CartItem, CartItems } from '../../types';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions';

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
    case REMOVE_FROM_CART: {
      const item = state.items[action.id];

      let items: CartItems;

      if (item.quantity > 1) {
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
          sum: item.sum - item.productPrice,
        };

        items = { ...state.items, [action.id]: updatedItem };
      } else {
        items = { ...state.items };

        delete items[action.id];
      }

      const totalAmount = state.totalAmount - item.productPrice;

      return {
        ...state,
        items,
        totalAmount: totalAmount < 0 ? 0 : totalAmount,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
