import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import CourseDetails from '../modals/CourseDetails';

const RecommendedCard = ({ course, call }: { course: CourseType, call: any }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='lg:flex justify-between border p-3 my-3 lg:w-[49%] rounded-md border-[#1E1E1E75]'>
      <div className='lg:w-52'>
        <img className='w-full h-full object-cover rounded-md' src={course.thumbnail} alt="" />
      </div>
      <div className='lg:mx-4 sm:my-2 w-full'>
        <p className='text-primary text-sm'>{course.category}. <span className='text-black'> by {course.instructorName}</span></p>
        <p className='font-medium text-base'>{course.title}</p>
        <div>
          <div>
          </div>
          {course.fee === 0 ? <p className='text-sm text-[#0BC01E]'>Free</p> : <p className='text-sm'><span>₦ {course.fee}</span> <span className='line-through	text-gray'>{course.strikedFee}</span></p>}
        </div>
        <div className='flex'>
          <div>
            <p className='text-xs my-1'>Students {course.enrolledStudents.length}</p>
            <div className='flex ml-1'>
              {course.enrolledStudents.slice(0, 6).map(course => <img key={course._id} src={course.profilePicture} className='w-5 rounded-full h-5 -ml-1' alt="" />)}
            </div>
          </div>
          <div></div>
        </div>

      </div>

      <div className='lg:w-52 my-auto'>
        <button onClick={() => setOpen(true)} className='p-2 w-full my-1 bg-primary rounded-sm'>Enrol Now</button>
        <button className='p-2 w-full bg-primary rounded-sm my-1'>Share</button>
      </div>
      <CourseDetails course={course} open={open} action={"Course"} type='enroll' call={call} handleClick={() => setOpen(false)} />
    </div>

  );
};

export default RecommendedCard;