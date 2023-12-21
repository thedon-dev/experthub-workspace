import React from 'react';

const ApplicantCourses = () => {
  return (
    <div className=" lg:w-[32%] my-3 ">
      <div className='flex my-2'>
        <img className='w-6 h-6' src="/images/user.png" alt="" />
        <p className='font-medium ml-3 text-sm'>A course by Evans. D</p>
      </div>
      <div className='bg-white p-2 rounded-md'>
        <img className="rounded-md w-full" src="/images/card.png" alt="" />
      </div>
      <div className='p-2'>
        <div className='flex justify-between my-2 '>
          <p className='text-xs text-[#DC9F08]'>Starts: 12-09-23</p>
          <p className='text-xs text-[#0ACF83]'>Time: 00:08:23</p>
        </div>
        <h3 className="font-medium text-xl my-2">Design Systems for Websites
          with Figma <button className='text-sm bg-primary p-1 rounded-md'>Join Live</button></h3>
        <p className='text-xs'>Learn how to build and design websites
          using Figma...</p>
      </div>
    </div>
  );
};

export default ApplicantCourses;