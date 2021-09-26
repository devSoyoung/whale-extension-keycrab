import { AnyAction } from 'redux';
import { Actions as types } from '../actions/search';

interface Search {
  input: string;
}

const initialState: Search = {
  input: '',
};

export default (state: Search = initialState, action: AnyAction): Search => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_SEARCH_INPUT:
      return {
        input: payload,
      };
    default:
      return state;
  }
};
