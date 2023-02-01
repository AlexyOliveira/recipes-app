import { GLOBAL_HISTORY } from '../actions';

const INITIAL_STATE = {
  history: [],
};

const globalHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GLOBAL_HISTORY:
    return {
      ...state,
      history: action.history,
    };
  default:
    return state;
  }
};

export default globalHistoryReducer;
