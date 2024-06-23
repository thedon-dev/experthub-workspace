import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import CourseDetails from '../modals/CourseDetails';
import { Dropdown, MenuProps, Progress, notification } from 'antd';
import Share from '../Share';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddEvents from '../modals/AddEvents';
import axios from 'axios';
import ImageViewer from '../ImageViewer';

const EventCard = ({ event, action }: { event: CourseType, action: any }) => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [deletec, setDelete] = useState(false)
  const [view, setView] = useState(false)
  const pathname = usePathname()
  const [api, contextHolder] = notification.useNotification();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => setEdit(true)} >Edit Event</p>
      ),
    },
    {
      key: '2',
      label: (
        <p onClick={() => setDelete(true)}>Delete Event</p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => setView(true)}>View Participants</p>
      ),
    },
    {
      key: '4',
      label: (
        <Share type='event' course={event} />
      ),
    },
  ];

  const deleteCourse = async () => {
    axios.delete(`/events/delete/${event._id}`)
      .then(function (response) {
        // getCourse()
        action()
        api.open({
          message: 'Event Deleted Successfully!'
        });
        setDelete(false)
        console.log(response)
      })
  }

  function calculateProgress(enrolled: number, target: number) {
    return (enrolled / target) * 100;
  }

  const sendReminder = (id: any) => {
    axios.post(`/events/reminder`, {
      userId: id,
      event: event.title
    })
      .then(function (response) {
        api.open({
          message: 'Reminder Sent Successfully!'
        });
        console.log(response)
      })
  }

  return (
    <div className='lg:w-[32%] my-3'>
      {contextHolder}
      <div className='p-2 rounded-md bg-white'>
        <ImageViewer image={event.thumbnail} />
        {/* <img className='rounded-md h-44 object-cover w-full' src={event.thumbnail} alt="" /> */}
      </div>
      <div>
        {/* <p className='text-primary'>Course by {event.author}</p> */}
        <div className='flex flex-wrap'> <p className='text-xl font-medium'>{event.title}</p>
          <Link href={pathname.includes("admin") ? `/admin/${event._id}?page=event` : `/tutor/${event._id}?page=event`}><button className='bg-primary ml-3 text-sm p-1 rounded-md'>{event.mode}</button></Link>
        </div>
        <p className='text-sm'>{event.about.substring(0, 100)}</p>
        <div className='flex justify-between my-3'>
          <div>
            <p className='text-xs my-1'>Students {event.enrolledStudents.length}</p>
            <div className='flex ml-1'>
              {event.enrolledStudents.slice(0, 6).map(event => <img key={event._id} src={event.profilePicture} className='w-5 rounded-full h-5 -ml-1' alt="" />)}
              {/* <img src="/images/user.png" className='w-5 h-5' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" />
            <img src="/images/user.png" className='w-5 h-5 -ml-2' alt="" /> */}
            </div>
          </div>
          <div className='w-[70%] '>
            <div className='ml-auto text-right'>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <button className='bg-transparent'>
                  <img className='w-4 h-4' src="/images/icons/edit.svg" alt="" />
                </button>
              </Dropdown>
            </div>
            <div className='flex my-auto'>
              <p className='text-xs font-medium w-full'>Overall progress</p>
              <Progress percent={parseInt(calculateProgress(event.enrolledStudents.length, event.target).toFixed())} size="small" />
            </div>
          </div>
        </div>
        <div className='text-center my-3'>
          {event.type === "online" ? <button onClick={() => setOpen(true)} className='bg-primary p-2 w-44 text-white'>Join Live </button> : <button onClick={() => setOpen(true)} className='border border-[#1E1E1E] text-[#DC9F08] p-2 w-44 mx-auto'>View Details</button>}
        </div>
      </div>
      <CourseDetails course={event} open={open} call={null} action={"Event"} type='view' handleClick={() => setOpen(false)} />
      <AddEvents open={edit} course={event} handleClick={() => setEdit(false)} />
      {
        deletec && <div>
          <div onClick={() => setDelete(false)} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
          <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[30%] w-[90%] h-[50%] mx-auto z-20 bg-[#F8F7F4]'>
            <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
              <p className='font-medium'></p>
              <img onClick={() => setDelete(false)} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
            </div>
            <div className='lg:p-10 p-4 text-center'>
              <h1 className='text-2xl'>Are you sure you want to delete this event?</h1>
              <div>
                <div className='flex my-4 justify-center'>
                  <button onClick={() => deleteCourse()} className='mx-4 bg-primary p-2 rounded-md'>Delete</button>
                  <button onClick={() => setDelete(false)} className='mx-4'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {
        view && <div>
          <div onClick={() => setDelete(false)} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
          <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[60%] w-[90%] h-[90%] overflow-y-auto mx-auto z-20 bg-[#F8F7F4]'>
            <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
              <p className='font-medium'>View list of all Participants </p>
              <img onClick={() => setView(false)} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
            </div>
            <div className='lg:p-10 p-4'>
              <input type="text" className='border w-full mb-3 p-2 rounded-md' placeholder='Search' />
              <div className='flex mb-6'>
                <div className='flex text-[#F7A60F]'>
                  <input type="radio" className='mr-2' />
                  <p className='text-xl'>Select all</p>
                </div>
                <p className='text-[#F7A60F] text-xl ml-10 '>Send Reminder</p>
              </div>
              {event.enrolledStudents.map(student => <div className='flex my-3 justify-between'>
                <div className='flex'>
                  <input type="radio" className='mr-2' />
                  <img src={student.profilePicture} className='w-12 h-12 rounded-full' alt="" />
                  <p className='ml-4 my-auto lg:text-xl  font-medium capitalize'>{student.fullname}</p>
                </div>
                <button onClick={() => sendReminder(student._id)} className='border my-auto lg:w-44 sm:text-xs rounded-full text-primary p-2 px-3'>Send Reminder</button>
              </div>)}
              {/* <div>
                <div className='flex my-4 justify-center'>
                  <button onClick={() => deleteCourse()} className='mx-4 bg-primary p-2 rounded-md'>Delete</button>
                  <button onClick={() => setDelete(false)} className='mx-4'>Cancel</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default EventCard;