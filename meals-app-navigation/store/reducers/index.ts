import { combineReducers } from 'redux';

import meals from './meals';

const rootReducer = combineReducers({
  meals,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
