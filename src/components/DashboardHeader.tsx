import { useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, notification } from 'antd';
import Notification from "./modals/Notification"
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation';
import { NoticeType } from '@/types/ResourceType';
import ImageViewer from './ImageViewer';
import apiService from '@/utils/apiService';
import Link from 'next/link';

const DashboardHeader = ({ setToggle }: { setToggle: () => void }) => {
  const user = useAppSelector((state) => state.value);
  const dispatch = useAppDispatch();
  const [notice, setNotice] = useState<NoticeType | null>()
  const [show, setShow] = useState(false)
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification();


  const getNotice = () => {
    apiService.get(`notice/${user.id}`).then(function (response) {
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
    apiService.put(`notice//enroll/${notice?._id}`, {
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

  const logout = async () => {
    localStorage.removeItem("tid");
    api.open({
      message: "Logged out Successfully!",
    });
    window.location.href = "/auth/login";
  };

  const changeRole = () => {
    const person = { ...user, role: "student" }
    // person.role = "tutor"
    dispatch(setUser(person))
    window.location.reload()
  }
  const items: MenuProps['items'] = [
    ...[
      user.role === 'tutor' ?
        {
          key: '1',
          label: (
            <p onClick={() => changeRole()}>Switch Roles</p>
          ),
        } : null
    ],
    {
      key: '2',
      label: (
        <Link href={`${user.role === 'student' ? '/applicant' : user.role}/profile`}><p>View Profile</p></Link>
      ),
    },
    ...[
      user.role !== 'admin' ?
        {
          key: '3',
          label: (
            <Link href={`${user.role === 'student' ? '/applicant' : user.role}/wallet`}><p>Wallet</p></Link>
          ),
        } : null
    ],
    {
      key: '4',
      label: (
        <p onClick={() => logout()}>Logout</p>
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
          <div className='flex lg:w-52 justify-between'>
            <a href={`https://experthubllc.com/feeds?tid=${user.accessToken}`}>
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
          </div>
        </div>

        {/* <div className='sm:hidden w-[30%] relative'>
          <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
          <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
        </div> */}

        <div className='flex lg:w-28 w-24 justify-between'>
          {/* {user.role !== 'admin' && <Link href={`${user.role === 'student' ? '/applicant' : user.role}/wallet`}>
            <button className="text-[20px] shadow-md rounded-full p-4 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-wallet2"
                viewBox="0 0 16 16"
              >
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
              </svg>
            </button>
          </Link>} */}
          <Notification />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture ? user.profilePicture : '/images/user.png'} alt="" />
          </Dropdown>
          {/* <button onClick={() => logout()} className="text-[20px] shadow-md rounded-full p-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </button> */}
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