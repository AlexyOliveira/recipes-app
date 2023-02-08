import { combineReducers } from 'redux';
import titlePageReducer from './pageTitleReducer';
import searchValueReducer from './searchValueReducer';
import drinkResultsReducer from './drinkResultsReducer';
import mealResultsReducer from './mealResultsReducer';
import globalHistoryReducer from './globalHistoryReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  titlePageReducer,
  searchValueReducer,
  drinkResultsReducer,
  mealResultsReducer,
  globalHistoryReducer,
  loadingReducer,
});

export default rootReducer;
