import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';

const Main: React.FC = () => {
  return (
    <div className="grid grid-cols-5 font-itim text-lg bg-main" >
     <div className='col-span-1'>
     <Sidebar/>
     </div>
      <div className="col-span-4">
       <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
