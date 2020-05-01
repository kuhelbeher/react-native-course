import { ProductActionTypes } from '../../types';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = (id: string): ProductActionTypes => ({
  type: DELETE_PRODUCT,
  id,
});
