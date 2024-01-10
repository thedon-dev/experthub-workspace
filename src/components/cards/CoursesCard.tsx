import React from 'react';
import { Progress } from 'antd';

const CoursesCard = ({ course }: { course: any }) => {
  return (
    <div className="p-2 lg:w-[32%] shadow-md my-3 rounded-md bg-white">
      <img className="rounded-md w-full" src="/images/card.png" alt="" />
      <h3 className="font-medium my-3">{course.title} </h3>
      <p className='text-xs'>{course.about}...</p>
      <div className='flex justify-between my-3'>
        <div>
          <p className='text-xs my-1'>Students 24+</p>
          <div className='flex'>
            <img src="/images/user.png" className='w-5 h-5' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
          </div>
        </div>
        <div className='flex w-[70%] my-auto'>
          <p className='text-xs font-medium w-full'>Overall progress</p>
          <Progress percent={30} size="small" />

        </div>
      </div>
    </div>
  );
};

export default CoursesCard;