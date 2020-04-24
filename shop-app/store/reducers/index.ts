import { combineReducers, createStore } from 'redux';

import products from './products';

const rootReducer = combineReducers({
  products,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
