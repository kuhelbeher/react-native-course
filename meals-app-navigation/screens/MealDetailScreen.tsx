import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { MEALS } from '../data/dummy-data';

const MealDetailScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');

  const { title } = MEALS.find((meal) => meal.id === mealId) || {};
  return (
    <View style={styles.screen}>
      <Text>{title}</Text>
      <Button
        title="Go back to Categories"
        onPress={() => {
          navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailScreen.navigationOptions = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');

  const { title } = MEALS.find((meal) => meal.id === mealId) || {};

  return {
    headerTitle: title,
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
