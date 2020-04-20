import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import HeaderButtonComponent from '../components/HeaderButton';

const FavoritesScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const favMeals = MEALS.filter((meal) => ['m1', 'm2'].includes(meal.id));

  return <MealList listData={favMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              // ignoring this error because navigation als has methods
              // from NavigationDrawerProp
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default FavoritesScreen;
