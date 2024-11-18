'use client'


import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import apiService from '@/utils/apiService';
import { useAppSelector } from '@/store/hooks';
const localizer = momentLocalizer(moment);
import { usePathname } from 'next/navigation'
import { addDays, isSameDay, isAfter } from "date-fns";
import AppointmentModal from '../modals/AppointmentModal';

const EventComponent = ({ event }: { event: any }) => (
  <span className='text-xm'>
    <strong className='capitalize'>{event.title}</strong>
    <br />
    {moment(event.start).format('hh:mm A')} - {moment(event.end).format('hh:mm A')}
  </span>
);

const CalendarComponent: React.FC = () => {
  const user = useAppSelector((state) => state.value);
  const [events, setEvents] = useState<BigCalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<any>("month");
  const pathname = usePathname()
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    if (selectedEvent) {
      apiService.get(`/appointment/single/${selectedEvent.id}`).then(function (response) {
        console.log(response)
        setData(response.data.appointment)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [selectedEvent])

  const splitEventIntoDays = (event: any) => {
    const { id, title, start, end } = event;
    const events = [];
    let currentDate = new Date(start);

    while (!isAfter(currentDate, new Date(end))) {
      events.push({
        id,
        title,
        start: new Date(currentDate),
        end: new Date(currentDate), // Use the same date to make it a single-day event
      });
      currentDate = addDays(currentDate, 1); // Move to the next day
    }

    return events;
  };

  const preprocessEvents = (events: any[]) => {
    return events.flatMap(event => {
      if (isSameDay(event.start, event.end)) {
        return event; // Single-day events remain unchanged
      }
      return splitEventIntoDays(event); // Multi-day events are split
    });
  };


  useEffect(() => {
    const fetchEvents = async () => {
      let formattedEvents: any[] = [];

      try {
        const [appointmentsResponse, coursesResponse, tutorResponse, events] = await Promise.all([
          apiService
            .get(`/appointment/${user.id}`)
            .catch(error => {
              console.error("Error fetching appointments:", error);
              return { data: { appointment: [] } }; // Fallback to empty array
            }),
          apiService
            .get(`courses/enrolled-courses/${user.id}`)
            .catch(error => {
              console.error("Error fetching enrolled courses:", error);
              return { data: { enrolledCourses: [] } }; // Fallback to empty array
            }),
          apiService
            .put(`courses/category/author`, {
              category: user.assignedCourse,
              id: user.id,
            })
            .catch(error => {
              console.error("Error updating course category:", error);
              return { data: { enrolledCourses: [] } }; // Fallback to empty array
            }),
          apiService
            .get(`events/my-events/${user.id}`)
            .catch(error => {
              console.error("Error fetching events:", error);
              return { data: { enrolledCourses: [] } }; // Fallback to empty array
            }),
        ]);

        // Process appointments
        const appointments = appointmentsResponse.data.appointment.map((event: any) => ({
          id: event._id,
          title: `${event.category} with ${event.from?.fullname}`,
          start: new Date(event.date),
          end: new Date(event.date),
          description: event.reason,
          type: 'appointment'
        }));

        // Process enrolled courses
        let enrolledCourses: any
        if (pathname.includes('applicant')) {
          enrolledCourses = coursesResponse.data.enrolledCourses
            .filter((event: any) => event.type === 'online' || event.type === 'offline')
            .map((event: any) => ({
              id: event._id,
              title: event.title,
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              description: event.about,
              type: 'course'
            }));
        } else {
          enrolledCourses = tutorResponse.data.enrolledCourses
            .filter((event: any) => event.type === 'online' || event.type === 'offline')
            .map((event: any) => ({
              id: event._id,
              title: event.title,
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              description: event.about,
              type: 'course'
            }));
        }
        const enrolledevents = events.data.enrolledCourses
          .filter((event: any) => event.type === 'online' || event.type === 'offline')
          .map((event: any) => ({
            id: event._id,
            title: event.title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            description: event.about,
            type: 'event'
          }));


        // Combine events into one array
        formattedEvents = [...appointments, ...enrolledCourses, ...enrolledevents];

        console.log(formattedEvents)
        const processedEvents = preprocessEvents(formattedEvents);
        setEvents(processedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [currentDate]);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setOpen(true)
  };

  return (
    <div className="h-screen p-2">
      <h2 className="text-xl font-bold mb-4">My Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        onNavigate={(date: React.SetStateAction<Date>) => setCurrentDate(date)} // Update state on navigation
        date={currentDate}
        view={view}
        onView={(newView: React.SetStateAction<string>) => setView(newView)}
        endAccessor="end"
        style={{ height: '80vh' }}
        className="bg-white shadow-lg rounded-lg"
        components={{
          event: EventComponent,
        }}
        onSelectEvent={handleSelectEvent}
      />

      {open && <div>
        <div onClick={() => setOpen(false)} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
        <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[30%] w-[90%] overflow-y-scroll mx-auto z-20 bg-[#F8F7F4]'>
          <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
            <p className='font-medium capitalize'>{selectedEvent.type}</p>
            <img onClick={() => setOpen(false)} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
          </div>
          <div className='lg:p-8 p-4'>
            {selectedEvent && (
              <div className="bg-white p-4">
                <h2 className="text-lg capitalize font-bold">{selectedEvent.title}</h2>
                <p>
                  <strong>Start:</strong>{' '}
                  {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm A')}
                </p>
                <p>
                  <strong>End:</strong>{' '}
                  {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm A')}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
              </div>
            )}
          </div>
          <div className='text-center'>
            {selectedEvent.type === 'appointment' && <button onClick={() => { setShow(true); setOpen(false) }} className='bg-primary p-3 w-44 mx-auto'>Edit</button>}
          </div>
        </div>
      </div>}
      <AppointmentModal open={show} handleClick={() => { setShow(false) }} data={data} />

    </div >
  );
};

export default CalendarComponent;
