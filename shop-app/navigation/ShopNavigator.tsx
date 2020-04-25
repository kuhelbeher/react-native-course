import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { COLORS, FONTS } from '../constants';
import ProductDetailedScreen from '../screens/shop/ProductDetailedScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailedScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
      },
      headerTitleStyle: {
        fontFamily: FONTS.primaryBold,
      },
      headerBackTitleStyle: {
        fontFamily: FONTS.primary,
      },
      headerTintColor:
        Platform.OS === 'android' ? COLORS.white : COLORS.primary,
    },
  },
);

export default createAppContainer(ProductsNavigator);
