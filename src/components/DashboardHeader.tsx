import { useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Notification from "./modals/Notification"
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NoticeType } from '@/types/ResourceType';
import ImageViewer from './ImageViewer';

const DashboardHeader = ({ setToggle }: { setToggle: () => void }) => {
  const user = useAppSelector((state) => state.value);
  const dispatch = useAppDispatch();
  const [notice, setNotice] = useState<NoticeType | null>()
  const [show, setShow] = useState(true)
  const router = useRouter()

  const getNotice = () => {
    axios.get(`notice/${user.id}`).then(function (response) {
      console.log(response.data)
      setNotice(response.data.notice.reverse()[0])
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getNotice()
  }, [])

  const markRead = () => {
    axios.put(`notice//enroll/${notice?._id}`, {
      id: user.id
    }).then(function (response) {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  const takeAction = () => {
    if (notice?.page === 'Survey') {
      markRead()
      router.push(`/auth/survey?user=${user.id}`)
    } else {
      markRead()
      router.push(`/${user.role === 'student' ? 'applicant' : 'tutor'}/${notice?.page.toLowerCase()}`)
    }
  }

  const changeRole = () => {
    const person = { ...user, role: "student" }
    // person.role = "tutor"
    dispatch(setUser(person))
    window.location.reload()
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p onClick={() => changeRole()}>Switch Roles</p>
      ),
    },
  ]

  return (
    <section className='fixed lg:w-[80%] w-full bg-[#F8F7F4]'>
      <div className='p-4 z-50 flex justify-between shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
        <div className='lg:hidden block my-auto'>
          <img onClick={() => setToggle()} src="/images/hamburger.png" className='w-8 h-8 my-auto' alt="" />
        </div>
        <div className='flex'>
          <div className='mr-20 sm:hidden'>
            <p className='font-medium'>Welcome</p>
            <p className='font-bold capitalize'>{user.fullName}</p>
          </div>

        </div>
        <a href="https://experthubllc.com/feeds">
          <div>
            <img src="/images/home.png" className='lg:w-6 sm:w-10 sm:h-10 mx-auto' alt="" />
            <p className='sm:hidden'>Home</p>
          </div>
        </a>
        <a className='my-auto' href="https://project.experthubllc.com/" target='_blank'>
          <div className='my-auto'>
            <img src="/images/project.png" className='lg:w-5 sm:w-8 my-auto sm:h-8 mx-auto' alt="" />
            <p className='sm:hidden'>Project Manager</p>
          </div>
        </a>
        <div className='sm:hidden w-[30%] relative'>
          <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
          <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
        </div>

        <div className='flex lg:w-28 w-24 justify-between'>
          <Notification />
          {user.role === 'tutor' ? <Dropdown menu={{ items }} trigger={["click"]}>
            <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture ? user.profilePicture : '/images/user.png'} alt="" />
          </Dropdown> : <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture ? user.profilePicture : '/images/user.png'} alt="" />}
        </div>

        {notice && show && <div>
          <div className='fixed bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
          <div className='fixed top-10 bottom-10 left-0 overflow-y-auto rounded-md right-0 lg:w-[40%] h-[70vh] w-[95%] mx-auto z-20 bg-[#F8F7F4]'>
            <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12'>
              <p className='font-medium text-center'>{notice.title}</p>
              {/* <img onClick={() => handleClick()} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" /> */}
            </div>
            <div className='p-4'>
              {notice.thumbnail && <ImageViewer image={notice.thumbnail} />}
            </div>
            <div className='lg:mx-12 mx-4 my-4'>
              <p>{notice.body}</p>
              <div className='text-center '>
                <button onClick={() => takeAction()} className='bg-[#F7A607] text-white p-1 rounded-md my-3 px-6'>{notice.action}</button> <br />
                {notice.cancel ? <button onClick={() => setShow(false)} className='p-1'>Cancel</button> : null}
              </div>
            </div>
          </div>
        </div>}
      </div>
    </section>
  );
};

export default DashboardHeader;