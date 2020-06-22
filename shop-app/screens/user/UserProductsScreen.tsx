import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import { RootState } from '../../store/reducers';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import { COLORS } from '../../constants';
import { deleteProduct } from '../../store/actions';
import { AppThunkDispatch } from '../../types';

const UserProductsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const products = useSelector(
    (state: RootState) => state.products.userProducts,
  );

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleEditProduct = (id: string) => {
    navigation.navigate('EditProduct', { id });
  };

  const handleDelete = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);

          try {
            await dispatch(deleteProduct(id));
          } catch (error) {
            Alert.alert('An error ocurred!', error.message, [{ text: 'Okay' }]);
          }

          setIsLoading(false);
        },
      },
    ]);
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
          onSelect={() => {
            handleEditProduct(item.id);
          }}>
          <Button
            color={COLORS.primary}
            title="Edit"
            onPress={() => {
              handleEditProduct(item.id);
            }}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Button
              color={COLORS.primary}
              title="Delete"
              onPress={() => handleDelete(item.id)}
            />
          )}
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Your products',
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
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    );
  },
});

export default UserProductsScreen;
