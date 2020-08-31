import * as actionTypes from '../action';

const initialState = {
  isFetching: false,
  currentLocation: null,
};

const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_STARTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.REQUEST_COMPLETED: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case actionTypes.CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default appReducers;
