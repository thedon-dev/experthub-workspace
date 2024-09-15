import React, { useState } from 'react';
import { notification } from 'antd';
import { useAppSelector } from '@/store/hooks';
import apiService from '@/utils/apiService';

const Availability = ({ open, handleClick }: { open: boolean, handleClick: any }) => {
  const [steps, setSteps] = useState(0)
  const [api, contextHolder] = notification.useNotification();
  const user = useAppSelector((state) => state.value);
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState([{
    day: "Monday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Tuesday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Wednesday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Thursday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Friday",
    startTime: "",
    endTime: "",
    checked: false
  },
  {
    day: "Saturday",
    startTime: "",
    endTime: "",
    checked: false
  }])

  const updateAvailability = () => {
    setLoading(true)
    apiService.post(`/appointment/user/${user.id}`, {

    }).then(function (response) {
      api.open({
        message: "Availability succesfully saved!",
      });
      console.log(response.data)
      handleClick()
      setLoading(false)
    }).catch(error => {
      console.log(error)
      setLoading(false)
      api.open({
        message: error.response.data.message
      });
    })
  }

  const handleDaysInputChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedObjects = [...days];
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setDays(updatedObjects);
  };

  return (
    open ? <div>
      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 overflow-y-auto rounded-md right-0 lg:w-[70%] w-[95%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
          <div className='flex w-[40%] justify-between'>
            <p className={steps === 0 ? 'font-medium border-b border-[#DC9F08] pb-2' : 'font-medium'}>Mode of Appointment</p>
            <p className={steps === 1 ? 'font-medium border-b border-[#DC9F08] pb-2' : 'font-medium'}>Available Time</p>
          </div>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='w-1/2 mx-auto mt-10'>
          {contextHolder}
          {(() => {
            switch (steps) {
              case 0:
                return <div>
                  <p>How will you want to cont. Setting your mode of Appointment will enable your client reach
                    out to you either via online, by phone call or to your address</p>
                  <div className='mt-8'>
                    <p>How many hours can you commit to your training a week?</p>
                    <div className='flex my-3'>
                      <input type="radio" />
                      <p className='ml-2'>Online</p>
                    </div>
                    <div className='flex my-3'>
                      <input type="radio" />
                      <p className='ml-2'>In Person</p>
                    </div>
                    <div className='flex my-3'>
                      <input type="radio" />
                      <p className='ml-2'>Phone</p>
                    </div>
                  </div>
                  <div className='flex justify-evenly w-44 mx-auto mt-6'>
                    <button onClick={() => setSteps(1)} className='bg-[#FDC332] p-3 rounded-md px-6'>Next</button>
                    <button>Cancel</button>
                  </div>
                </div>
              case 1:
                return <div>
                  <p>Select Appointment day and time</p>
                  {days.map((day: { checked: boolean | undefined; day: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; startTime: string | number | readonly string[] | undefined; endTime: string | number | readonly string[] | undefined; }, index: any) => <div key={index} className='flex justify-between my-1'>
                    <input onChange={e => handleDaysInputChange(index, 'checked', e.target.checked)} checked={day.checked} type="checkbox" />
                    <p className='w-24 my-auto'>{day.day}</p>
                    <input value={day.startTime} onChange={e => handleDaysInputChange(index, 'startTime', e.target.value)} className={day.checked === true && day.startTime === "" ? 'py-1 px-2 border border-[#FF0000] rounded-sm' : 'py-1 px-2 rounded-sm'} type="time" />
                    <p className='my-auto'>-</p>
                    <input value={day.endTime} onChange={e => handleDaysInputChange(index, 'endTime', e.target.value)} className={day.checked === true && day.endTime === "" ? 'py-1 px-2 border border-[#FF0000] rounded-sm' : 'py-1 px-2 rounded-sm'} type="time" />
                  </div>)}
                  <div className='flex justify-evenly mx-auto mt-6'>
                    <button onClick={() => updateAvailability()} className='bg-[#FDC332] p-3 rounded-md px-6'>{loading ? 'loading...' : 'Save'}</button>
                    <button>Cancel</button>
                  </div>
                </div>
            }
          })()}
        </div>
      </div>
    </div> : null
  );
}

export default Availability;