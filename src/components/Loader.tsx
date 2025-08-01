import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
     <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default Loader;
