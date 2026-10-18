import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';

const Dashboard = () => {
  return (

    <div className="container mx-auto">
    <div className="grid grid-cols-6 gap-x-4">
      <div className="col-span-1 bg-gray-100 min-h-screen">
        <SidebarComponent />
      </div>
      <div className="col-span-5 bg-gray-100 text-3xl p-2">

          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;