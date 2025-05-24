import { useState } from "react";
import SummaryCards from "../components/dashboard/SummaryCards";
import DashboardTable from "../components/dashboard/DashboardTable";
import { SettingOutlined } from '@ant-design/icons';
import { Popover, Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from 'antd';

type SettingsKey = 'showSummaryCards' | 'showDataTable';
const LOCAL_STORAGE_KEY = 'uiSettings'
const defaultSettings = localStorage.getItem('uiSettings')

const DashboardPage = () => {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  const updateSetting = (key: SettingsKey) => (e: CheckboxChangeEvent) => {
    const newSettings = {
      ...settings,
      [key]: e.target.checked,
    };
    setSettings(newSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSettings));
  };

  const popOverContent = (
    <div className="flex flex-col gap-3">
      <Checkbox
        checked={settings.showSummaryCards}
        onChange={updateSetting('showSummaryCards')}
      >
        Show Summary Cards
      </Checkbox>
      <Checkbox
        checked={settings.showDataTable}
        onChange={updateSetting('showDataTable')}
      >
        Show/Hide Data Table
      </Checkbox>
    </div>
  );


  return (
    <>
      <div className="dashboard-wrapper min-h-screen">
        <div className="flex items-center justify-between">
          <div className="site-title">
            <h1>
              Dashboard
            </h1>
          </div>
          <div className="setting-wrapper">
            <Popover placement="leftTop" title='Dashboard Setting' content={popOverContent}>
              <Button>
                <SettingOutlined />
              </Button>
            </Popover>
          </div>
        </div>
        {settings.showSummaryCards && <SummaryCards />}
        {settings.showDataTable && <DashboardTable />}
      </div>

    </>
  )
}


export default DashboardPage;