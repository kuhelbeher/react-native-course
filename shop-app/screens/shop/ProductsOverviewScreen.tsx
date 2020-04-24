import React from 'react';
import { FlatList, Text } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducers';

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts,
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
