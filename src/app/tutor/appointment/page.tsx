"use client"

import DashboardLayout from '@/components/DashboardLayout';
import Availability from '@/components/modals/AvailabilityModel';
import AppointmentView from '@/components/View/AppointmentView';
import React, { useState } from 'react';

const appointment = () => {
  const [availability, setAvailability] = useState(false)

  return (
    <DashboardLayout>
      <main>
        <div className='p-4'>
          <button onClick={() => setAvailability(true)} className='bg-[#FDC332] p-3 px-6 rounded-md'>Update Availability</button>
        </div>
        <AppointmentView />
        <Availability open={availability} handleClick={() => setAvailability(false)} />
      </main>
    </DashboardLayout>
  );
};

export default appointment;