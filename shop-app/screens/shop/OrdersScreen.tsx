import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Text,
  Platform,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { RootState } from '../../store/reducers';
import HeaderButtonComponent from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { AppThunkDispatch } from '../../types';
import { fetchOrders } from '../../store/actions';
import { COLORS } from '../../constants';

const OrdersScreen: NavigationStackScreenComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const orders = useSelector((state: RootState) => state.orders.orders);

  const dispatch = useDispatch<AppThunkDispatch>();

  const handleFetchOrders = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      await dispatch(fetchOrders());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    handleFetchOrders().then(() => {
      setIsLoading(false);
    });
  }, [handleFetchOrders]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Oops! Something went wrong, try again later!</Text>
        <Button
          title="Try again"
          onPress={handleFetchOrders}
          color={COLORS.primary}
        />
      </View>
    );
  }

  if (!isLoading && !orders.length) {
    return (
      <View style={styles.centered}>
        <Text>No orders found. Maybe start adding some!</Text>
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
      refreshing={isRefreshing}
      onRefresh={handleFetchOrders}
      data={orders}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.date}
          items={item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
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
    headerTitle: 'Your Orders',
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
