import { combineReducers } from 'redux';
import siteReducer from './siteReducer';
import modalReducer from './modalReducer';
import { siteInsightReducer } from './siteInsightReducer';

const rootReducer = combineReducers({
  sites: siteReducer,
  modal: modalReducer,
  insights: siteInsightReducer
});

export default rootReducer;
