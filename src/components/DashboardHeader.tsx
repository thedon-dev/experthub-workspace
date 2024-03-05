import { useAppSelector } from '@/store/hooks';
import React from 'react';

const DashboardHeader = ({ setToggle }: { setToggle: () => void }) => {
  const user = useAppSelector((state) => state.value);

  return (
    <section className='fixed lg:w-[80%] w-full bg-[#F8F7F4]'>
      <div className='p-4 z-10 flex justify-between shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
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
          <div className='p-3 h-10 w-10 my-auto rounded-full shadow-md'>
            <img src="/images/icons/notification.svg" alt="" />
          </div>
          <img className='h-10 w-10 rounded-full my-auto' src={user.profilePicture} alt="" />
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;