import React from 'react';
import SideNav from './SideNav';
import axios from 'axios';

const DashboardLayout = ({ children }: { children: any }) => {
  axios.defaults.baseURL = "https://shark-app-2-k9okk.ondigitalocean.app/"
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