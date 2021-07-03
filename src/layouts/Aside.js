import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useModel } from 'umi';
// import { PieChartOutlined } from '@ant-design/icons';
import routes from '@/router';
import { DEFAULT_ROUTE } from 'utils/const';
import curve from '@/assets/images/aside/curve.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Index = (props) => {
  const { collapsed, changeTabList } = useModel('useLayoutModel');
  const { pathname } = props;
  console.log('aside pathname', pathname);

  const menuItem = (nav) => {
    return (
      <Menu.Item
        key={nav.path}
        onClick={() => {
          changeTabList(nav);
        }}
      >
        <Link to={nav.path} style={{ paddingLeft: 0 }}>
          <div className="menu-link">
            {nav.icon}
            <span className="yl-frame-nav-title">{nav.title}</span>
          </div>
        </Link>
      </Menu.Item>
    );
  };

  const subMenuItem = (nav) => {
    return (
      <SubMenu title={nav.title} icon={nav.icon} key={nav.title}>
        {nav.children.map((n) => {
          return menuItem(n);
        })}
      </SubMenu>
    );
  };

  const siderProps = {
    collapsible: true,
    collapsed,
    trigger: null,
    style: {
      background: `url(${curve}) #0D255A no-repeat center center`,
      backgroundSize: '200px 100%',
    },
  };
  return (
    <Sider width={200} {...siderProps}>
      <div
        className={'yl-frame-logo'}
        style={collapsed ? { width: '0px' } : null}
      >
        碧道工程建设管理
      </div>
      <Menu
        className={`left-menu-link ${
          collapsed ? 'left-menu-link-collapsed' : ''
        }`}
        defaultSelectedKeys={[pathname === '/' ? DEFAULT_ROUTE : pathname]}
        selectedKeys={[pathname === '/' ? DEFAULT_ROUTE : pathname]}
        theme="dark"
        mode="inline"
        onClick={() => {}}
      >
        {routes.map((nav) => {
          if (!nav.children) {
            return menuItem(nav);
          } else {
            return subMenuItem(nav);
          }
        })}
      </Menu>
    </Sider>
  );
};

export default Index;
