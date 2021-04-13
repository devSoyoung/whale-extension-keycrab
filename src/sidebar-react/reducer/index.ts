import { combineReducers } from 'redux';

import keywords from './keywords';

const rootReducers = combineReducers({
  keywords,
});

export default rootReducers;

export type RootState = ReturnType<typeof rootReducers>;
