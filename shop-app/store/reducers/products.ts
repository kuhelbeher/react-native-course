import { ProductsState, ActionTypes, Product } from '../../types';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from '../actions';

const initialState: ProductsState = {
  availableProducts: [],
  userProducts: [],
};

const reducer = (state = initialState, action: ActionTypes): ProductsState => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.payload,
        userProducts: action.payload.filter(
          (product) => product.ownerId === 'u1',
        ),
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload,
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.payload,
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
