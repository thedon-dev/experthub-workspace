import DashboardLayout from '@/components/DashboardLayout';
import CalenderView from '@/components/View/CalenderView';
import React from 'react';

const Calender = () => {
  return (
    <DashboardLayout>
      <div className='p-4'>
        <CalenderView />
      </div>
    </DashboardLayout>
  );
};

export default Calender;