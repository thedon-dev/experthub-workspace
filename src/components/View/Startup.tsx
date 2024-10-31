'use client'

import { useAppSelector } from '@/store/hooks';
import React from 'react';

const Startup = () => {
  const user = useAppSelector((state) => state.value);

  const data = [
    {
      title: "Create a Business Page to start marketing your skills",
      button: "Create a Business Page"
    },
    {
      title: "Hire an Employee / Virtual Assistant to do the work for you",
      button: "Hire a Virtual Assistant/Employee"
    },
    {
      title: "Start creating your own course for others to learn",
      button: "Create a Training Course"
    },
    {
      title: "Register your Business and Brand with Corporate Affairs Commission",
      button: "Register your Business/Brand"
    },
    {
      title: "Register your Business in United State of America and state receiving money in USD ",
      button: "Register your Business/Brand"
    },
    {
      title: "Apply for EB1, EB2 as a business owner  or investor and reside in the United State",
      button: "Learn More"
    },
    {
      title: "Get Hired as a Virtual Asistant. Telephone Cal, web design, content creation, marketing etc",
      button: "Become a Virtual Asistant"
    },
    {
      title: "Start Organising your Events. Seminars, Workshop, Conference and other gathering",
      button: "Create Event"
    },
    {
      title: "Apply for EB1, EB2 as a business owner  or investor and reside in the United State",
      button: "Start Your Non-Profit Business"
    },
  ]
  return (
    <div className='p-4'>
      <div className='flex mb-10 sm:p-4 shadow justify-between'>
        <div className='lg:w-[70%]'>
          <p className='font-normal lg:text-3xl text-xl'>This is your Starter Pack to enable you get started
            now that you have built a skill</p>
          {user.role === 'admin' && <button className='w-40 p-2 bg-primary text-white mt-4'>Create New</button>}

        </div>
        <div className='sm:hidden block w-[15%]'>
          <img src="/images/image_19.png" alt="" />
        </div>
      </div>
      <div className='lg:grid grid-cols-3 gap-6'>
        {data.map((single, index) => <div key={index} className='text-center sm:my-4'>
          <img src={`/images/startup-kit/img-${index + 1}.png`} alt="" />
          <p className='my-4'>{single.title}</p>
          <button className='p-3 rounded-md w-full bg-primary text-white'>{single.button}</button>
        </div>)}
      </div>
    </div>
  );
};

export default Startup;