import React from 'react';
import SideNav from './SideNav';
import axios from 'axios';

const DashboardLayout = ({ children }: { children: any }) => {
  axios.defaults.baseURL = "https://experthub.onrender.com/"
  // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

  return (
    <main className='flex'>
      <div className='w-[20%]'>
        <SideNav />
      </div>
      <section className='w-[80%]'>
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
