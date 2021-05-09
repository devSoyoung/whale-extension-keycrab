import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions as KeywordActions } from '../actions/keywords';

const getKeywordFromStorage = () => {
  return new Promise(function (resolve, reject) {
    whale.storage.sync.get(['keywords'], ({ keywords }) => {
      resolve(keywords);
    });
  });
};

function* getKeywordSaga() {
  console.log('Keyword Fetch is Called');
  const keywords = yield call(getKeywordFromStorage);
  console.log('in Saga, keywords are ', keywords);

  yield put({
    type: KeywordActions.SET_KEYWORD_LIST,
    payload: keywords,
  });
}

export default function* rootSaga() {
  yield takeLatest(KeywordActions.FETCH_KEYWORD_LIST, getKeywordSaga);
}
