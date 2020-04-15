import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FiltersScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>The FiltersScreen</Text>
    </View>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
