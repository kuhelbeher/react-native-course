import Meal from '../../models/meal';

export type MealsState = {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
};
