"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useState } from 'react';
import AdmissionCard from '@/components/cards/AdmissionCard';

const addmissions = () => {
  const [active, setActive] = useState("students")
  return (
    <DashboardLayout>
      <section>
        <div className='p-4 flex justify-between w-full shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
          <div>

          </div>
          <div className='w-1/2 relative'>
            <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
            <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
          </div>
          <div className='flex w-28 justify-between'>
            <div className='p-3 h-10 w-10 my-auto rounded-full shadow-md'>
              <img src="/images/icons/notification.svg" alt="" />
            </div>
            <img className='h-10 w-10 my-auto' src="/images/user.png" alt="" />
          </div>
        </div>
      </section>
      <section className='m-4'>
        <div className='flex justify-between w-1/2'>
          <div onClick={() => setActive("students")} className={active === "students" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Students</p>
          </div>
          <div onClick={() => setActive("mentees")} className={active === "mentees" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Mentees</p>
          </div>
          <div onClick={() => setActive("graduates")} className={active === "graduates" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Graduates</p>
          </div>
        </div>
        {(() => {
          switch (active) {
            case 'students':
              return <div>
                <AdmissionCard />
                <AdmissionCard />
              </div>
            case 'mentees':
              return <div>

              </div>
            case 'graduates':
              return <div>

              </div>
            default:
              return null
          }
        })()}
      </section>
    </DashboardLayout>
  );
};

export default addmissions;