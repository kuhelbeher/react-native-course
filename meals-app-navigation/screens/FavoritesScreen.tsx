import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FavoritesScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>The FavoritesScreen</Text>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
