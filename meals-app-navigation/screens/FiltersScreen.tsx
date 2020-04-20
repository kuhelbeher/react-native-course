import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtonComponent from '../components/HeaderButton';

const FiltersScreen: NavigationStackScreenComponent = () => {
  return (
    <View style={styles.screen}>
      <Text>The FiltersScreen</Text>
    </View>
  );
};

FiltersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Filter Meals',
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

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
