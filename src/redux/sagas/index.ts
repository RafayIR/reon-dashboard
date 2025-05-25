import { all } from 'redux-saga/effects';
import siteSaga from './siteSaga';
import multiSiteSaga from './multiSiteSaga';
// import insightsSaga from './insightsSaga';

export default function* rootSaga() {
  yield all([siteSaga(), multiSiteSaga()]);
}