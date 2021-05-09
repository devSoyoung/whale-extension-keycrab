import { RootState } from '../../reducer';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../actions/keywords';
import { useCallback } from 'react';
import { Keywords } from '../../type/keywords';

export default () => {
  const dispatch = useDispatch();

  const keywords: Keywords = useSelector(
    (state: RootState) => state.keywords.list
  );

  const fetchKeywordList = useCallback(() => {
    dispatch(actions.fetchKeywordList());
  }, [dispatch]);

  return {
    keywords,

    fetchKeywordList,
  };
};
