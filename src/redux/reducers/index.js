import { combineReducers } from 'redux';
import titlePageReducer from './pageTitleReducer';
import searchValueReducer from './searchValueReducer';
import drinkResultsReducer from './drinkResultsReducer';
import mealResultsReducer from './mealResultsReducer';
import globalHistoryReducer from './globalHistoryReducer';

const rootReducer = combineReducers({
  titlePageReducer,
  searchValueReducer,
  drinkResultsReducer,
  mealResultsReducer,
  globalHistoryReducer,
});

export default rootReducer;
