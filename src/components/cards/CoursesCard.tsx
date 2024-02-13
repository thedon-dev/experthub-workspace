import React, { useState } from 'react';
import { Progress } from 'antd';
import { usePathname } from 'next/navigation';
import CourseDetails from '../modals/CourseDetails';

const CoursesCard = ({ course }: { course: any }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="p-2 w-full shadow-md my-3 rounded-md bg-white">
      <img className="rounded-md w-full h-44 object-cover" src={course.thumbnail} alt="" />
      <h3 className="font-medium my-3">{course.title} {pathname.includes("courses") ? <button onClick={() => setOpen(true)} className='bg-primary p-2 rounded-md'>
        {course.type === 'online' ? 'Join Live' : course.type}</button> : null}  </h3>
      <p className='text-xs'>{course.about.substring(0, 50)}...</p>
      <div className='flex justify-between my-3'>
        <div>
          <p className='text-xs my-1'>Students {course.enrolledStudents.length}</p>
          {/* <div className='flex'>
            <img src="/images/user.png" className='w-5 h-5' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
          </div> */}
        </div>
        <div className='flex w-[70%] my-auto'>
          <p className='text-xs font-medium w-full'>Overall progress</p>
          <Progress percent={30} size="small" />

        </div>
      </div>
      <CourseDetails course={course} open={open} call={null} type='view' handleClick={() => setOpen(false)} />
    </div>
  );
};

export default CoursesCard;