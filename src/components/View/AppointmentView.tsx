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
  const deleteAppointment = () => {
    apiService.delete(`/appointment/delete/${user.id}`)
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
      <div className='px-4 flex flex-wrap justify-between'>

        {appointments.length >= 1 ? appointments.map((appointment: any) => <div key={appointment._id} className='p-3 my-3 border w-[32%] rounded-md'>
          <div className='flex'>
            {appointment.from._id === user.id ? <>
              <img className='w-10 mr-2 h-10 rounded-full object-cover' src={appointment.to.profilePicture ? appointment.to.profilePicture : "/images/user.png"} alt="" />
              <p className='my-auto font-medium text-lg'>{appointment.to.fullname}</p>
            </> : <>
              <img className='w-10 mr-2 h-10 rounded-full object-cover' src={appointment.from.profilePicture ? appointment.from.profilePicture : "/images/user.png"} alt="" />
              <p className='my-auto font-medium text-lg'>{appointment.from.fullname}</p>
            </>}
          </div>
          <p className='my-2 '>{appointment.reason}</p>
          <div>
            <p>Mode: {appointment.mode}</p>

            <p>Category: {appointment.category}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            {appointment.mode === 'in person' && <>
              <p>Location: {appointment.location}</p>
              <p>Room: {appointment.room}</p>
            </>}
          </div>
          <div className='flex justify-between'>

            {appointment.from._id === user.id && <>
              <button onClick={() => setOpen(true)} className='bg-primary p-2 px-4 rounded-md mt-4'>
                Edit
              </button>
              <button onClick={() => deleteAppointment()} className='bg-[#FF0000] text-white p-2 px-4 rounded-md mt-4'>
                Delete
              </button>
            </>}
            {appointment.mode === 'online' && <JoinMeeting appointment={appointment} />}
          </div>

          <AppointmentModal open={open} handleClick={() => { setOpen(false), getAppointments() }} to={appointment.to._id} data={appointment} />
        </div>) : <p>No active appointments!</p>}
      </div>
    </>

  );
};

export default AppointmentView;