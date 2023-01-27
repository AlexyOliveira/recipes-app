import { combineReducers } from 'redux';
import titlePageReducer from './pageTitleReducer';

const rootReducer = combineReducers({ titlePageReducer });

export default rootReducer;
