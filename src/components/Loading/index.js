import React from 'react';
// import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = ({ retry }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
