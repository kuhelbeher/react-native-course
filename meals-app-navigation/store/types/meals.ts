import Meal from '../../models/meal';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

type ToggleFavoriteAction = {
  type: typeof TOGGLE_FAVORITE;
  mealId: string;
};

export type MealsState = {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
};

export type MealsActionTypes = ToggleFavoriteAction;
