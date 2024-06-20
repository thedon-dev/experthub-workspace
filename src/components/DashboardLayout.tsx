"use client"


import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import axios from 'axios';
import ChatWidget from './ChatWidget';
import { useAppSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({ children }: { children: any }) => {
  const user = useAppSelector((state) => state.value);
  const pathname = usePathname()
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  axios.defaults.baseURL = "http://localhost:3001/"
  // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
  // https://api.experthubllc.com/

  useEffect(() => {
    if (user.role === "student" && !pathname.includes('applicant')) {
      router.push('/applicant')
    } else if (user.role === "admin" && !pathname.includes('admin')) {
      router.push("/admin")
    } else if (user.role === "tutor" && !pathname.includes('tutor')) {
      router.push('/tutor')
    }
  }, [])

  return (
    <main className='lg:flex'>
      {user.fullName ? <ChatWidget /> : null}
      {/* <ChatWidget /> */}
      {
        toggle ? <div className='lg:w-[20%]'>
          <SideNav />
        </div> : <div className='lg:w-[20%] sm:hidden'>
          <SideNav />
        </div>
      }
      <section className='lg:w-[80%]'>
        <div className='h-24 w-full'>
          <DashboardHeader setToggle={() => setToggle(!toggle)} />
        </div>
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
