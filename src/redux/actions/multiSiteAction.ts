import { SET_SITE_INSIGHTS, LOAD_SITE_INSIGHTS } from '../actionType';

interface Site {
  id: string;
  name: string;
}

export const loadSiteInsights = () => ({
  type: LOAD_SITE_INSIGHTS,
});

export const setSiteInsights = (data: Site[]) => ({
  type: SET_SITE_INSIGHTS,
  payload: data,
});