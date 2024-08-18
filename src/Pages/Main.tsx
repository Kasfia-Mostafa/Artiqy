import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const Main: React.FC = () => {
  return (
    <div className="flex font-itim text-lg font-normal" >
     <Sidebar/>
      <div className="flex-1">
       <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
