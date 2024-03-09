import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import CourseDetails from '../modals/CourseDetails';

const RecommendedCard = ({ course, call }: { course: CourseType, call: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex justify-between border p-3 my-3 lg:w-[49%] rounded-md border-[#1E1E1E75]'>
      <div className='w-52'>
        <img className='w-full h-full object-cover rounded-md' src={course.thumbnail} alt="" />
      </div>
      <div className='mx-4 w-full'>
        <p className='text-primary text-sm'>{course.category}. <span className='text-black'> by {course.instructorName}</span></p>
        <p className='font-medium text-base'>{course.title}</p>
        <p className='text-sm'><span>₦ {course.fee - course.strikedFee}</span> <span className='line-through	text-gray'>{course.fee}</span></p>
      </div>
      <button onClick={() => setOpen(true)} className='p-2 w-52 bg-primary my-auto rounded-sm'>Enrol Now</button>
      <CourseDetails course={course} open={open} type='enroll' call={call} handleClick={() => setOpen(false)} />

    </div>
  );
};

export default RecommendedCard;