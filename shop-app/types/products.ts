import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../store/actions';

export type Product = {
  id: string;
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

export type CreateProductPayload = Omit<Product, 'id' | 'ownerId'>;

export type UpdateProductPayload = Omit<Product, 'ownerId' | 'price'>;

type DeleteProductAction = {
  type: typeof DELETE_PRODUCT;
  id: string;
};

type CreateProductAction = {
  type: typeof CREATE_PRODUCT;
  payload: CreateProductPayload;
};

type UpdateProductAction = {
  type: typeof UPDATE_PRODUCT;
  payload: UpdateProductPayload;
};

export type ProductsState = {
  availableProducts: Product[];
  userProducts: Product[];
};

export type ProductActionTypes =
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction;
