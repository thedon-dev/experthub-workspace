import { CourseType } from '@/types/CourseType';
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useAppSelector } from '@/store/hooks';
import { notification } from 'antd';
import axios from 'axios';

const CourseDetails = ({ open, handleClick, course, type, call }) => {
  const user = useAppSelector((state) => state.value);
  const [api, contextHolder] = notification.useNotification();

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

  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);


  return (
    open && <div>
      {contextHolder}

      <div onClick={() => handleClick()} className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
      <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 w-[80%] mx-auto z-20 bg-[#F8F7F4]'>
        <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 px-12 flex justify-between'>
          <p className='font-medium'>Course Details</p>
          <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
        </div>
        <div className='py-4 px-10'>
          <div className='flex justify-between'>
            <div className='w-[40%]'>
              <img src={course.thumbnail} className='w-full h-52 object-cover' alt="" />
              <div className='p-4'>
                <p className='font-medium text-base'>{course.title}</p>
                {/* <div className='my-4'>
                  <p className='font-medium'>The course includes</p>
                  <div className='flex my-1'>
                    <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                    <p className='text-sm'>2 learning hours</p>
                  </div>
                  <div className='flex my-1'>
                    <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                    <p className='text-sm'>Course modules/assesments</p>
                  </div>
                  <div className='flex my-1'>
                    <img className='h-2 my-auto mr-2 w-2' src="/images/Ellipse.png" alt="" />
                    <p className='text-sm'>Certificate of completion</p>
                  </div>
                </div> */}
                {
                  type === "view" ? course.type === "online" ? <button className='bg-primary p-2 my-3 rounded-md px-8'>Join Live</button> : <button className='bg-primary p-2 my-3 rounded-md px-8'>{course.type}</button>
                    : <button onClick={() => handleFlutterPayment({
                      callback: (response) => {
                        enroll()
                        console.log(response);
                        closePaymentModal() // this will close the modal programmatically
                      },
                      onClose: () => {
                        console.log("closed")
                      },
                    })} className='bg-primary p-2 my-3 rounded-md px-8'>Enroll Now</button>
                }
              </div>

            </div>
            <div className='w-[58%]'>
              <p className='text-lg font-bold'>{course.title}</p>
              {/* <p className='my-2 text-sm font-medium'>This great online course will equip you with the knowledge and basic skills
                needed to design vector graphics using Figma.</p> */}
              <p className='text-sm'>{course.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;