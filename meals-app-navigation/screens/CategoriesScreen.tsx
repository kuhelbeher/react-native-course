import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import Category from '../models/category';
import { CATEGORIES } from '../data/dummy-data';
import { primaryColor, white } from '../config';

const CategoriesScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const renderGridItem = (itemData: ListRenderItemInfo<Category>) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}>
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    height: 150,
    margin: 15,
  },
});
