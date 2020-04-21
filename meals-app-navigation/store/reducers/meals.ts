import { MEALS } from '../../data/dummy-data';
import {
  MealsState,
  MealsActionTypes,
  TOGGLE_FAVORITE,
  SET_FILTERS,
} from '../types';

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
    case SET_FILTERS: {
      const {
        glutenFree,
        lactoseFree,
        vegan,
        vegetarian,
      } = action.filterSettings;

      const filteredMeals = state.meals.filter(
        ({ isGlutenFree, isLactoseFree, isVegan, isVegetarian }) => {
          if (glutenFree && !isGlutenFree) {
            return false;
          }

          if (lactoseFree && !isLactoseFree) {
            return false;
          }

          if (vegan && !isVegan) {
            return false;
          }

          if (vegetarian && !isVegetarian) {
            return false;
          }

          return true;
        },
      );

      return { ...state, filteredMeals };
    }
    default: {
      return state;
    }
  }
};

export default mealsReducer;
