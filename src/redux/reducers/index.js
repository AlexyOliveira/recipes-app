import { combineReducers } from 'redux';
import titlePageReducer from './pageTitleReducer';
import searchValueReducer from './searchValueReducer';
import drinkResultsReducer from './drinkResultsReducer';
import mealResultsReducer from './mealResultsReducer';

const rootReducer = combineReducers({
  titlePageReducer,
  searchValueReducer,
  drinkResultsReducer,
  mealResultsReducer,
});

export default rootReducer;
