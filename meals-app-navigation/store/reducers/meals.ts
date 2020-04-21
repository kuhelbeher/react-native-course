import { MEALS } from '../../data/dummy-data';
import { MealsState, MealsActionTypes, TOGGLE_FAVORITE } from '../types';

const initialState: MealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (
  state = initialState,
  action: MealsActionTypes,
): MealsState => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const favoriteMealIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId,
      );

      let favoriteMeals;

      if (favoriteMealIndex >= 0) {
        favoriteMeals = state.favoriteMeals.filter(
          (meal) => meal.id !== action.mealId,
        );
      } else {
        const favoriteMeal = state.meals.find(
          (meal) => meal.id === action.mealId,
        );
        favoriteMeals = favoriteMeal
          ? state.favoriteMeals.concat(favoriteMeal)
          : state.favoriteMeals;
      }

      return {
        ...state,
        favoriteMeals,
      };
    }
    default: {
      return state;
    }
  }
};

export default mealsReducer;
