import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { RootState } from '../store/reducers';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const availableMeals = useSelector(
    (state: RootState) => state.meals.filteredMeals,
  );

  const displayedMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(categoryId),
  );

  if (!displayedMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals here! Check your filters!</DefaultText>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
