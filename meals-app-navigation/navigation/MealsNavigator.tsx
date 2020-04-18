import React from 'react';
import {
  createAppContainer,
  NavigationRouteConfigMap,
  NavigationRoute,
  NavigationParams,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
  createBottomTabNavigator,
  NavigationBottomTabOptions,
} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  createMaterialBottomTabNavigator,
  NavigationMaterialBottomTabOptions,
  NavigationTabProp,
} from 'react-navigation-material-bottom-tabs';
// eslint-disable-next-line import/no-unresolved
import { StackNavigationOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Platform } from 'react-native';
import { primaryColor, white, accentColor } from '../config';
import FiltersScreen from '../screens/FiltersScreen';

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? primaryColor : white,
  },
  headerTintColor: Platform.OS === 'android' ? white : primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions,
  },
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions,
  },
);

const tabScreenConfig: NavigationRouteConfigMap<
  NavigationMaterialBottomTabOptions | NavigationBottomTabOptions,
  NavigationTabProp<NavigationRoute<NavigationParams>, unknown>,
  unknown
> = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon(tabInfo) {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: primaryColor,
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon(tabInfo) {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: accentColor,
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: white,
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: accentColor,
        },
      });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
  FavMeals: MealsFavTabNavigator,
  Filters: FiltersNavigator,
});

export default createAppContainer(MainNavigator);
