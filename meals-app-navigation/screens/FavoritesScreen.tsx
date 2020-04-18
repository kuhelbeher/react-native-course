import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const FavoritesScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const favMeals = MEALS.filter((meal) => ['m1', 'm2'].includes(meal.id));

  return <MealList listData={favMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: 'Your Favorites',
};

export default FavoritesScreen;
