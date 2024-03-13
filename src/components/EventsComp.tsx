import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import EventCard from './cards/EventCard';

const EventsComp = ({ events }: { events: any }) => {

  return (
    <div className='p-6'>
      <div className='flex flex-wrap justify-between mt-3'>
        {events.map((event: CourseType) => <EventCard event={event} key={event._id} />)}
      </div>
    </div>
  );
};

export default EventsComp;