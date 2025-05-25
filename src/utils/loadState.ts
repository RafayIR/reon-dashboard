export const loadState = () => {
  try {
    const sites = localStorage.getItem('sites');
    // const uiSettings = localStorage.getItem('uiSettings');
    // const insights = localStorage.getItem('multiSiteInsights');

    return {
      sites: sites ? JSON.parse(sites) : [],
      // ui: uiSettings ? JSON.parse(uiSettings) : {},
      // insights: insights ? JSON.parse(insights) : [],
    };
  } catch (err) {
    return undefined;
  }
};

/**
 * Initialize localStorage with sample data if it doesn't exist
 * This function loads the JSON data into localStorage on first app load
 */
export const initializeData = (data: any) => {
  // Initialize sites data
  if (!localStorage.getItem('sites')) {
    localStorage.setItem('sites', JSON.stringify(data.sites));
  }


  // Initialize multi-site insights data
  if (!localStorage.getItem('multiSiteInsights')) {
    localStorage.setItem('multiSiteInsights', JSON.stringify(data.multiSiteInsights));

  }

  // Initialize UI settings data
  if (!localStorage.getItem('uiSettings')) {
    localStorage.setItem('uiSettings', JSON.stringify(data.uiSettings));
  }
};

export const clearAllData = () => {
  localStorage.removeItem('sites');
  localStorage.removeItem('multiSiteInsights');
  localStorage.removeItem('uiSettings');
};
