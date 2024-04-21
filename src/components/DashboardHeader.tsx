import { useAppSelector } from '@/store/hooks';
import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Notification from "./modals/Notification"
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice'

const DashboardHeader = ({ setToggle }: { setToggle: () => void }) => {
  const user = useAppSelector((state) => state.value);
  const dispatch = useAppDispatch();

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
        <div>
          <p className='font-medium'>Welcome</p>
          <p className='font-bold capitalize'>{user.fullName}</p>
        </div>
        {/* <div className='sm:hidden w-1/2 relative'>
          <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
          <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
        </div> */}
        <div className='flex lg:w-28 w-24 justify-between'>
          <Notification />
          {user.role === 'tutor' ? <Dropdown menu={{ items }} trigger={["click"]}>
            <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture} alt="" />
          </Dropdown> : <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture} alt="" />}
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;