import { CourseType } from '@/types/CourseType';
import React, { useState } from 'react';
import EventCard from './cards/EventCard';

const EventsComp = ({ events, action }: { events: any, action: any }) => {

  return (
    <div className='p-6'>
      <div className='flex flex-wrap justify-between mt-3'>
        {events.map((event: CourseType) => <EventCard action={action} event={event} key={event._id} />)}
      </div>
    </div>
  );
};

export default EventsComp;