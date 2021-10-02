import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';
import { useCallback } from 'react';
import actions, { Search } from '../actions/search';

export default () => {
  const dispatch = useDispatch();
  const input: string = useSelector((state: RootState) => state.search.input);

  const setInput = useCallback(
    (payload: Search) => {
      dispatch(actions.setSearchInput(payload));
    },
    [dispatch]
  );

  return {
    input,

    setInput,
  };
};
