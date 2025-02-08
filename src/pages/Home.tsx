import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;
const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <Title className="text-6xl">Welcome to the application.</Title>
    </div>
  );
};

export default Home;
