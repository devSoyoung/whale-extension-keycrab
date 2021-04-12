import { takeEvery } from 'redux-saga/effects';
import { Actions as KeywordActions } from '../actions/keywords';

const getKeywordSaga = () => {
  console.log('Keyword Fetch is Called');
};

export default function* rootSaga() {
  yield takeEvery(KeywordActions.FETCH_KEYWORD_LIST, getKeywordSaga);
}
