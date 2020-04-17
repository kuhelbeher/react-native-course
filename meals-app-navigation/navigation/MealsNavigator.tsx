import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Platform } from 'react-native';
import { primaryColor, white, accentColor } from '../config';

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? primaryColor : white,
      },
      headerTintColor: Platform.OS === 'android' ? white : primaryColor,
    },
  },
);

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        {
          Meals: {
            screen: MealsNavigator,
            navigationOptions: {
              tabBarIcon(tabInfo) {
                return (
                  <Ionicons
                    name="ios-restaurant"
                    size={25}
                    color={tabInfo.tintColor}
                  />
                );
              },
              tabBarColor: primaryColor,
            },
          },
          Favorites: {
            screen: FavoritesScreen,
            navigationOptions: {
              tabBarIcon(tabInfo) {
                return (
                  <Ionicons
                    name="ios-star"
                    size={25}
                    color={tabInfo.tintColor}
                  />
                );
              },
              tabBarColor: accentColor,
            },
          },
        },
        {
          activeColor: white,
          shifting: true,
        },
      )
    : createBottomTabNavigator(
        {
          Meals: {
            screen: MealsNavigator,
            navigationOptions: {
              tabBarIcon(tabInfo) {
                return (
                  <Ionicons
                    name="ios-restaurant"
                    size={25}
                    color={tabInfo.tintColor}
                  />
                );
              },
            },
          },
          Favorites: {
            screen: FavoritesScreen,
            navigationOptions: {
              tabBarIcon(tabInfo) {
                return (
                  <Ionicons
                    name="ios-star"
                    size={25}
                    color={tabInfo.tintColor}
                  />
                );
              },
            },
          },
        },
        {
          tabBarOptions: {
            activeTintColor: accentColor,
          },
        },
      );

export default createAppContainer(MealsFavTabNavigator);
