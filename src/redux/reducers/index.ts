import { combineReducers } from 'redux';
import siteReducer from './siteReducer';
import modalReducer from './modalReducer';
// import uiReducer from './uiReducer';
// import insightsReducer from './insightsReducer';

const rootReducer = combineReducers({
  sites: siteReducer,
  modal: modalReducer
  // ui: uiReducer,
  // insights: insightsReducer,
});

export default rootReducer;
