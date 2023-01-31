import { MEAL_RESULTS } from '../actions';

const INITIAL_STATE = {
  meals: [],
};

const mealResultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEAL_RESULTS:
    return {
      ...state,
      meals: action.meals,
    };
  default:
    return state;
  }
};

export default mealResultsReducer;
