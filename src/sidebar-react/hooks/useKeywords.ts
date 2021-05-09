import { RootState } from '../reducer';
import { useSelector, useDispatch } from 'react-redux';
import actions, { SetFollowKeywordPayload } from '../actions/keywords';
import { useCallback } from 'react';
import { Keywords } from '../type/keywords';

export default () => {
  const dispatch = useDispatch();

  const keywords: Keywords = useSelector(
    (state: RootState) => state.keywords.list
  );

  const fetchKeywordList = useCallback(() => {
    dispatch(actions.fetchKeywordList());
  }, [dispatch]);

  const toggleFollowKeyword = useCallback(
    (payload: SetFollowKeywordPayload) => {
      dispatch(actions.setFollowKeyword(payload));
    },
    [dispatch]
  );

  return {
    keywords,

    fetchKeywordList,
    toggleFollowKeyword,
  };
};
