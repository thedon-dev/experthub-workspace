"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/userSlice'
import { notification } from 'antd';
import { useFormik } from 'formik';

const login = () => {
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  interface LoginTypes {
    email: string;
    password: string;
  }
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    onSubmit: values => {
      setLoading(true)
      axios.post(`https://shark-app-2-k9okk.ondigitalocean.app/auth/login`, values,)
        .then(function (response) {
          console.log(response.data)
          setLoading(false)
          dispatch(setUser(response.data.user))
          api.open({
            message: 'Logged in Successfully!'
          });
          router.push(response.data.user.role === "student" ? "/applicant" : response.data.user.role === "admin" ? '/admin' : "/tutor")
        })
        .catch(error => {
          setLoading(false)
          // console.log(error.response.data.message)
          api.open({
            message: error.response.data.message
          });
        })
    },
    validate: values => {
      let errors: LoginTypes | any = {}

      if (!values.email) {
        errors.email = "Email Required!"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = "Password Required!"
      }


      return errors
    }
  });


  return (
    <main >
      {contextHolder}
      <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
      <section className='absolute top-40 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
        <section className='rounded-md bg-white border border-[#FDC3327D] p-6 '>
          <h3 className='font-bold text-base text-center'>Login</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className='my-2 text-xs'>
              <label htmlFor="email" className='font-medium'>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange} value={formik.values.email} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' placeholder='Sample@gmail.com' />
              {formik.errors.email ? <div className='text-[#FF0000] text-xs'>{formik.errors.email}</div> : null}
            </div>

            <div className='my-2 text-xs relative'>
              <label htmlFor="password" className='font-medium'> Password</label>
              <input id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type={active ? "text" : "password"} placeholder='************' />
              <img onClick={() => setActive(!active)} className='absolute top-7 right-2 cursor-pointer' src="/images/icons/eyes.svg" alt="" />
              {formik.errors.password ? <div className='text-[#FF0000] text-xs'>{formik.errors.password}</div> : null}
            </div>
            <div className='my-2 text-xs'>
              <button type='submit' className='w-full bg-primary p-2 rounded-sm font-medium'>{loading ? "Loading..." : "Login"}</button>
            </div>
          </form>
        </section>
        <div className='text-xs flex justify-center mt-2'>
          <p className='text-[#052126] mr-2'>Don't have an account? </p>
          <Link href={"/auth/signup"}><p className='text-[#346771]'>Sign up</p></Link>
        </div>
      </section>
    </main>
  );
};

export default login;