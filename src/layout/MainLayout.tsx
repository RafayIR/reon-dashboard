import React, { type ReactNode } from 'react';
import { Layout, theme } from 'antd';
import Header from './header/Header';
import Footer from './footer/Footer';
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
      <Content className='md:px-4 md:py-6'
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div className='container'>
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;