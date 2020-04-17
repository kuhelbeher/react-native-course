import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import Meal from '../models/meal';
import MealItem from '../components/MealItem';

const CategoryMealScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const renderMealItem = ({
    item: { id, imageUrl, title, duration, complexity, affordability },
  }: ListRenderItemInfo<Meal>) => {
    return (
      <MealItem
        image={imageUrl}
        title={title}
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        onSelectMeal={() => {
          navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: id,
            },
          });
        }}
      />
    );
  };

  const categoryId = navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId),
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
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
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
});
