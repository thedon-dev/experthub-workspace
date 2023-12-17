"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const login = () => {
  const [active, setActive] = useState(false)

  return (
    <main >
      <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
      <section className='absolute top-40 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
        <section className='rounded-md bg-white border border-[#FDC3327D] p-6 '>
          <h3 className='font-bold text-base text-center'>Login</h3>

          <div>
            <div className='my-2 text-xs'>
              <label className='font-medium'>Email</label>
              <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='Sample@gmail.com' />
            </div>

            <div className='my-2 text-xs relative'>
              <label className='font-medium'> Password</label>
              <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type={active ? "text" : "password"} placeholder='************' />
              <img onClick={() => setActive(!active)} className='absolute top-7 right-2 cursor-pointer' src="/images/icons/eyes.svg" alt="" />
            </div>
            <div className='my-2 text-xs'>
              <button className='w-full bg-primary p-2 rounded-sm font-medium'>Login</button>
            </div>
          </div>
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