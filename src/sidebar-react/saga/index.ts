import { call, put, takeLatest } from 'redux-saga/effects';
import {
  Action,
  Actions as KeywordActions,
  SetFollowKeywordPayload,
} from '../actions/keywords';
import { Keywords } from '../type/keywords';

const getKeywordFromStorage = () => {
  return new Promise(function (resolve, reject) {
    whale.storage.sync.get(['keywords'], ({ keywords }) => {
      resolve(keywords);
    });
  });
};

const setKeyword = (keywords: Keywords) => {
  whale.storage.sync.set({ ...keywords });
  // console.log('trying,,', keywords);
  // return new Promise(function (resolve, reject) {
  //   whale.storage.sync.set(keywords, () => {
  //     resolve({ success: true });
  //   });
  // });
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

function* setKeywordFollow(action: Action<SetFollowKeywordPayload>) {
  console.log('setKeywordFollow is Called', action);
  const { payload } = action;
  const { keyword, tracking } = payload;
  const keywords = yield call(getKeywordFromStorage);
  keywords[keyword].tracking = !tracking;
  console.log(keywords);

  yield call(setKeyword, keywords);
}

export default function* rootSaga() {
  yield takeLatest(KeywordActions.FETCH_KEYWORD_LIST, getKeywordSaga);
  yield takeLatest(KeywordActions.SET_FOLLOW_KEYWORD, setKeywordFollow);
}
