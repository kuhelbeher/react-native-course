import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { NavigationStackScreenComponent } from 'react-navigation-stack';

import Category from '../models/category';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButtonComponent from '../components/HeaderButton';

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

CategoriesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Meal Categories',
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

export default CategoriesScreen;
