export const Actions = {
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
} as const;

export type ActionTypes = typeof Actions[keyof typeof Actions];

export interface Action<T> {
  type: ActionTypes;
  payload: T;
}

export interface Search {
  input: string;
}

export default {
  setSearchInput: (payload: Search): Action<Search> => ({
    type: Actions.SET_SEARCH_INPUT,
    payload,
  }),
};
