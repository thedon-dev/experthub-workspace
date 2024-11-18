'use client'

import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';
import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import AppointmentModal from '../modals/AppointmentModal';
import JoinMeeting from '../JoinMeeting'

const AppointmentView = () => {
  const [appointments, setAppointments] = useState([])
  const user = useAppSelector((state) => state.value);
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false)

  const getAppointments = () => {
    apiService.get(`/appointment/${user.id}`)
      .then(function (response) {
        // console.log(response.data)
        setAppointments(response.data.appointment)
      }).catch(error => {
        console.log(error)
      })
  }
  const deleteAppointment = (id: any) => {
    apiService.delete(`/appointment/delete/${id}`)
      .then(function (response) {
        console.log(response.data)
        getAppointments()
        api.open({
          message: "Appointment succesfully deleted!",
        });
        getAppointments()
      }).catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    getAppointments()
  }, [])
  return (
    <>
      {contextHolder}
      <div className='px-4 lg:flex flex-wrap justify-between'>

        {appointments.length >= 1 ? appointments.map((appointment: any) => <div key={appointment._id} className='p-3 my-3 border lg:w-[32%] rounded-md'>
          <div>
            <div className='flex justify-between ml-auto w-20 mb-6'>
              {appointment.from?._id === user.id && <>
                <button onClick={() => setOpen(true)} className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </button>
                <button onClick={() => deleteAppointment(appointment._id)} className=''>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </button>
              </>}
            </div>
          </div>
          <div className='flex'>
            {appointment.from?._id === user.id ? <>
              <img className='w-10 mr-2 h-10 rounded-full object-cover' src={appointment.to.profilePicture ? appointment.to.profilePicture : "/images/user.png"} alt="" />
              <p className='my-auto font-medium text-lg'>{appointment.to.fullname}</p>
            </> : <>
              <img className='w-10 mr-2 h-10 rounded-full object-cover' src={appointment.from?.profilePicture ? appointment.from?.profilePicture : "/images/user.png"} alt="" />
              <p className='my-auto font-medium text-lg'>{appointment.from?.fullname}</p>
            </>}
          </div>
          <p className='my-2 '>{appointment.reason}</p>
          <div>
            <p>Mode: {appointment.mode}</p>

            <p>Category: {appointment.category}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            {appointment.mode === 'phone' && <p>Phone: {appointment.phone}</p>}
            {appointment.mode === 'in person' && <>
              <p>Location: {appointment.location}</p>
              <p>Room: {appointment.room}</p>
            </>}
          </div>
          {appointment.mode === 'online' && <JoinMeeting appointment={appointment} />}
          <AppointmentModal open={open} handleClick={() => { setOpen(false), getAppointments() }} to={appointment.to._id} data={appointment} />
        </div>) : <p>No active appointments!</p>}
      </div>
    </>

  );
};

export default AppointmentView;