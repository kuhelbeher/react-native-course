import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButtonComponent from '../components/HeaderButton';
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
    headerRight() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Favorite"
            iconName="ios-star"
            onPress={() => {
              console.log('mark as favorite');
            }}
          />
        </HeaderButtons>
      );
    },
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
