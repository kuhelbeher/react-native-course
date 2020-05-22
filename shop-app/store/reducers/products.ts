import { ProductsState, ActionTypes, Product } from '../../types';
import PRODUCTS from '../../data/data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions';

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
    case CREATE_PRODUCT: {
      const newProduct: Product = {
        ownerId: 'u1',
        ...action.payload,
      };

      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    }
    case UPDATE_PRODUCT: {
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.payload.id,
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.payload.id,
      );

      const updatedProduct: Product = {
        ...state.userProducts[userProductIndex],
        ...action.payload,
      };

      const availableProducts = [...state.availableProducts];
      const userProducts = [...state.userProducts];

      availableProducts[availableProductIndex] = updatedProduct;
      userProducts[userProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts,
        userProducts,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
