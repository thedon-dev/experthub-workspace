import { CourseType } from '@/types/CourseType';
import React from 'react';

const EventsComp = ({ events }: { events: any }) => {
  return (
    <div className='p-6'>
      <div className='flex flex-wrap justify-between mt-3'>
        {events.map((event: CourseType) => <div className='w-[33%] my-3' key={event._id}>
          <div className='p-2 rounded-md bg-white'>
            <img className='rounded-md' src={event.thumbnail} alt="" />
          </div>
          <div>
            <p className='text-primary'>Course by {event.author}</p>
            <p className='text-xl font-medium'>{event.title}</p>
            <p className='text-sm'>{event.about.substring(0, 100)}</p>
            <div className='text-center my-3'>
              {event.type === "online" ? <button className='bg-primary p-2 w-44 text-white'>Join Live </button> : <button className='border border-[#1E1E1E] text-[#DC9F08] p-2 w-44 mx-auto'>View Details</button>}
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default EventsComp;