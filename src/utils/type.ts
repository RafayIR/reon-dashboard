export interface Site {
  id: number;
  name: string;
  status: string;
  lastUpdated: string;
  alarms: number;
  tickets: number;
  devices: number;
  insights: number[];
}
export interface SitesState {
  data: Site[];
  loading: boolean;
  error: string | null;
  editingSiteId: string | null;
}
export interface RootState {
  sites: SitesState;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Site;
  index: number;
}