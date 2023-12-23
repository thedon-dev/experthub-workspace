import DashboardLayout from '@/components/DashboardLayout';
import SearchNav from '@/components/SearchNav';
import AdmissionCard from '@/components/cards/AdmissionCard';
import React from 'react';

const tutor = () => {
  return (
    <DashboardLayout>
      <SearchNav />
      <section className='m-4'>
        <p className='text-lg my-3 font-medium'>Training Providers</p>
        <AdmissionCard />
      </section>
    </DashboardLayout>
  );
};

export default tutor;