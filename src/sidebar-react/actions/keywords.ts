import { Keywords } from '../type/keywords';

export const Actions = {
  FETCH_KEYWORD_LIST: 'FETCH_KEYWORD_LIST',
  SET_KEYWORD_LIST: 'SET_KEYWORD_LIST',
} as const;

export type ActionTypes = typeof Actions[keyof typeof Actions];

interface Action<T> {
  type: ActionTypes;
  payload: T;
}

export default {
  fetchKeywordList: (): Action<Record<string, never>> => ({
    type: Actions.FETCH_KEYWORD_LIST,
    payload: {},
  }),
  setKeywordList: (payload: Keywords): Action<Keywords> => ({
    type: Actions.SET_KEYWORD_LIST,
    payload,
  }),
};
