import DashboardLayout from '@/components/DashboardLayout';
import AppointmentView from '@/components/View/AppointmentView';
import React from 'react';

const appointment = () => {
  return (
    <DashboardLayout>
      <AppointmentView />
    </DashboardLayout>
  );
};

export default appointment;