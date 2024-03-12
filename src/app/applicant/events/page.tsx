"use client"

import DashboardLayout from '@/components/DashboardLayout';
import EventsComp from '@/components/EventsComp';
import { useAppSelector } from '@/store/hooks';
import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Events = () => {
  const user = useAppSelector((state) => state.value);
  const [active, setActive] = useState("all")
  const [events, setEvents] = useState<CourseType[]>([])
  const [myEvent, setMyEvent] = useState<CourseType[]>([])
  const [pastEvent, setPastEvent] = useState<CourseType[]>([])

  const getAllEvents = () => {
    axios.put(`events/category/${user.assignedCourse}`)
      .then(function (response) {
        setEvents(response.data.events)
        console.log(response.data)
      })
  }

  const getMyEvents = () => {
    const all: CourseType[] = []
    events.map((event) => {
      if (event.enrolledStudents.includes(user.id)) {
        all.push(event)
      }
    })
    setMyEvent(all)
  }



  const getPastEvent = () => {
    const all: CourseType[] = []

    events.map((event) => {
      const currentDate = new Date();
      const compareDate = new Date(event.startDate);

      // Compare the target date with the current date
      if (currentDate > compareDate) {
        all.push(event)
      }
    })
    setPastEvent(all)
  }

  useEffect(() => {
    getAllEvents()
    getMyEvents()
    getPastEvent()
  }, [])
  return (
    <DashboardLayout>
      <div className='flex px-4 justify-between w-[30%] text-lg'>
        <div onClick={() => setActive("all")} className={active === "all" ? 'border-b-2 border-primary' : 'cursor-pointer'}>All</div>
        <div onClick={() => setActive("my")} className={active === 'my' ? "border-b-2 border-primary" : "cursor-pointer"}>My Events</div>
        <div onClick={() => setActive("past")} className={active === 'past' ? "border-b-2 border-primary" : "cursor-pointer"}>Past Events</div>
        {/* <div>ALl</div> */}

      </div>
      <div className='p-6'>

        {(() => {
          switch (active) {
            case 'all':
              return <div className='flex flex-wrap justify-between mt-3'>
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
            case 'my':
              return <div className='flex flex-wrap justify-between mt-3'>
                {myEvent.map((event: CourseType) => <div className='w-[33%] my-3' key={event._id}>
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
            case 'past':
              return <div className='flex flex-wrap justify-between mt-3'>
                {pastEvent.map((event: CourseType) => <div className='w-[33%] my-3' key={event._id}>
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
            case 'lost':
              return <div></div>
            default:
              return null
          }
        })()}
      </div>
      {/* <EventsComp events={events} /> */}
    </DashboardLayout>
  );
};

export default Events;