import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CategoriesScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>The CategoriesScreen</Text>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
