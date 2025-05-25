import { SET_SITE_INSIGHTS } from '../actionType';
import { type Site } from '../../utils/type';

interface siteInsightAction {
  type: typeof SET_SITE_INSIGHTS;
  payload: Site[];
}
const initialState = {
  sites: [],
};


export const siteInsightReducer = (state = initialState, action: siteInsightAction) => {
  switch (action.type) {
    case SET_SITE_INSIGHTS:
      return { ...state, sites: action.payload };
    default:
      return state;
  }
};
