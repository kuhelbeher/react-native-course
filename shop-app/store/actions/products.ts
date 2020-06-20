import {
  ProductActionTypes,
  CreateProductPayload,
  UpdateProductPayload,
  AppThunk,
  Product,
  ProductResponseType,
} from '../../types';
import { apiUrl } from '../../config';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const setProducts = (payload: Product[]): ProductActionTypes => ({
  type: SET_PRODUCTS,
  payload,
});

export const fetchProducts = (): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  const res = await fetch(`${apiUrl}/products.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  const data: { [id: string]: ProductResponseType } = await res.json();

  const products: Product[] = Object.entries(data).map(([id, product]) => ({
    id,
    ...product,
  }));

  dispatch(setProducts(products));
};

export const deleteProduct = (payload: string): ProductActionTypes => ({
  type: DELETE_PRODUCT,
  payload,
});

export const createProductSuccess = (
  payload: CreateProductPayload,
): ProductActionTypes => ({
  type: CREATE_PRODUCT,
  payload,
});

export const createProduct = (
  payload: CreateProductPayload,
): AppThunk => async (dispatch) => {
  try {
    const res = await fetch(`${apiUrl}/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: { name: string } = await res.json();

    dispatch(
      createProductSuccess({
        id: data.name,
        ...payload,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (
  payload: UpdateProductPayload,
): ProductActionTypes => ({
  type: UPDATE_PRODUCT,
  payload,
});
