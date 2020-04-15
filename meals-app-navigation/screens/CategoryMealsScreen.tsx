import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CategoryMealScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>The CategoryMealScreen</Text>
    </View>
  );
};

export default CategoryMealScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
