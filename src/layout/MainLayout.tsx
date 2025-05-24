import React, { type ReactNode } from 'react';
import { Layout, theme } from 'antd';
import Header from './header/Header';
const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='min-h-screen'>
        <Header />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
    </Layout>
  );
};

export default MainLayout;