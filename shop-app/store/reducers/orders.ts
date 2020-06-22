import { OrdersState, ActionTypes } from '../../types';
import { ADD_ORDER, SET_ORDERS } from '../actions';

const initialState: OrdersState = {
  orders: [],
};

const reducer = (state = initialState, action: ActionTypes): OrdersState => {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case ADD_ORDER: {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
