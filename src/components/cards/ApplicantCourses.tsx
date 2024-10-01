import React, { useState } from 'react';
import CourseDetails from '../modals/CourseDetails';
import { CourseType } from '@/types/CourseType';
import Link from 'next/link';
import ImageViewer from '../ImageViewer';
import AppointmentModal from '../modals/AppointmentModal';
import { useRouter } from 'next/navigation';
import { Dropdown, MenuProps, Progress } from 'antd';

const ApplicantCourses = ({ course }: { course: CourseType }) => {
  const [open, setOpen] = useState(false)
  const [appointment, setAppointment] = useState(false)
  const router = useRouter()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => setAppointment(true)} >Appointment</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => router.push(`/applicant/message?id=${course.instructorId}`)} >Send Message</p>
      ),
    },
  ]

  return (
    <div className=" lg:w-[32%] w-full my-3 ">
      <div className='flex my-2'>
        <img className='w-6 h-6 rounded-full' src={course.instructorImage || "/images/user.png"} alt="" />
        <p className='font-medium ml-3 text-sm'>A course by {course.instructorName}</p>
      </div>
      <div className='bg-white p-2 rounded-md'>
        <Link href={`/applicant/${course._id}?page=${course.type}`}>
          <ImageViewer image={course.thumbnail} />
          {/* <img className="rounded-md object-cover h-40 w-full" src={course.thumbnail} alt="" /> */}
        </Link>
      </div>
      <div className='p-2'>
        <div className='flex justify-between my-2 '>
          {course.startDate && <p className='text-xs text-[#DC9F08]'>Starts: {course.startDate}</p>}
          {course.startTime && <p className='text-xs text-[#0ACF83]'>Time: {course.startTime}</p>}
        </div>
        <h3 className="font-medium text-xl my-2">{course.title} {course.type === "onlibe" ? <button onClick={() => setOpen(true)} className='text-sm px-4 bg-primary p-1 rounded-md'>Join Live</button> : <button onClick={() => setOpen(true)} className='text-sm px-4 bg-primary p-1 rounded-md'>{course.type}</button>}
          <button className='my-auto'>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
            >
              <img className='w-4 h-4 rotate-90 my-auto cursor-pointer' src="/images/icons/edit-icon.svg" alt="" />
            </Dropdown>
          </button>
        </h3>
        <p className='text-xs'>{course.about.substring(0, 70)}...</p>
      </div>
      <div>
        <p className='text-xs my-1'>Students {course.enrolledStudents.length}</p>
        <div className='flex ml-1'>
          {course.enrolledStudents.slice(0, 6).map(course => <img key={course._id} src={course.profilePicture ? course.profilePicture : '/images/user.png'} className='w-5 rounded-full h-5 -ml-1' alt="" />)}
        </div>
      </div>
      <AppointmentModal open={appointment} handleClick={() => setAppointment(false)} to={course.instructorId} />
      <CourseDetails course={course} open={open} action={"Course"} call={null} type='view' handleClick={() => setOpen(false)} />
    </div>
  );
};

export default ApplicantCourses;