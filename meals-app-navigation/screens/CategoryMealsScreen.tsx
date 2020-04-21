import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { RootState } from '../store/reducers';

const CategoryMealScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const availableMeals = useSelector(
    (state: RootState) => state.meals.filteredMeals,
  );

  const displayedMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(categoryId),
  );

  return <MealList listData={displayedMeals} navigation={navigation} />;
};

CategoryMealScreen.navigationOptions = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return {
    headerTitle: selectedCategory?.title,
  };
};

export default CategoryMealScreen;
