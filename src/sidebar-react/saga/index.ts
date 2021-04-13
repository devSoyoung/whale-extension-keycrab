import { call, put, takeEvery } from 'redux-saga/effects';
import { Actions as KeywordActions } from '../actions/keywords';

const getKeywordFromStorage = async () => {
  const findStorage = new Promise(function (resolve, reject) {
    whale.storage.sync.get(['keywords'], ({ keywords }) => {
      resolve(keywords);
    });
  });

  return await findStorage;
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
  yield takeEvery(KeywordActions.FETCH_KEYWORD_LIST, getKeywordSaga);
}
