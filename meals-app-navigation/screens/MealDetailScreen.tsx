import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

const MealDetailScreen: React.FC<NavigationStackScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.screen}>
      <Text>The MealDetailScreen</Text>
      <Button
        title="Go back to Categories"
        onPress={() => {
          navigation.popToTop();
        }}
      />
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
