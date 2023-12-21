import DashboardLayout from '@/components/DashboardLayout';
import React from 'react';

const profile = () => {
  return (
    <DashboardLayout>
      <section className='w-[25%] mt-4 mx-auto'>
        <div className='shadow-[0px_2px_4px_0px_#1E1E1E21] p-3 text-center rounded-md'>
          <p className='font-medium text-lg'>Personal Details</p>
          <img src="/images/user.png" className='w-10 h-10 mx-auto my-3' alt="" />
          <p className='font-medium'>Adams John</p>
          <p className='text-xs'>Ayoolajanet12@gmail.com</p>
          <button className='bg-primary p-2 px-6 my-4 font-medium'>Edit profile</button>
        </div>
        <div className='my-4 text-center p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
          <p className='font-medium text-sm'>Highlights</p>
        </div>
        <div className='my-4 p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Phone Number</label>
            <input className='bg-transparent border-b border-[#1E1E1E66] w-full' type="number" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Gender</label>
            <input className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Age</label>
            <input className='bg-transparent border-b border-[#1E1E1E66] w-full' type="number" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Country of Residence</label>
            <input className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>State of Residence</label>
            <input className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Skill Level</label>
            <input className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='text-center'><button className='bg-primary p-2 px-6 my-4 font-medium'>Edit highlights</button></div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default profile;