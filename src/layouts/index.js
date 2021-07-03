import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import MyAside from './Aside';
import MyHeader from './Header';

import './index.less';

const { Content } = Layout;

const BasicLayout = (props) => {
  console.log('layout props', props);
  const {
    location: { pathname },
    children,
  } = props;

  return (
    <Layout className="yl-frame-layout">
      {/* <Spin spinning={spinLoading} /> */}
      <MyAside pathname={pathname} />
      <Layout className="yl-frame-layout-content">
        <MyHeader pathname={pathname} />
        <Content className="yl-frame-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
