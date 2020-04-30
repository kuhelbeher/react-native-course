import { combineReducers, createStore } from 'redux';
// eslint-disable-next-line import/no-unresolved
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import products from './products';
import cart from './cart';
import orders from './orders';

const rootReducer = combineReducers({
  products,
  cart,
  orders,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
