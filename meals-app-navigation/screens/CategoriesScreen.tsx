import React from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import Category from '../models/category';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const renderGridItem = (itemData: ListRenderItemInfo<Category>) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
