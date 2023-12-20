import AssesmentCard from '@/components/AssesmentCard';
import DashboardLayout from '@/components/DashboardLayout';
import React from 'react';

const assesment = () => {
  return (
    <DashboardLayout>
      <section className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-6 text-center'>
        <p className='text-lg font-medium'>Assessment Templates</p>
      </section>
      <section className='p-10'>
        <div className='text-center'>
          <button className='p-2 bg-[#D9D9D9] font-medium px-10'>+ Add Assesmment</button>
        </div>
        <div className='flex mt-10 justify-between flex-wrap'>
          <AssesmentCard />
          <AssesmentCard />
          <AssesmentCard />

        </div>
      </section>
    </DashboardLayout>
  );
};

export default assesment;