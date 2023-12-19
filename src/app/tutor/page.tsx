import CoursesCard from '@/components/CoursesCard';
import DashboardLayout from '@/components/DashboardLayout';
import RecommendedCard from '@/components/RecommendedCard';
import StatCard from '@/components/StatCard';
import React from 'react';

const tutor = () => {
  return (
    <DashboardLayout>
      <section>
        <div className='p-4 flex justify-between w-full shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38]'>
          <div>
            <p className='font-medium'>Welcome</p>
            <p className='font-bold'>Ayoola Janet</p>
          </div>
          <div className='w-1/2 relative'>
            <input type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
            <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
          </div>
          <div className='flex w-28 justify-between'>
            <div className='p-3 h-10 w-10 my-auto rounded-full shadow-md'>
              <img src="/images/icons/notification.svg" alt="" />
            </div>
            <img className='h-10 w-10 my-auto' src="/images/user.png" alt="" />
          </div>
        </div>
      </section>
      <section className='p-4 flex justify-between'>
        <StatCard title='Total No. of Assigned Courses' count={40} bg='#27C2D6' img='clock-line' />
        <StatCard title='My Students' count={40} bg='#DC9F08' img='ic_outline-assessment' />
        <StatCard title='My Graduates' count={40} bg='#53C48C' img='game-icons_progression' />
        <StatCard title='My Mentees' count={40} bg='#7E34C9' img='ph_chalkboard-teacher' />
      </section>
      <section className='m-2 p-3 shadow-md'>
        <div className='text-sm flex justify-between'>
          <div className='flex'>
            <p>Assigned Courses</p>

          </div>
          <p className='text-[#DC9F08]'>VIEW ALL</p>
        </div>
        <div className='flex flex-wrap justify-between'>
          <CoursesCard />
          <CoursesCard />
          <CoursesCard />
          <CoursesCard />
        </div>
      </section>
      <section className='m-2 p-3 shadow-md'>
        <div className='text-sm my-3 flex justify-between'>
          <p className='font-bold text-base'>Recommended for you</p>
          <p className='text-[#DC9F08] text-sm'>VIEW ALL</p>
        </div>
        <div className='flex flex-wrap justify-between'>
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default tutor;