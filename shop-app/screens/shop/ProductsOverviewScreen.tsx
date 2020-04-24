import React from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducers';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts,
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          uri={item.imageUrl}
          title={item.title}
          price={item.price}
          onViewDetails={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
