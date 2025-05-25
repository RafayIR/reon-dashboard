import { NavLink, useLocation } from "react-router";
import { Menu } from 'antd';
import {
  DashboardFilled,
  DashboardOutlined
} from '@ant-design/icons';
import insightIcon from '../../assets/icons/insights.svg';


const Header: React.FC = () => {
  const isActivePath = (path: string) => location.pathname === path
  const location = useLocation();
  const menuItems = [
    {
      key: '1',
      path: '/dashboard',
      icon: isActivePath('/dashboard') ? <DashboardFilled /> : <DashboardOutlined />,
      label: <NavLink to='/dashboard'>Dashboard</NavLink>,
    },
    {
      key: '2',
      path: '/insights',
      icon: <img src={insightIcon} alt="Insight Icon" />,
      label: < NavLink to='/insights' >Insights</NavLink >
    },
  ]

  const selectedItem = menuItems.find((item) =>
    location.pathname === item.path
  );
  const selectedKeys = selectedItem ? [selectedItem.key] : [];


  return (
    <header>
      <div className="header-wrapper bg-[#FFC601] py-3">
        <div className="container">
          <div className="flex items-center">
            <NavLink to='/dashboard' className='logo-wrapper'>
              <div className='logo w-[70%] px-4'>
                <img src="assets/images/logo/reon-logo.png" alt="logo" />
              </div>
            </NavLink>

            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={menuItems}
              className="border-0 md:justify-start justify-end"
              style={{ flex: 1, minWidth: 0, borderBottom: 0 }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header