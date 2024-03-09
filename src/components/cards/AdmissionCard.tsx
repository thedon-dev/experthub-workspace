"use client"

import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { usePathname } from 'next/navigation';
import AssignCourse from '../modals/AssignCourse';
import SendAssesment from '../modals/SendAssesment';
import axios from 'axios';
import { notification } from 'antd';


const AdmissionCard = ({ tutor, role }: { tutor: any, role: string }) => {
  const [assign, setAssign] = useState(false)
  const [assesment, setAssesment] = useState(false)
  const pathname = usePathname()
  const [api, contextHolder] = notification.useNotification();

  const items: MenuProps['items'] = [
    ...(role === 'students' ? [{
      label: (
        <p onClick={() => setAssesment(true)}>Send Assessment</p>
      ),
      key: '1',
    },
    {
      label: (
        <p onClick={() => makeGraduate()}>Make Graduate</p>
      ),
      key: '8',
    },
    {
      label: 'Send Message',
      key: '2',
    },
    {
      label: (
        <p onClick={() => setAssign(true)} >Assign Course</p>
      ),
      key: '3',
    },
    // {
    //   label: 'View Account',
    //   key: '4',
    // },
    ...(pathname.includes('admin') ? [
      {
        label: (
          <p onClick={() => blockUser()}>{tutor.blocked ? "Unblock Student" : "Block Student"}</p>
        ),
        key: '4',
      },
      // {
      //   label: 'Pay Fee',
      //   key: '7',
      // }
    ] : [])] : [
      // {
      //   label: 'View Account',
      //   key: '1',
      // },
      {
        label: 'Make an Expert',
        key: '1',
      },
      {
        label: (
          <p onClick={() => setAssign(true)} >Assign Course</p>
        ),
        key: '2',
      },
      {
        label: (
          <p onClick={() => blockUser()}>{tutor.blocked ? "Unblock Tutor" : "Block Tutor"}</p>
        ),
        key: '3',
      },
    ])

  ];

  const blockUser = () => {
    try {
      axios.put(`user/block/${tutor.studentId || tutor.id}`, {
        graduate: true
      })
        .then(function (response) {
          // console.log(response.data)
          api.open({
            message: 'User Blocked Successfully!'
          });
        })
    } catch (e) {
      console.log(e)
      api.open({
        message: 'Something went wrong'
      });
    }
  }

  const makeGraduate = () => {
    try {
      axios.put(`user/updateProfile/${tutor.studentId}`, {
        graduate: true
      })
        .then(function (response) {
          // console.log(response.data)
          api.open({
            message: 'Student made a graduate Successfully!'
          });
        })
    } catch (e) {
      console.log(e)
      api.open({
        message: 'Something went wrong'
      });
    }
  }
  return (
    <div>
      {contextHolder}
      <div className='border border-[#1E1E1E80] p-3 rounded-md my-3 flex justify-between'>
        <img src={tutor.profilePicture ? tutor.profilePicture : "/images/user.png"} className='w-10 sm:mr-2 h-10 rounded-full object-cover' alt="" />
        <div className='w-52'>
          <p className='font-medium text-sm capitalize text-clip overflow-hidden'>{tutor.fullname}</p>
          <p className='text-xs text-clip overflow-hidden'>{tutor.email}</p>
        </div>
        <div className='w-52'>
          <p className='text-xs'>Course</p>
          <p className=' text-sm'>{tutor.course}</p>
        </div>
        {tutor.isVerified ? <p className='text-sm sm:hidden text-[#0BC01E] my-auto font-medium'>Completed</p> : <p className='text-sm sm:hidden text-[#DC9F08] my-auto font-medium'>Pending</p>}
        {pathname.includes("applicant") ? <button className='text-primary text-sm'>Send Message</button> : <div className='my-auto'>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
          >
            <img className='w-4 h-4 my-auto cursor-pointer' src="/images/icons/edit-icon.svg" alt="" />
          </Dropdown>
        </div>}

      </div>
      <AssignCourse open={assign} handleClick={() => setAssign(false)} studentId={tutor.studentId || tutor.id} />
      <SendAssesment open={assesment} handleClick={() => setAssesment(false)} studentId={tutor.studentId} />
    </div>
  );
};

export default AdmissionCard;