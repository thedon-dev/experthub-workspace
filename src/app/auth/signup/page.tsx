"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const signup = () => {
  const [active, setActive] = useState(false)
  const [role, setRole] = useState("applicant")
  return (
    <main >
      <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
      <section className='absolute top-10 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
        <section className='rounded-md bg-white border border-[#FDC3327D] p-6 '>
          <h3 className='font-bold text-base text-center'>Sign up</h3>
          <div className='flex my-3 justify-evenly'>
            <button onClick={() => setRole("applicant")} className={role === "applicant" ? 'bg-primary text-sm p-1 px-6 rounded-sm' : "bg-gray p-1 px-6 text-sm rounded-sm"}>Applicant</button>
            <button onClick={() => setRole("trainer")} className={role === "trainer" ? 'bg-primary p-1 px-6 text-sm rounded-sm' : "bg-gray p-1 px-6 text-sm rounded-sm"}>Trainer</button>
          </div>

          {/* {
          role === "applicant" ? */}
          <div>
            <div className='my-2 text-xs'>
              <label className='font-medium'>Full Name</label>
              <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='e.g John' />
            </div>
            <div className='my-2 text-xs'>
              <label className='font-medium'>Email</label>
              <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='Sample@gmail.com' />
            </div>
            <div className='flex justify-between'>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Phone number</label>
                <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='eg: 0122 222 000' />
              </div>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Country</label>
                <select className='w-full border my-1 border-[#FA815136] p-2 rounded-sm'>
                  <option value=""></option>
                </select>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>State</label>
                <select className='w-full border my-1 border-[#FA815136] p-2 rounded-sm'>
                  <option value=""></option>
                </select>
              </div>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Address</label>
                <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='' />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Password</label>
                <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="password" placeholder='************' />
              </div>
              <div className='my-2 text-xs w-[48%] relative'>
                <label className='font-medium'>Confirm Password</label>
                <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type={active ? "text" : "password"} placeholder='************' />
                <img onClick={() => setActive(!active)} className='absolute top-7 right-2 cursor-pointer' src="/images/icons/eyes.svg" alt="" />
              </div>
            </div>
            <div className='my-2 text-xs'>
              <Link href={"/auth/test"}><button className='w-full bg-primary p-2 rounded-sm font-medium'>Signup</button></Link>
            </div>
          </div>
          {/* : role === "trainer" ? <div></div> : null
        } */}
        </section>
        <div className='text-xs flex justify-center mt-2'>
          <p className='text-[#052126] mr-2'>Do you have an account?</p>
          <Link href={"/auth/login"}><p className='text-[#346771]'>Login</p></Link>
        </div>
      </section>
    </main>
  );
};

export default signup;