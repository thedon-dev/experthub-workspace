'use client'


import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import apiService from '@/utils/apiService';
import { useAppSelector } from '@/store/hooks';

const localizer = momentLocalizer(moment);


const CalendarComponent: React.FC = () => {
  const user = useAppSelector((state) => state.value);
  const [events, setEvents] = useState<BigCalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<any>("month");

  useEffect(() => {
    const fetchEvents = async () => {
      let formattedEvents: any[] = [];

      try {
        const [appointmentsResponse, coursesResponse] = await Promise.all([
          apiService.get(`/appointment/${user.id}`),
          apiService.get(`courses/enrolled-courses/${user.id}`)
        ]);

        // Process appointments
        const appointments = appointmentsResponse.data.appointment.map((event: any) => ({
          id: event._id,
          title: `${event.category} ${event.reason}`,
          start: new Date(event.date),
          end: new Date(event.date),
        }));

        // Process enrolled courses
        const enrolledCourses = coursesResponse.data.enrolledCourses
          .filter((event: any) => event.type === 'online' || event.type === 'offline')
          .map((event: any) => ({
            id: event._id,
            title: event.title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
          }));

        // Combine events into one array
        formattedEvents = [...appointments, ...enrolledCourses];

        console.log(formattedEvents)
        setEvents(formattedEvents);

      } catch (error) {
        console.error("Error fetching events:", error);
      }
      // await apiService.get(`events/my-events/${user.id}`)
      //   .then(function (response) {
      //     console.log(response.data)
      // formattedEvents = response.data.enrolledCourses
      //   .filter((event: any) => event.type === 'online' || event.type === 'offline')
      //   .map((event: any) => ({
      //     id: event._id,
      //     title: event.title,
      //     start: new Date(event.startDate),
      //     end: new Date(event.endDate),
      //   }));
      // }).catch(error => {
      //   console.log(error)
      // })
    };
    fetchEvents();
  }, [currentDate]);

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
      />
    </div>
  );
};

export default CalendarComponent;
