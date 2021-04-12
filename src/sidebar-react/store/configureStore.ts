import { createStore } from 'redux';
import rootReducers from '../reducer';

const configureStore = () => createStore(rootReducers);

export default configureStore;
