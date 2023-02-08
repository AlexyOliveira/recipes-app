import { LOADING } from '../actions';

const INITIAL_STATE = {
  loading: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      loading: action.loading,
    };
  default:
    return state;
  }
};

export default loadingReducer;
