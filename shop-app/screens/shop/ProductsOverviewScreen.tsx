import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store/reducers';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart, fetchProducts } from '../../store/actions';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import { COLORS } from '../../constants';
import { Product, AppThunkDispatch } from '../../types';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector(
    (state: RootState) => state.products.availableProducts,
  );

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleFetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    handleFetchProducts();
  }, [handleFetchProducts]);

  const handleSelectItem = (item: Product) => {
    navigation.navigate('ProductDetail', {
      productId: item.id,
      productTitle: item.title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Oops! Something went wrong, try again later!</Text>
        <Button
          title="Try again"
          onPress={handleFetchProducts}
          color={COLORS.primary}
        />
      </View>
    );
  }

  if (!isLoading && !products.length) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
