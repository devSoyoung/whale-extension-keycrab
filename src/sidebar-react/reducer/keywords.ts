import { AnyAction } from 'redux';
import { Actions as types } from '../actions/keywords';

const initialState = {
  keywords: {},
};

export default (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_KEYWORD_LIST:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};
