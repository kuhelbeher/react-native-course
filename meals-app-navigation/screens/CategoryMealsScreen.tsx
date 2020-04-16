import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return (
    <View style={styles.screen}>
      <Text>{selectedCategory?.title}</Text>
      <Button
        title="Go to Meals!"
        onPress={() => {
          navigation.navigate({ routeName: 'MealDetail' });
        }}
      />
      <Button
        title="Go to back!"
        onPress={() => {
          navigation.goBack();
        }}
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
  },
});
