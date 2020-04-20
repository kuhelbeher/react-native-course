import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
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
import { primaryColor, white, accentColor } from '../config';
import FiltersScreen from '../screens/FiltersScreen';

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? primaryColor : white,
  },
  headerTintColor: Platform.OS === 'android' ? white : primaryColor,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
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

const styles = StyleSheet.create({
  tobBarLabel: { fontFamily: 'open-sans-bold' },
});

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
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={styles.tobBarLabel}>Meals</Text>
        ) : (
          'Meals'
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon(tabInfo) {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: accentColor,
      tabBarLabel:
        Platform.OS === 'android' ? (
          <Text style={styles.tobBarLabel}>Favorites</Text>
        ) : (
          'Favorites'
        ),
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
          labelStyle: {
            fontFamily: 'open-sans-bold',
          },
          activeTintColor: accentColor,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters',
    // },
    defaultNavigationOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    FavMeals: {
      screen: MealsFavTabNavigator,
      navigationOptions: { drawerLabel: 'Meals' },
    },
    Filters: {
      screen: FiltersNavigator,
      navigationOptions: {
        drawerLabel: 'Filters',
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: accentColor,
      labelStyle: {
        fontFamily: 'open-sans',
      },
    },
  },
);

export default createAppContainer(MainNavigator);
