import {
  ProductActionTypes,
  CreateProductPayload,
  UpdateProductPayload,
  AppThunk,
} from '../../types';
import { apiUrl } from '../../config';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (id: string): ProductActionTypes => ({
  type: DELETE_PRODUCT,
  id,
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

    const data = await res.json();

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
