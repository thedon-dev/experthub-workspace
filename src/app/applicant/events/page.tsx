"use client"

import DashboardLayout from '@/components/DashboardLayout';
import EventsComp from '@/components/EventsComp';
import UserEvent from '@/components/cards/UserEvent';
import { useAppSelector } from '@/store/hooks';
import { CourseType } from '@/types/CourseType';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Events = () => {
  const user = useAppSelector((state) => state.value);
  const [active, setActive] = useState("all")
  const [events, setEvents] = useState<CourseType[]>([])
  const [all, setAll] = useState<CourseType[]>([])
  const [myEvent, setMyEvent] = useState<CourseType[]>([])
  const [pastEvent, setPastEvent] = useState<CourseType[]>([])

  const getAllEvents = () => {
    axios.put(`events/category`, {
      category: user.assignedCourse
    })
      .then(function (response) {
        setEvents(response.data.events)
        const all: CourseType[] = []
        const enrolled: CourseType[] = []
        const notEnrolled: React.SetStateAction<CourseType[]> = []
        response.data.events.map((course: CourseType) => {
          if (hasDatePassed(course)) {
            all.push(course)
          }
          if (course.enrolledStudents.includes(user.id)) {
            enrolled.push(course)
          } else {
            notEnrolled.push(course)
          }
        })
        setPastEvent(all)
        setMyEvent(enrolled)
        setAll(notEnrolled)
        // console.log(response.data)
      })
  }


  function hasDatePassed(course: CourseType) {
    if (course.type === "online" || course.type === "offline") {
      const currentDate = new Date();
      const compareDate = new Date(course.startDate);
      // console.log(currentDate, compareDate)

      // Compare the target date with the current date
      if (currentDate > compareDate) {
        return true
      }
      return false;
    }
    return true
  }

  useEffect(() => {
    getAllEvents()
  }, [])
  return (
    <DashboardLayout>
      <div className='flex px-4 justify-between w-[40%] text-lg'>
        <div onClick={() => setActive("all")} className={active === "all" ? 'border-b-2 border-primary' : 'cursor-pointer'}>Recommended for you</div>
        <div onClick={() => setActive("my")} className={active === 'my' ? "border-b-2 border-primary" : "cursor-pointer"}>My Events</div>
        {/* <div onClick={() => setActive("past")} className={active === 'past' ? "border-b-2 border-primary" : "cursor-pointer"}>Past Events</div> */}
        {/* <div>ALl</div> */}

      </div>
      <div className='p-6'>

        {(() => {
          switch (active) {
            case 'all':
              return <div className='flex flex-wrap justify-between mt-3'>
                {all.map((event: CourseType) => <UserEvent type="enroll" key={event._id} event={event} />)}
              </div>
            case 'my':
              return <div className='flex flex-wrap justify-between mt-3'>
                {myEvent.map((event: CourseType) => <UserEvent key={event._id} event={event} />)}
              </div>
            case 'past':
              return <div className='flex flex-wrap justify-between mt-3'>
                {pastEvent.map((event: CourseType) => <UserEvent key={event._id} event={event} />)}
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