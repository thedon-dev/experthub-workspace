import React, { useState } from 'react';
import { Dropdown, MenuProps, Progress } from 'antd';
import { usePathname } from 'next/navigation';
import CourseDetails from '../modals/CourseDetails';
import AddCourse from '../modals/AddCourse';
import axios from 'axios';
import { CourseType } from '@/types/CourseType';
import Share from '../Share';

const CoursesCard = ({ course, getCourse }: { course: CourseType, getCourse: () => Promise<void> }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => setEdit(true)} >Edit course</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => deleteCourse()}>Delete course</p>
      ),
    },
    {
      key: '3',
      label: (
        <Share course={course} />
      ),
    },
  ];

  const deleteCourse = async () => {
    axios.delete(`/courses/delete/${course._id}`)
      .then(function (response) {
        getCourse()
        console.log(response)
      })
  }

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
        <div className='w-[70%] '>
          <div className='ml-auto text-right'>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button className='bg-transparent'>
                <img className='w-4 h-4' src="/images/icons/edit.svg" alt="" />
              </button>
            </Dropdown>
          </div>
          {/* <div className='flex my-auto'>
            <p className='text-xs font-medium w-full'>Overall progress</p>
            <Progress percent={30} size="small" />
          </div> */}
        </div>
      </div>
      <CourseDetails course={course} open={open} call={null} type='view' handleClick={() => setOpen(false)} />
      <AddCourse course={course} open={edit} handleClick={() => setEdit(false)} />
    </div>
  );
};

export default CoursesCard;