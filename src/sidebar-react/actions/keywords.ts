import { Keywords } from '../type/keywords';

export const Actions = {
  FETCH_KEYWORD_LIST: 'FETCH_KEYWORD_LIST',
  SET_KEYWORD_LIST: 'SET_KEYWORD_LIST',
  SET_FOLLOW_KEYWORD: 'SET_FOLLOW_KEYWORD',
} as const;

export type ActionTypes = typeof Actions[keyof typeof Actions];

export interface Action<T> {
  type: ActionTypes;
  payload: T;
}

export interface SetFollowKeywordPayload {
  tracking: boolean;
  keyword: string;
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
  setFollowKeyword: (
    payload: SetFollowKeywordPayload
  ): Action<SetFollowKeywordPayload> => ({
    type: Actions.SET_FOLLOW_KEYWORD,
    payload,
  }),
};
