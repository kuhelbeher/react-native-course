import { ProductsState, ActionTypes } from '../../types';
import PRODUCTS from '../../data/data';
import { DELETE_PRODUCT } from '../actions';

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

const reducer = (state = initialState, action: ActionTypes): ProductsState => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.id,
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.id,
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
