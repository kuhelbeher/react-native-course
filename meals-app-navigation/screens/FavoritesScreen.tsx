import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import HeaderButtonComponent from '../components/HeaderButton';
import { RootState } from '../store/reducers';
import DefaultText from '../components/DefaultText';

const FavoritesScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const favoriteMeals = useSelector(
    (state: RootState) => state.meals.favoriteMeals,
  );

  if (!favoriteMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No Favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favoriteMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              // ignoring this error because navigation als has methods
              // from NavigationDrawerProp
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
