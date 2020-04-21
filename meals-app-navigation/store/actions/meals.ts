import {
  TOGGLE_FAVORITE,
  MealsActionTypes,
  FilterSettings,
  SET_FILTERS,
} from '../types';

export const toggleFavorite = (mealId: string): MealsActionTypes => ({
  type: TOGGLE_FAVORITE,
  mealId,
});

export const setFilters = (
  filterSettings: FilterSettings,
): MealsActionTypes => ({
  type: SET_FILTERS,
  filterSettings,
});
