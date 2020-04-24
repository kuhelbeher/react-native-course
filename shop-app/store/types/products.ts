import Product from '../../models/Product';

export type ProductsState = {
  availableProducts: Product[];
  userProducts: Product[];
};
