import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { COLORS } from '../constants';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : '',
      },
      headerTintColor:
        Platform.OS === 'android' ? COLORS.white : COLORS.primary,
    },
  },
);

export default createAppContainer(ProductsNavigator);
