import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useDispatch } from 'react-redux';
import HeaderButtonComponent from '../components/HeaderButton';
import { primaryColor } from '../config';
import { FilterSettings } from '../store/types';
import { setFilters } from '../store/actions/meals';

type FilterSwitchProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const FilterSwitch: React.FC<FilterSwitchProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{
          true: primaryColor,
          false: '',
        }}
        thumbColor={Platform.OS === 'android' ? primaryColor : ''}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
};

const FiltersScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const filters: FilterSettings = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(filters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch label="Vegan" value={isVegan} onChange={setIsVegan} />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={setIsVegetarian}
      />
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
    headerRight() {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={navigation.getParam('save')}
          />
        </HeaderButtons>
      );
    },
  };
};

export default FiltersScreen;

const styles = StyleSheet.create({
  filterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    width: '80%',
  },
  screen: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});
