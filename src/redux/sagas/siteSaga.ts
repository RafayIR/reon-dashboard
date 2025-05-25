import { put, takeEvery, call } from 'redux-saga/effects';

// import instance from '../../services/axios/axios';

import {
  FETCH_SITES,
  SITE_REQUEST,
  SET_SITES,
  SITES_FAILURE,
  UPDATE_SITE,
  UPDATE_SITE_REQUEST
} from '../actionType';

interface Site {
  id: string;
  name: string;
  [key: string]: any;
}

const siteService = {
  loadSites: () => {
    const sites = JSON.parse(localStorage.getItem('sites') || '[]');
    return Promise.resolve({ data: sites });
  },

  updateSites: async (siteData: Site): Promise<{ data: Site }> => {

    // Mock POST API CALL TO SERVER
    // const response = await instance.post(`/sites/${siteData.id}`, siteData);
    // return {data : response.data}

    // Assuming POST API CALL FOR EDIT
    return new Promise((resolve) => {
      setTimeout(() => {
        const sites = JSON.parse(localStorage.getItem('sites') || '[]');
        const updatedSites = sites.map((site: Site) =>
          site.id === siteData.id ? { ...site, ...siteData } : site
        );
        localStorage.setItem('sites', JSON.stringify(updatedSites));
        resolve({ data: updatedSites.find((s: Site) => s.id === siteData.id) });
      }, 1500)
    });
  }
};

function* fetchSitesSaga() {
  try {
    yield put({ type: SITE_REQUEST });
    const response: { data: Site[] } = yield call(siteService.loadSites);
    yield put({ type: SET_SITES, payload: response.data });
  } catch (error: any) {
    yield put({ type: SITES_FAILURE, payload: error.message || 'Failed to fetch sites' });
  }
}

function* updateSiteSaga(action: { type: string; payload: Site }) {
  try {
    const response: { data: Site } = yield call(siteService.updateSites, action.payload);
    yield put({ type: UPDATE_SITE, payload: response.data });
  } catch (error: any) {
    yield put({ type: SITES_FAILURE, payload: error.message || 'Failed to update site' });
  }
}

export default function* siteSaga() {
  yield takeEvery(FETCH_SITES, fetchSitesSaga);
  yield takeEvery(UPDATE_SITE_REQUEST, updateSiteSaga);
}
