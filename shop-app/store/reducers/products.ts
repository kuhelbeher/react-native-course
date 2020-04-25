import { ProductsState } from '../../types';
import PRODUCTS from '../../data/data';

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

const reducer = (state = initialState, action): ProductsState => {
  return state;
};

export default reducer;
