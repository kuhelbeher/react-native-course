import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButtonComponent from '../components/HeaderButton';
import { MEALS } from '../data/dummy-data';
import DefaultText from '../components/DefaultText';
import { grey } from '../config';

const ListItem: React.FC = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

const MealDetailScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  if (!selectedMeal) {
    return null;
  }

  const {
    duration,
    imageUrl,
    complexity,
    affordability,
    ingredients,
    steps,
  } = selectedMeal;

  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{duration}</DefaultText>
        <DefaultText>{complexity?.toUpperCase()}</DefaultText>
        <DefaultText>{affordability?.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
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
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  image: {
    height: 200,
    width: '100%',
  },
  listItem: {
    borderColor: grey,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
});
