import { DRINK_RESULTS } from '../actions';

const INITIAL_STATE = {
  drinks: [],
};

const drinkResultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINK_RESULTS:
    return {
      ...state,
      drinks: action.drinks,
    };
  default:
    return state;
  }
};

export default drinkResultsReducer;
