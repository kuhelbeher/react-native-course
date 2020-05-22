import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/reducers';
import { CartActionTypes } from './cart';
import { OrderActionTypes } from './orders';
import { ProductActionTypes } from './products';

export * from './products';
export * from './cart';
export * from './orders';

export type ActionTypes =
  | CartActionTypes
  | OrderActionTypes
  | ProductActionTypes;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionTypes
>;
