import React, { useState } from 'react';
import CourseDetails from '../modals/CourseDetails';
import { CourseType } from '@/types/CourseType';
import Link from 'next/link';

const ApplicantCourses = ({ course }: { course: CourseType }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className=" lg:w-[32%] w-full my-3 ">
      <div className='flex my-2'>
        <img className='w-6 h-6 rounded-full' src={course.instructorImage || "/images/user.png"} alt="" />
        <p className='font-medium ml-3 text-sm'>A course by {course.instructorName}</p>
      </div>
      <div className='bg-white p-2 rounded-md'>
        <Link href={`/applicant/${course.type}?page=${course._id}`}>
          <img className="rounded-md object-cover h-40 w-full" src={course.thumbnail} alt="" />
        </Link>
      </div>
      <div className='p-2'>
        <div className='flex justify-between my-2 '>
          {course.startDate && <p className='text-xs text-[#DC9F08]'>Starts: {course.startDate}</p>}
          {course.startTime && <p className='text-xs text-[#0ACF83]'>Time: {course.startTime}</p>}
        </div>
        <h3 className="font-medium text-xl my-2">{course.title} <button onClick={() => setOpen(true)} className='text-sm px-4 bg-primary p-1 rounded-md'>{course.type}</button></h3>
        <p className='text-xs'>{course.about.substring(0, 70)}...</p>
      </div>
      <CourseDetails course={course} open={open} call={null} type='view' handleClick={() => setOpen(false)} />
    </div>
  );
};

export default ApplicantCourses;