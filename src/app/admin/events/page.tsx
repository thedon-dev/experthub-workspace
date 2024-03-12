"use client"


import DashboardLayout from '@/components/DashboardLayout';
import EventsComp from '@/components/EventsComp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([])

  const getAllEvents = () => {
    axios.get("events/all")
      .then(function (response) {
        setEvents(response.data.events)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <DashboardLayout>
      <div className='p-6'>
        <p className='text-xl'>Events</p>
      </div>
      <EventsComp events={events} />
    </DashboardLayout>
  );
};

export default Events;