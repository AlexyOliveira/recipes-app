import { combineReducers } from 'redux';
import titlePageReducer from './pageTitleReducer';
import searchValueReducer from './searchValueReducer';

const rootReducer = combineReducers({ titlePageReducer, searchValueReducer });

export default rootReducer;
