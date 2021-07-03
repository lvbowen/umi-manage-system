import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Avatar, Dropdown, Menu, Button, Tabs } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useModel, Link } from 'umi';
import _ from 'lodash';
import routes from '@/router';
import user from 'assets/images/header/user.png';

const { Header } = Layout;
const { TabPane } = Tabs;

const Index = (props) => {
  const {
    collapsed,
    setCollapsed,
    logout,
    tabList,
    removeTabList,
    clearAllTabList,
  } = useModel('useLayoutModel');
  const { pathname } = props;

  // 目前只支持二级
  const breadcrumbLabels = () => {
    const labels = [];
    routes.forEach((r) => {
      if (r.children) {
        const cur = r.children.find((c) => c.path === pathname);
        cur && labels.push(r.title, cur.title);
      } else if (r.path === pathname) {
        labels.push(r.title);
      }
    });
    return labels;
  };

  const menu = () => {
    return (
      <Menu>
        <Menu.Item
          onClick={() => {
            logout();
          }}
        >
          <a>退出登录</a>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Header className="site-layout-background yl-frame-background">
      <div className="yl-frame-header">
        <div className="yl-frame-breadcrumb">
          {!collapsed ? (
            <MenuFoldOutlined
              className="yl-frame-icon"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuUnfoldOutlined
              className="yl-frame-icon"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <Breadcrumb>
            {breadcrumbLabels().map((item) => (
              <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        <div className="yl-frame-right">
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="yl-frame-username">
              <Avatar className="yl-frame-avatar" src={user} />
              <span>某人</span>
            </span>
          </Dropdown>
        </div>
      </div>
      <div className="yl-frame-tab">
        <Tabs
          activeKey={pathname}
          type="editable-card"
          hideAdd
          onEdit={(path, action) => {
            if (action === 'remove') {
              removeTabList(path);
            }
          }}
          tabBarExtraContent={
            tabList.length <= 1 ? null : (
              <Dropdown
                arrow
                placement="bottomRight"
                overlay={() => {
                  return (
                    <div className="extraContent">
                      <Button type="link" onClick={() => clearAllTabList()}>
                        关闭所有
                      </Button>
                    </div>
                  );
                }}
                trigger={['click', 'hover']}
              >
                <EllipsisOutlined />
              </Dropdown>
            )
          }
        >
          {tabList.map((tab, index) => {
            return (
              <TabPane
                tab={
                  <Link
                    to={tab.path}
                    style={{ paddingLeft: 0 }}
                    title={tab.title}
                  >
                    {tab.title}
                  </Link>
                }
                key={tab.path}
                closable={index !== 0}
              ></TabPane>
            );
          })}
        </Tabs>
      </div>
    </Header>
  );
};

export default Index;
