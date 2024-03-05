import React, { useEffect } from 'react';
import SideNav from './SideNav';
import axios from 'axios';
import ChatWidget from './ChatWidget';
import { useAppSelector } from '@/store/hooks';
import { usePathname, useRouter } from 'next/navigation';

const DashboardLayout = ({ children }: { children: any }) => {
  const user = useAppSelector((state) => state.value);
  const pathname = usePathname()
  const router = useRouter()

  axios.defaults.baseURL = "https://shark-app-2-k9okk.ondigitalocean.app/"
  // axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

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
      <ChatWidget />
      <div className='sm:hidden w-[20%]'>
        <SideNav />
      </div>
      <section className='lg:w-[80%]'>
        {children}
      </section>
    </main>
  );
};

export default DashboardLayout;
