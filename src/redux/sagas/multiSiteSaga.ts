import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_SITE_INSIGHTS } from '../actionType';
import { setSiteInsights } from '../actions/multiSiteAction';

function* handleLoadSiteInsights() {
  try {
    const raw = localStorage.getItem('multiSiteInsights');
    const parsed = raw ? JSON.parse(raw) : [];
    yield put(setSiteInsights(parsed));
  } catch (error) {
    console.error('Error loading site insights:', error);
    yield put(setSiteInsights([]));
  }
}

export default function* multiSiteSaga() {
  yield takeLatest(LOAD_SITE_INSIGHTS, handleLoadSiteInsights);
}
