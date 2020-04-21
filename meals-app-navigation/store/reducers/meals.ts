import { MEALS } from '../../data/dummy-data';
import { MealsState } from '../types';

const initialState: MealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action): MealsState => {
  return state;
};

export default mealsReducer;
