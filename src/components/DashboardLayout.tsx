import React from 'react';
import SideNav from './SideNav';

const DashboardLayout = ({ children }: { children: any }) => {
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