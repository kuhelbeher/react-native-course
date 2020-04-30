import { OrdersState, Order, ActionTypes } from '../../types';
import { ADD_ORDER } from '../actions';

const initialState: OrdersState = {
  orders: [],
};

const reducer = (state = initialState, action: ActionTypes): OrdersState => {
  switch (action.type) {
    case ADD_ORDER: {
      const order: Order = {
        id: Date.now().toString(),
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        date: new Date(),
      };

      return {
        ...state,
        orders: [...state.orders, order],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
