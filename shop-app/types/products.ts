import { DELETE_PRODUCT } from '../store/actions';

export type Product = {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

type DeleteProductAction = {
  type: typeof DELETE_PRODUCT;
  id: string;
};

export type ProductsState = {
  availableProducts: Product[];
  userProducts: Product[];
};

export type ProductActionTypes = DeleteProductAction;
