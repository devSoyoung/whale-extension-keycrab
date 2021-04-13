import { AnyAction } from 'redux';
import { Actions as types } from '../actions/keywords';
import { Keywords } from '../type/keywords';

interface KeywordState {
  list: Keywords;
}

const initialState: KeywordState = {
  list: {},
};

export default (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_KEYWORD_LIST:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
