import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunkMiddleware)),
);

export default store;
