import { combineReducers } from 'redux';

import keywords from './keywords';
import search from './search';

const rootReducers = combineReducers({
  keywords,
  search,
});

export default rootReducers;

export type RootState = ReturnType<typeof rootReducers>;
