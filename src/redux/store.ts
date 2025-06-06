import { createStore, applyMiddleware } from 'redux';
import { loadState } from '../utils/loadState';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const preloadState = loadState();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, preloadState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
