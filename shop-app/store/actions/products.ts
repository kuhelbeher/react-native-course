import {
  ProductActionTypes,
  CreateProductPayload,
  UpdateProductPayload,
} from '../../types';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (id: string): ProductActionTypes => ({
  type: DELETE_PRODUCT,
  id,
});

export const createProduct = (
  payload: CreateProductPayload,
): ProductActionTypes => ({
  type: CREATE_PRODUCT,
  payload,
});

export const updateProduct = (
  payload: UpdateProductPayload,
): ProductActionTypes => ({
  type: UPDATE_PRODUCT,
  payload,
});
