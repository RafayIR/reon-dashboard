import './App.css'
import { useEffect } from 'react'
import { ConfigProvider } from 'antd';
import sitesData from './data/sites.json';
import insightsData from './data/multiSiteInsights.json';
import uiSettings from './data/uiSettings.json';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import DashboardPage from './pages/Dashboard';
import InsightsPage from './pages/Insights';
import MainLayout from './layout/MainLayout';



function App() {
  useEffect(() => {
    if (!localStorage.getItem('sites')) {
      localStorage.setItem('sites', JSON.stringify(sitesData));
    }
    if (!localStorage.getItem('multiSiteInsights')) {
      localStorage.setItem('multiSiteInsights', JSON.stringify(insightsData));
    }
    if (!localStorage.getItem('uiSettings')) {
      localStorage.setItem('uiSettings', JSON.stringify(uiSettings));
    }

  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFC601',
          colorPrimaryHover: '#FFC601',
          colorBorder: '#000000'
        },
        components: {
          Menu: {
            colorPrimary: '#000000',
            darkItemBg: '#FFC601',
            itemBg: '#FFC601',
            itemBorderRadius: 3
          },
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path='/dashboard' element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          } />
          <Route path='/insights' element={
            <MainLayout >
              <InsightsPage />
            </MainLayout>
          } />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
