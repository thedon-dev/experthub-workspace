import { CourseType } from '@/types/CourseType';
import ZoomMeeting from '../ZoomMeeting';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useAppSelector } from '@/store/hooks';
import { notification } from 'antd';
import axios from 'axios';
import { useState } from "react"

const CourseDetails = ({ open, handleClick, course, type, call, action }) => {
  const user = useAppSelector((state) => state.value);
  const [joinMeeting, setJoinMeeting] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter()

  const enroll = () => {
    try {
      axios.post(`courses/enroll/${course._id}`, {
        id: user.id
      })
        .then(function (response) {
          console.log(response.data)
          call()
          api.open({
            message: 'Enrolled Successfully'
          });
          handleClick()
        })
        .catch(err => {
          api.open({
            message: err.response.data.message
          });
          // console.log(err.response.data.message)
        })
    } catch (e) {
      // console.log(e.response.data.message)
    }
  }


  const enrollEvent = () => {
    try {
      axios.put(`events/enroll/${course._id}`, {
        id: user.id
      })
        .then(function (response) {
          console.log(response)
          api.open({
            message: response.data.message,
          });
          handleClick()
        })
        .catch(err => {
          api.open({
            message: err.response.data.message
          });
          console.log(err.response.data.message)
        })
    } catch (e) {
      // console.log(e.response.data.message)
    }
  }

  const checkTyoe = () => {
    if (action === "Event") {
      enrollEvent()
    } else (
      enroll()
    )
  }

  const config = {
    public_key: 'FLWPUBK_TEST-6330f5c973d7919b3b553f52d5a82098-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      // phone_number: '070********',
      name: user.fullName,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  function insertAtIndex(str, index) {
    // console.log(str.slice(0, index) + `f_auto/fl_attachment:${course.title}/` + str.slice(index))
    return str.slice(0, index) + `fl_attachment/` + str.slice(index);
  }

  const isToday = () => {
    let currentDate = new Date();

    var desiredDateString = course.startDate;
    var desiredDate = new Date(desiredDateString);
    if (
      currentDate.getFullYear() === desiredDate.getFullYear() &&
      currentDate.getMonth() === desiredDate.getMonth() &&
      currentDate.getDate() === desiredDate.getDate()
    ) {
      return true
    }
    return false
  }


  return (
    <>
      {open && <div>
        {contextHolder}
        <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-40'></div>

        <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[80%] overflow-y-auto w-[95%] mx-auto z-50 bg-[#F8F7F4]'>
          <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]  p-4 lg:px-12 flex justify-between'>
            <p className='font-medium capitalize'>{action} Details</p>
            <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
          </div>
          <div className='py-4 lg:px-10 px-4'>
            <div className='lg:flex justify-between'>
              <div className='lg:w-[40%]'>
                <img src={course.thumbnail} className='w-full h-52 object-cover' alt="" />
                <div className='p-4'>
                  <p className='font-medium text-base'>{course.title}</p>
                  <div className='my-4'>
                    <p className='font-medium'>The course includes</p>
                    <div className='flex my-1'>
                      <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                      <p className='text-sm'>Learning hours</p>
                    </div>
                    <div className='flex my-1'>
                      <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                      <p className='text-sm'>Course modules/assesments</p>
                    </div>
                    <div className='flex my-1'>
                      <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                      <p className='text-sm'>Certificate of completion</p>
                    </div>
                  </div>
                  {
                    type === "view" ? course.type === "online" ? isToday() ? <button onClick={() => setJoinMeeting(true)} className='bg-primary p-2 my-3 rounded-md px-8'>Join Live</button> : null : user.role !== 'student' ? <button onClick={() => router.push(`/${user.role}/${course._id}?page=${course.type}`)} className='bg-primary p-2 my-3 rounded-md px-8'>{course.type}</button> : <button onClick={() => router.push(`/applicant/${course._id}?page=${course.type}`)} className='bg-primary p-2 my-3 rounded-md px-8'>{course.type}</button>
                      : <button onClick={() => {
                        course.fee === 0 ? checkTyoe() : handleFlutterPayment({
                          callback: (response) => {
                            if (action === "Event") {
                              enrollEvent()
                            } else {
                              enroll()
                            }
                            console.log(response);
                            closePaymentModal() // this will close the modal programmatically
                          },
                          onClose: () => {
                            console.log("closed")
                          },
                        })
                      }} className='bg-primary p-2 my-3 rounded-md px-8'>{course.type === "pdf" ? "Buy Now" : "Enroll Now"}</button>
                  }
                </div>
                {course.type === "offline" ? <div className='text-sm'>
                  <p><span className='font-bold'>Location:</span> {course.location}</p>
                  <p> <span className='font-bold'>Room:</span> {course.room}</p>
                </div> : null}
              </div>
              <div className='lg:w-[58%]'>
                <p className='text-lg font-bold'>{course.title}</p>
                {/* <p className='my-2 text-sm font-medium'>This great online course will equip you with the knowledge and basic skills
                needed to design vector graphics using Figma.</p> */}
                <p className='text-sm'>{course.about}</p>
                <div className='text-center'>
                  {type === "view" && course.type === 'pdf' ? <a href={insertAtIndex(course.file, 65)} download target='_blank'> <button className='bg-primary p-1 mx-auto my-3 rounded-md px-8'>Download/Read</button></a> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {
        joinMeeting && <ZoomMeeting setJoinMeeting={setJoinMeeting} closeDetail={handleClick} course={course} />
      }
    </>

  );
};

export default CourseDetails;