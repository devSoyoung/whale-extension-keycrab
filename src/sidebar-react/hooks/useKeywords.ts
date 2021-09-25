import { RootState } from '../reducer';
import { useSelector, useDispatch } from 'react-redux';
import actions, {
  SetFoldKeywordPayload,
  SetFollowKeywordPayload,
} from '../actions/keywords';
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
      const { keyword, tracking } = payload;
      const newKeywords = { ...keywords };
      newKeywords[keyword].tracking = !tracking;
      dispatch(actions.setKeywordList(newKeywords));
    },
    [dispatch, keywords]
  );

  const toggleFoldKeyword = useCallback(
    (payload: SetFoldKeywordPayload) => {
      const { keyword, fold } = payload;
      const newKeywords = { ...keywords };
      newKeywords[keyword].fold = !fold;
      dispatch(actions.setKeywordList(newKeywords));
    },
    [dispatch, keywords]
  );

  return {
    keywords,

    fetchKeywordList,
    toggleFollowKeyword,
    toggleFoldKeyword,
  };
};
