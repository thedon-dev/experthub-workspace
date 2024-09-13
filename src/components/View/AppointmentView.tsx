'use client'

import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';
import React, { useEffect, useState } from 'react';

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([])
  const user = useAppSelector((state) => state.value);

  const getAppointments = () => {
    apiService.get(`/appointment/${user.id}`)
      .then(function (response) {
        console.log(response.data)
        setAppointments(response.data.appointment)
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getAppointments()
  }, [])
  return (
    <div className='px-4 flex flex-wrap justify-between'>
      {appointments ? appointments.map((appointment: any) => <div key={appointment._id} className='p-3 border w-[32%] rounded-md'>
        <div className='flex'>
          {appointment.from._id === user.id ? <>
            <img className='w-10 mr-2 h-10 rounded-full object-cover' src={appointment.to.profilePicture ? appointment.to.profilePicture : "/images/user.png"} alt="" />
            <p className='my-auto font-medium text-lg'>{appointment.to.fullname}</p>
          </> : <>
            <img className='w-10 mr-2 h-10 rounded-full object-cover' src={appointment.from.profilePicture ? appointment.from.profilePicture : "/images/user.png"} alt="" />
            <p className='my-auto font-medium text-lg'>{appointment.from.fullname}</p>
          </>}
        </div>
        <p className='my-2'>{appointment.reason}</p>
        <div>
          <p>Mode: {appointment.mode}</p>

          <p>Category: {appointment.category}</p>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <p>Location: {appointment.location}</p>
          <p>Room: {appointment.room}</p>
        </div>

      </div>) : <p>No active appointments!</p>}
    </div>
  );
};

export default AppointmentView;