"use client"

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import apiService from '@/utils/apiService';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const HeaderNav = () => {
  const [open, setOpen] = useState(false)
  const user = useAppSelector((state) => state.value);
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("tid");
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("tid")) {
      const urlToken = searchParams.get("tid");
      if (urlToken === storedToken) return;
      localStorage.clear();
      apiService
        .post("auth/login-with-token", { accessToken: urlToken })
        .then(({ data }) => {
          dispatch(
            setUser({
              ...data.user,
              accessToken: data.accessToken,
            })
          );
          localStorage.setItem("tid", data.token);

          searchParams.delete("tid");
          const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
          window.history.replaceState(null, "", newUrl);
          router.push(
            data.user.role === "student"
              ? "/applicant"
              : data.user.role === "admin"
                ? "/admin"
                : data.user.role === "tutor"
                  ? "/tutor"
                  : ''
          );
        })
        .catch((error) => { console.error("Error:", error); router.push(`/auth/login`) });
    } else if (!storedToken) {
      window.location.href = "/";
    }
  }, []);



  useEffect(() => {
    const storedToken = localStorage.getItem("tid");
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("tid")) {
      const urlToken = searchParams.get("tid");
      if (urlToken === storedToken) {
        searchParams.delete("tid");
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
      } else {
        apiService
          .post("auth/login-with-token", { accessToken: urlToken })
          .then(({ data }) => {
            dispatch(
              setUser({
                ...data.user,
                accessToken: data.accessToken,
              })
            );
            localStorage.setItem("tid", data.token);

            searchParams.delete("tid");
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.replaceState(null, "", newUrl);
            router.push(
              data.user.role === "student"
                ? "/applicant"
                : data.user.role === "admin"
                  ? "/admin"
                  : data.user.role === "tutor"
                    ? "/tutor"
                    : ''
            );
          })
          .catch((error) => console.error("Error:", error));
      }

    } else if (!storedToken) {
      window.location.href = "/auth/login";
    }
  }, []);

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
    <header className='absolute p-2 top-0 lg:w-[80%] left-0 right-0 mx-auto border-b border-white flex justify-between'>
      <div className='flex'>
        <img src="/images/logo.png" alt="" />
        <h3 className='text-base lg:block hidden font-medium my-auto text-white'>EXPERTHUB INSTITUTE</h3>
      </div>
      <div className='lg:flex hidden justify-between text-white text-sm w-[60%]'>
        <Link className='my-auto' href={"/"}><p >Home</p></Link>
        <a href="#about" className='my-auto'><p >About Us</p></a>
        <a href="#courses" className='my-auto'><p >Courses</p></a>
        <a href="#patners" className='my-auto'><p >Our Partners</p></a>
        <a href="#footer" className='my-auto'>
          <p>Contact</p>
        </a>
        <Link href={"/auth/login"} className='my-auto'><button className='border text-primary my-auto ml-10 border-primary p-1'>LOGIN</button></Link>
        <Link href={"/auth/signup"} className='my-auto'><button className=' bg-primary text-black p-1 my-auto'>REGISTER</button></Link>
      </div>
      <button onClick={() => setOpen(!open)} className='bg-primary h-10 w-10 my-auto lg:hidden block'>
        <img src="/images/hamburger.png" className='w-8 h-8 mx-auto' alt="" />
      </button>
      {open &&
        <div className='fixed z-50 top-24 left-0 right-0 p-6 bg-primary text-white w-[90%] mx-auto rounded-md'>
          <p onClick={() => setOpen(!open)} className="float-right text-4xl cursor-pointer">&times;</p>

          <p className='my-4 mt-20 font-bold'>Home</p>
          <p className='my-4 font-bold'>About Us</p>
          <p className='my-4 font-bold'>Courses</p>
          <p className='my-4 font-bold'>Our Partners</p>
          <p className='my-4 font-bold'>Contact</p>
          <div className='flex justify-between my-4'>
            <Link href={"/auth/login"}><button className='border text-white border-white p-1'>LOGIN</button></Link>
            <Link href={"/auth/signup"}><button className=' bg-white text-black p-1 '>REGISTER</button></Link>
          </div>
        </div>
      }
    </header>
  );
};

export default HeaderNav;