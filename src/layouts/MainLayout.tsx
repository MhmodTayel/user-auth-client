import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;