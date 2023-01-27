import { PAGE_TITLE } from '../actions';

const INITIAL_STATE = {
  title: '',
};

const titlePageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PAGE_TITLE:
    return {
      ...state,
      title: action.title,
    };
  default:
    return state;
  }
};

export default titlePageReducer;
