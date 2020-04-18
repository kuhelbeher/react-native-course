import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {
  NavigationDrawerProp,
  NavigationDrawerScreenProps,
} from 'react-navigation-drawer';
import { NavigationScreenConfigProps } from 'react-navigation';
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
  NavigationStackProp,
} from 'react-navigation-stack';

import Category from '../models/category';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButtonComponent from '../components/HeaderButton';

const CategoriesScreen = ({
  navigation,
}: NavigationStackScreenProps & NavigationDrawerScreenProps) => {
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

CategoriesScreen.navigationOptions = ({
  navigation,
}: NavigationScreenConfigProps<
  NavigationStackProp & NavigationDrawerProp
>): NavigationStackOptions => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default CategoriesScreen;
