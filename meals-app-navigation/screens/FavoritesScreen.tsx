import React from 'react';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  NavigationDrawerScreenProps,
  NavigationDrawerProp,
} from 'react-navigation-drawer';
import { NavigationScreenConfigProps } from 'react-navigation';

import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import HeaderButtonComponent from '../components/HeaderButton';

const FavoritesScreen = ({
  navigation,
}: NavigationStackScreenProps & NavigationDrawerScreenProps) => {
  const favMeals = MEALS.filter((meal) => ['m1', 'm2'].includes(meal.id));

  return <MealList listData={favMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = ({
  navigation,
}: NavigationScreenConfigProps<
  NavigationStackProp & NavigationDrawerProp
>): NavigationStackOptions => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default FavoritesScreen;
