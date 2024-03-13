import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import CourseDetails from '../modals/CourseDetails';

const EventCard = ({ event }: { event: CourseType }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='lg:w-[33%] my-3'>
      <div className='p-2 rounded-md bg-white'>
        <img className='rounded-md' src={event.thumbnail} alt="" />
      </div>
      <div>
        <p className='text-primary'>Course by {event.author}</p>
        <p className='text-xl font-medium'>{event.title}</p>
        <p className='text-sm'>{event.about.substring(0, 100)}</p>
        <div className='text-center my-3'>
          {event.type === "online" ? <button onClick={() => setOpen(true)} className='bg-primary p-2 w-44 text-white'>Join Live </button> : <button onClick={() => setOpen(true)} className='border border-[#1E1E1E] text-[#DC9F08] p-2 w-44 mx-auto'>View Details</button>}
        </div>
      </div>
      <CourseDetails course={event} open={open} call={null} action={"Event"} type='view' handleClick={() => setOpen(false)} />
    </div>
  );
};

export default EventCard;