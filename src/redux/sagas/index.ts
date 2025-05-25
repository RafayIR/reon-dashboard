import { all } from 'redux-saga/effects';
import siteSaga from './siteSaga';
// import uiSaga from './uiSaga';
// import insightsSaga from './insightsSaga';

export default function* rootSaga() {
  yield all([siteSaga()]);
}