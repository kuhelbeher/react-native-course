import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerIconProps,
} from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { COLORS, FONTS } from '../constants';
import ProductDetailedScreen from '../screens/shop/ProductDetailedScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavigationOptions: NavigationStackOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
  },
  headerTitleStyle: {
    fontFamily: FONTS.primaryBold,
  },
  headerBackTitleStyle: {
    fontFamily: FONTS.primary,
  },
  headerTintColor: Platform.OS === 'android' ? COLORS.white : COLORS.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailedScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: function DrawerIcon(
        drawerConfig: DrawerIconProps,
      ): React.ReactNode {
        return (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions,
  },
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: function DrawerIcon(
        drawerConfig: DrawerIconProps,
      ): React.ReactNode {
        return (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions,
  },
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: function DrawerIcon(
        drawerConfig: DrawerIconProps,
      ): React.ReactNode {
        return (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        );
      },
    },
    defaultNavigationOptions,
  },
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: COLORS.primary,
    },
  },
);

export default createAppContainer(ShopNavigator);
