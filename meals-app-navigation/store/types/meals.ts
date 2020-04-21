import Meal from '../../models/meal';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export type FilterSettings = {
  glutenFree: boolean;
  lactoseFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
};

type ToggleFavoriteAction = {
  type: typeof TOGGLE_FAVORITE;
  mealId: string;
};

type SetFilterAction = {
  type: typeof SET_FILTERS;
  filterSettings: FilterSettings;
};

export type MealsState = {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
};

export type MealsActionTypes = ToggleFavoriteAction | SetFilterAction;
