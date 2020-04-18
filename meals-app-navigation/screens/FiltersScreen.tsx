import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackProp,
  NavigationStackOptions,
} from 'react-navigation-stack';
import {
  NavigationDrawerScreenProps,
  NavigationDrawerProp,
} from 'react-navigation-drawer';
import { NavigationScreenConfigProps } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonComponent from '../components/HeaderButton';

const FiltersScreen = ({
  navigation,
}: NavigationStackScreenProps & NavigationDrawerScreenProps) => {
  return (
    <View style={styles.screen}>
      <Text>The FiltersScreen</Text>
    </View>
  );
};

FiltersScreen.navigationOptions = ({
  navigation,
}: NavigationScreenConfigProps<
  NavigationStackProp & NavigationDrawerProp
>): NavigationStackOptions => {
  return {
    headerTitle: 'Filter Meals',
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

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
