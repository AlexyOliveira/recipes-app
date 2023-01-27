import { SEARCH_VALUE } from '../actions';

const INITIAL_STATE = {
  search: '',
};

const searchValueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_VALUE:
    return {
      ...state,
      search: action.search,
    };
  default:
    return state;
  }
};

export default searchValueReducer;
