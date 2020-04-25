import React from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/reducers';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts,
  );

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          uri={item.imageUrl}
          title={item.title}
          price={item.price}
          onViewDetails={() => {
            navigation.navigate('ProductDetail', {
              productId: item.id,
              productTitle: item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(addToCart(item));
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;
