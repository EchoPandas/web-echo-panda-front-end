import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const MainLayout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
