import { OrdersState, ActionTypes } from '../../types';
import { ADD_ORDER } from '../actions';

const initialState: OrdersState = {
  orders: [],
};

const reducer = (state = initialState, action: ActionTypes): OrdersState => {
  switch (action.type) {
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
