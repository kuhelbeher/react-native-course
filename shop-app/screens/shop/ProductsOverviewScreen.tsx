import React, { useEffect } from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store/reducers';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart, fetchProducts } from '../../store/actions';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import { COLORS } from '../../constants';
import { Product } from '../../types';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSelectItem = (item: Product) => {
    navigation.navigate('ProductDetail', {
      productId: item.id,
      productTitle: item.title,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          uri={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => handleSelectItem(item)}>
          <Button
            color={COLORS.primary}
            title="View Details"
            onPress={() => handleSelectItem(item)}
          />
          <Button
            color={COLORS.primary}
            title="To Cart"
            onPress={() => {
              dispatch(addToCart(item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Products',
    headerLeft() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              // ignoring this error because navigation also has methods
              // from NavigationDrawerProp
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default ProductsOverviewScreen;
