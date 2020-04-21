import { TOGGLE_FAVORITE, MealsActionTypes } from '../types';

export const toggleFavorite = (mealId: string): MealsActionTypes => ({
  type: TOGGLE_FAVORITE,
  mealId,
});
