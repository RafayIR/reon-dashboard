import {
  SET_SITES,
  SITE_REQUEST,
  SITES_FAILURE,
  UPDATE_SITE_REQUEST,
  UPDATE_SITE
} from '../actionType';

interface Site {
  id: string;
  name: string;
  [key: string]: any;
}

interface SiteState {
  data: Site[];
  loading: boolean;
  error: string | null;
  editingSiteId: string | null;
}

interface SiteRequestAction {
  type: typeof SITE_REQUEST;
}

interface SetSitesAction {
  type: typeof SET_SITES;
  payload: Site[];
}

interface SitesFailureAction {
  type: typeof SITES_FAILURE;
  payload: string;
}

interface UpdateSiteRequestAction {
  type: typeof UPDATE_SITE_REQUEST;
  payload: Site;
}

interface UpdateSiteAction {
  type: typeof UPDATE_SITE;
  payload: Site;
}

type SiteAction =
  | SiteRequestAction
  | SetSitesAction
  | SitesFailureAction
  | UpdateSiteRequestAction
  | UpdateSiteAction;

const initialState: SiteState = {
  data: [],
  loading: false,
  error: null,
  editingSiteId: null,
};

const siteReducer = (state = initialState, action: SiteAction): SiteState => {
  switch (action.type) {
    case SITE_REQUEST:
    case UPDATE_SITE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SET_SITES:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };

    case UPDATE_SITE:
      return {
        ...state,
        data: state.data.map(site =>
          site.id === action.payload.id ? action.payload : site
        ),
        loading: false,
        editingSiteId: null,
        error: null
      };

    case SITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default siteReducer;
