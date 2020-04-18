import React from 'react';
import { StyleSheet, FlatList, View, ListRenderItemInfo } from 'react-native';
import MealItem from './MealItem';
import Meal from '../models/meal';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
  listData: Meal[];
  navigation: NavigationStackProp<unknown>;
};

const MealList: React.FC<Props> = ({ listData, navigation }) => {
  const renderMealItem = ({
    item: { id, imageUrl, title, duration, complexity, affordability },
  }: ListRenderItemInfo<Meal>) => {
    return (
      <MealItem
        image={imageUrl}
        title={title}
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        onSelectMeal={() => {
          navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: id,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
});