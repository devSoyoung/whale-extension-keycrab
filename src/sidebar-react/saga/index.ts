import { call, put, takeLatest } from 'redux-saga/effects';
import { Action, Actions as KeywordActions } from '../actions/keywords';
import { Keywords } from '../type/keywords';

const getKeywordFromStorage = () => {
  return new Promise(function (resolve, reject) {
    whale.storage.sync.get(['keywords'], ({ keywords }) => {
      resolve(keywords);
    });
  });
};

const setKeyword = (keywords: Keywords) => {
  whale.storage.sync.set({ keywords });
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

function* setKeywords(action: Action<Keywords>) {
  const { payload } = action;
  yield call(setKeyword, payload);
}

export default function* rootSaga() {
  yield takeLatest(KeywordActions.FETCH_KEYWORD_LIST, getKeywordSaga);
  yield takeLatest(KeywordActions.SET_KEYWORD_LIST, setKeywords);
}
