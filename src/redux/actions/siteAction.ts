import {
  FETCH_SITES,
  SET_SITES,
  UPDATE_SITE,
  UPDATE_SITE_REQUEST,
  SITES_FAILURE
} from "../actionType";
import { type Site } from "../../utils/type";

// Action Creators
export const fetchSites = () => ({ type: FETCH_SITES });

export const setSites = (sites: Site[]) => ({
  type: SET_SITES,
  payload: sites
});

export const updateSiteRequest = (site: Site) => ({
  type: UPDATE_SITE_REQUEST,
  payload: site
});

export const updateSite = (site: Site) => ({
  type: UPDATE_SITE,
  payload: site
});

export const sitesFailure = (error: string) => ({
  type: SITES_FAILURE,
  payload: error
});