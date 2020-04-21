import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButtonComponent from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { grey } from '../config';
import { RootState } from '../store/reducers';
import { toggleFavorite } from '../store/actions/meals';

const ListItem: React.FC = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

const MealDetailScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');
  const availableMeals = useSelector(
    (state: RootState) => state.meals.filteredMeals,
  );
  const dispatch = useDispatch();

  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({ toggleFavorite: handleToggleFavorite });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleToggleFavorite]);

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

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
  const mealTitle = navigation.getParam('mealTitle');
  const isFavorite = navigation.getParam('isFavorite');

  const handleToggleFavorite = navigation.getParam('toggleFavorite');

  return {
    headerTitle: mealTitle,
    headerRight() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Favorite"
            iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
            onPress={handleToggleFavorite}
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
