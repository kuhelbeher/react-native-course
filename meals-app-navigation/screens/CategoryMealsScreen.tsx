import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter((meal) =>
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
