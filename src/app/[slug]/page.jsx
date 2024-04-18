"use client"

import { CourseType } from '@/types/CourseType';
import { UserType } from '@/types/UserType';
import { notification } from 'antd';
import axios from 'axios';
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Single = () => {
  const [course, setCourse] = useState(null)
  const [userDeets, setUserDeets] = useState(null)
  const page = usePathname()
  const user = useSearchParams().get("user")
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter()

  const enroll = () => {
    try {
      axios.post(`https://expexthub-trainings.onrender.com/courses/enroll/${course?._id}`, {
        id: userDeets?.id
      })
        .then(function (response) {
          // console.log(response.data)
          api.open({
            message: `Course Purchased for ${userDeets?.name}`
          });
          router.push('/')
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

  const getData = async () => {
    await axios.get(`https://expexthub-trainings.onrender.com/courses/single-course${page}`)
      .then(function (response) {
        setCourse(response.data.course)
        // console.log(response.data)
      })
  }

  const getUser = async () => {
    await axios.get(`https://expexthub-trainings.onrender.com/user/profile/${user}`)
      .then(function (response) {
        setUserDeets(response.data.user)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getData()
    getUser()
  }, [])


  const config = {
    public_key: 'FLWPUBK-8f804b3f0312ef8a78fea192bdb4a5b4-X',
    tx_ref: Date.now(),
    amount: course?.fee,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userDeets?.email,
      // phone_number: '070********',
      name: userDeets?.fullName,
    },
  };


  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className='w-1/2 mx-auto p-4'>
      {contextHolder}
      <h1 className='text-3xl'><span className='capitalize'>{userDeets?.fullName}</span> has asked you to purchase the course {course?.title} for them.</h1>
      <img className='my-3' src={course?.thumbnail} alt="" />
      <p>{course?.about}</p>
      <div className='flex p-3 justify-between'>
        <Link href={'/'}>
          <button className='p-3 bg-[#D9D9D94D]'>Cancel</button>
        </Link>
        <button onClick={() => course?.fee === 0 ? enroll() : handleFlutterPayment({
          callback: (response) => {
            enroll()
            console.log(response);
            closePaymentModal() // this will close the modal programmatically
          },
          onClose: () => {
            console.log("closed")
          },
        })
        } className='bg-primary text-white p-3'>Porceed</button>
      </div>
    </div >
  );
};

export default Single;