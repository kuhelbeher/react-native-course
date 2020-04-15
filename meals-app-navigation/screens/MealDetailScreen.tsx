import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MealDetailScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>The MealDetailScreen</Text>
    </View>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
