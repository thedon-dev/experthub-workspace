"use client"
import React, { useEffect, useState } from 'react';

import Login from "@/components/Login";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice';
import apiService from '@/utils/apiService';
import { Fade } from '@mui/material';
import Loader from '@/components/Loader';

const login = () => {

  const user = useAppSelector((state) => state.value);
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const storedToken = localStorage.getItem("tid");
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("tid")) {
      const urlToken = searchParams.get("tid");

      if (urlToken === storedToken) {
        if (user.role === "student" && !pathname.includes('applicant')) {
          return router.push('/applicant')
        } else if (user.role === "admin" && !pathname.includes('admin')) {
          return router.push("/admin")
        } else if (user.role === "tutor" && !pathname.includes('tutor')) {
          return router.push('/tutor')
        }
        return router.push('/auth/login')
      }

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
          const newUrl = `${searchParams.get("redirect") ? searchParams.get("redirect") : window.location.pathname}?${searchParams.toString()}`;
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
        .catch((error) => { console.error("Error:", error); router.push(`/auth/login`); setLoading(false) });
    } else {
      setLoading(false)
    }
  }, []);
  return (
    <main >
      <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
      <section className='absolute top-40 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
        <section className='rounded-md bg-white border border-[#FDC3327D] p-6 '>
          <h3 className='font-bold text-base text-center'>Login</h3>

          <Fade in={!loading} timeout={400}>
            <div className='w-full'>
              <Login />
            </div>
          </Fade>
          <Fade in={loading} timeout={400}>
            <div className='w-full'>
              <Loader />
            </div>
          </Fade>



          <div className='text-xs flex justify-center mt-2'>
            <p className='text-[#052126] mr-2'>Don't have an account? </p>
            <Link href={"/auth/signup"}><p className='text-[#346771]'>Sign up</p></Link>
          </div>
          <div className='text-xs flex justify-center mt-2'>
            {/* <p className='text-[#052126] mr-2'></p> */}
            <Link href={"/auth/forgot-password"}><p className='text-[#346771]'>Forgot Password </p></Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default login;