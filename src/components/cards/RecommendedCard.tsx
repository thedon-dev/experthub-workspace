import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { notification } from 'antd';
import CourseDetails from '../modals/CourseDetails';

const RecommendedCard = ({ course, call }: { course: CourseType, call: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex justify-between border p-3 my-3 w-[49%] rounded-md border-[#1E1E1E75]'>
      <div className='w-52'>
        <img className='w-full h-20 object-cover rounded-md' src={course.thumbnail} alt="" />
      </div>
      <div className='mx-4 w-full'>
        <p className='text-primary text-sm'>{course.category}. <span className='text-black'> Evans D</span></p>
        <p className='font-medium'>{course.title}</p>
        <p className='text-sm'>{course.startDate}</p>
      </div>
      <button onClick={() => setOpen(true)} className='p-2 w-52 bg-primary my-auto rounded-sm'>Enrol Now</button>
      <CourseDetails course={course} open={open} type='enroll' call={call} handleClick={() => setOpen(false)} />

    </div>
  );
};

export default RecommendedCard;